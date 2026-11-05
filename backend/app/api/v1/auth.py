from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.models.auth import User, Role, Organization
from app.schemas.auth import UserCreate, UserResponse, LoginRequest, TokenResponse
from app.core.deps import get_current_user

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=201)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    # Check if user exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Get default role and org (will be set up properly in seeding)
    role_result = await db.execute(select(Role).where(Role.name == "Agent"))
    role = role_result.scalar_one_or_none()
    org_result = await db.execute(select(Organization).limit(1))
    org = org_result.scalar_one_or_none()
    
    if not role or not org:
        raise HTTPException(status_code=500, detail="System not initialized")
    
    user = User(
        email=user_data.email,
        password_hash=get_password_hash(user_data.password),
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        role_id=role.id,
        organization_id=org.id,
        status="pending"
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.post("/login", response_model=TokenResponse)
async def login(login_data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == login_data.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    if user.status != "approved":
        raise HTTPException(status_code=403, detail="Account pending approval")
    
    access_token = create_access_token(data={"sub": str(user.id)})
    refresh_token = create_refresh_token(data={"sub": str(user.id)})
    
    return TokenResponse(access_token=access_token, refresh_token=refresh_token, user=user)

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
