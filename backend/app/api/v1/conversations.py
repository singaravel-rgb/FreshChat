from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.auth import User
from app.models.conversation import Conversation, Message
from app.services.assignment import AssignmentService
from typing import List

router = APIRouter()

@router.post("/", status_code=201)
async def create_conversation(
    conversation_data: dict,
    db: AsyncSession = Depends(get_db)
):
    # Create conversation (simplified)
    conversation = Conversation(
        organization_id=conversation_data.get("organization_id"),
        customer_id=conversation_data.get("customer_id"),
        status="ai_handling",
        ai_handled=True
    )
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    
    # Trigger AI processing and assignment
    assignment_service = AssignmentService(db)
    # In real flow, AI processes first, then assigns if needed
    
    return {"id": str(conversation.id), "status": conversation.status}

@router.get("/inbox")
async def get_inbox(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Conversation).where(
            Conversation.assigned_agent_id == current_user.id
        ).order_by(Conversation.created_at.desc())
    )
    conversations = result.scalars().all()
    return {"conversations": [{"id": str(c.id), "status": c.status} for c in conversations]}
