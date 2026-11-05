from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, update
from sqlalchemy.orm import selectinload
from app.models.auth import User, AgentStatus
from app.models.conversation import Conversation, Team
from app.models.auth import Role
from typing import List, Optional
from uuid import UUID
import structlog

logger = structlog.get_logger()

class AssignmentService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def get_eligible_agents(self, organization_id: UUID, team_id: Optional[UUID] = None) -> List[User]:
        """Get agents eligible for assignment"""
        query = select(User).options(
            selectinload(User.agent_status),
            selectinload(User.role)
        ).where(
            User.organization_id == organization_id,
            User.status == "approved"
        )
        
        if team_id:
            # In production, check team membership
            pass
        
        result = await self.db.execute(query)
        users = result.scalars().all()
        
        eligible = []
        for user in users:
            if not user.agent_status:
                continue
            # Check eligibility: online, available, under capacity
            if user.agent_status.status != "online":
                continue
            if user.agent_status.availability != "available":
                continue
            
            # Check active conversation count
            active_count = await self._get_active_count(user.id)
            max_active = int(user.agent_status.max_active_conversations or "5")
            if active_count >= max_active:
                continue
            
            eligible.append(user)
        
        return eligible
    
    async def _get_active_count(self, agent_id: UUID) -> int:
        result = await self.db.execute(
            select(func.count(Conversation.id)).where(
                Conversation.assigned_agent_id == agent_id,
                Conversation.status.in_(["assigned", "in_progress"])
            )
        )
        return result.scalar() or 0
    
    async def assign_conversation(self, conversation_id: UUID) -> Optional[User]:
        """Assign conversation using workload-based algorithm with tie-breaking"""
        async with self.db.begin():
            # Get conversation
            result = await self.db.execute(
                select(Conversation).where(Conversation.id == conversation_id).with_for_update()
            )
            conversation = result.scalar_one_or_none()
            if not conversation:
                return None
            
            if conversation.assigned_agent_id:
                return None  # Already assigned
            
            # Get eligible agents
            eligible = await self.get_eligible_agents(
                conversation.organization_id,
                conversation.team_id
            )
            
            if not eligible:
                # Queue the conversation
                conversation.status = "queued_human"
                await self.db.commit()
                logger.info("conversation_queued", conversation_id=str(conversation_id))
                return None
            
            # Find agent with lowest active count
            best_agent = None
            best_count = float('inf')
            best_last_assigned = None
            
            for agent in eligible:
                count = await self._get_active_count(agent.id)
                last_assigned = agent.agent_status.last_seen_at if agent.agent_status else None
                
                if count < best_count:
                    best_count = count
                    best_agent = agent
                    best_last_assigned = last_assigned
                elif count == best_count:
                    # Round-robin tie-breaking by last_assigned_at
                    if best_last_assigned is None or (last_assigned and last_assigned < best_last_assigned):
                        best_agent = agent
                        best_last_assigned = last_assigned
            
            # Assign
            if best_agent:
                conversation.assigned_agent_id = best_agent.id
                conversation.status = "assigned"
                conversation.team_id = conversation.team_id  # keep team
                
                await self.db.execute(
                    update(AgentStatus)
                    .where(AgentStatus.user_id == best_agent.id)
                    .values(last_seen_at=func.now())
                )
                
                await self.db.commit()
                logger.info("conversation_assigned", 
                           conversation_id=str(conversation_id),
                           agent_id=str(best_agent.id))
                return best_agent
            
            return None
