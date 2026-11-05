from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from pydantic import BaseModel
from typing import Optional, Dict, Any

router = APIRouter()

class AIConfig(BaseModel):
    enabled: bool = True
    kill_switch: bool = False
    provider: str = "openrouter"
    model: str = "anthropic/claude-3.5-sonnet"

@router.get("/config")
async def get_ai_config(db: AsyncSession = Depends(get_db)):
    return {
        "enabled": True,
        "kill_switch": False,
        "provider": "openrouter",
        "model": "anthropic/claude-3.5-sonnet",
        "message": "AI-first processing enabled"
    }

@router.put("/config")
async def update_ai_config(config: AIConfig, db: AsyncSession = Depends(get_db)):
    return {"message": "AI configuration updated", "config": config}

@router.post("/copilot/suggest")
async def copilot_suggest(data: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    return {
        "suggestion": "Based on the conversation, I recommend asking for more details about the issue.",
        "confidence": 0.85
    }

@router.post("/process")
async def process_message(data: Dict[str, Any], db: AsyncSession = Depends(get_db)):
    # AI-first processing - mandatory
    message = data.get("message", "")
    # Simulate AI evaluation
    return {
        "action": "escalate" if len(message) < 10 else "resolve",
        "response": "I understand. Let me help you with that.",
        "escalate": False,
        "reason": None,
        "should_escalate": len(message) < 10
    }
