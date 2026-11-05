from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, JSON, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.base import Base, UUIDMixin, TimestampMixin

class Channel(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "channels"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    type = Column(String(50), default="web_chat")
    config_json = Column(JSON, default={})
    enabled = Column(Boolean, default=True)

class Conversation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "conversations"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id"), nullable=False)
    channel_id = Column(UUID(as_uuid=True), ForeignKey("channels.id"))
    assigned_agent_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id"), nullable=True)
    status = Column(String(50), default="new")  # new, ai_handling, queued_human, assigned, in_progress, resolved, closed
    priority = Column(String(20), default="normal")
    tags_json = Column(JSON, default=[])
    ai_handled = Column(Boolean, default=True)
    first_response_at = Column(DateTime(timezone=True), nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    closed_at = Column(DateTime(timezone=True), nullable=True)
    sla_due_at = Column(DateTime(timezone=True), nullable=True)
    
    customer = relationship("Customer", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")

class Message(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "messages"
    
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id"), nullable=False)
    sender_type = Column(String(20), nullable=False)  # customer, agent, ai, system
    sender_id = Column(UUID(as_uuid=True), nullable=True)
    content = Column(Text, nullable=False)
    message_type = Column(String(20), default="text")
    internal_note = Column(Boolean, default=False)
    attachments_json = Column(JSON, default=[])
    read_at = Column(DateTime(timezone=True), nullable=True)
    
    conversation = relationship("Conversation", back_populates="messages")

class Team(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "teams"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    supervisor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
