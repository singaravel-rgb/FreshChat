from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db

router = APIRouter()

@router.get("/knowledge/faqs")
async def get_public_faqs(db: AsyncSession = Depends(get_db)):
    return {
        "faqs": [
            {"id": "1", "question": "How do I get started?", "answer": "Create an account and explore.", "category": "Getting Started"},
            {"id": "2", "question": "How do I reset password?", "answer": "Use forgot password link.", "category": "Account"},
        ]
    }

@router.get("/knowledge/categories")
async def get_categories(db: AsyncSession = Depends(get_db)):
    return {"categories": [{"id": "1", "name": "Getting Started"}, {"id": "2", "name": "Account"}]}
