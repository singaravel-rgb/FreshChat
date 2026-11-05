from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, JSON, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.base import Base, UUIDMixin, TimestampMixin

class KnowledgeCategory(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "knowledge_categories"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    order = Column(Integer, default=0)
    visible = Column(Boolean, default=True)

class KnowledgeArticle(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "knowledge_articles"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("knowledge_categories.id"))
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    order = Column(Integer, default=0)
    visible = Column(Boolean, default=True)
    allow_chat = Column(Boolean, default=True)

class BusinessHours(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "business_hours"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    timezone = Column(String(100), default="UTC")
    schedule_json = Column(JSON, default={})
    holidays_json = Column(JSON, default=[])

class SLAPolicy(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "sla_policies"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    first_response_minutes = Column(Integer, default=60)
    resolution_minutes = Column(Integer, default=480)
    conditions_json = Column(JSON, default={})

class Notification(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "notifications"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(String(50), nullable=False)
    title = Column(String(255), nullable=False)
    body = Column(Text)
    data_json = Column(JSON, default={})
    read_at = Column(DateTime(timezone=True), nullable=True)
