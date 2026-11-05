from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.base import Base, UUIDMixin, TimestampMixin
import uuid

class Organization(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "organizations"
    
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    settings_json = Column(JSON, default={})
    
    users = relationship("User", back_populates="organization")
    customers = relationship("Customer", back_populates="organization")

class Role(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "roles"
    
    name = Column(String(100), unique=True, nullable=False)
    permissions_json = Column(JSON, default={})
    is_system = Column(Boolean, default=False)
    
    users = relationship("User", back_populates="role")

class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id"), nullable=False)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    status = Column(String(50), default="pending")  # pending, approved, rejected, suspended
    approved_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    
    role = relationship("Role", back_populates="users")
    organization = relationship("Organization", back_populates="users")
    agent_status = relationship("AgentStatus", back_populates="user", uselist=False)

class AgentStatus(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "agent_status"
    
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    status = Column(String(50), default="offline")  # online, offline
    availability = Column(String(50), default="available")  # available, busy
    max_active_conversations = Column(String(10), default="5")
    last_seen_at = Column(DateTime(timezone=True))
    
    user = relationship("User", back_populates="agent_status")

class Customer(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "customers"
    
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False)
    email = Column(String(255))
    name = Column(String(255))
    phone = Column(String(50))
    external_id = Column(String(255))
    metadata_json = Column(JSON, default={})
    
    organization = relationship("Organization", back_populates="customers")
    conversations = relationship("Conversation", back_populates="customer")
