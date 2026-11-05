from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    APP_NAME: str = "AI Customer Support Platform"
    APP_ENV: str = "development"
    APP_DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    SECRET_KEY: str = "change-me"
    
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/support_platform"
    
    REDIS_URL: str = "redis://localhost:6379/0"
    
    JWT_SECRET_KEY: str = "change-me-jwt"
    JWT_REFRESH_SECRET_KEY: str = "change-me-jwt-refresh"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    AI_ENABLED: bool = True
    AI_KILL_SWITCH: bool = False
    AI_PROVIDER: str = "openrouter"
    AI_MODEL: str = "anthropic/claude-3.5-sonnet"
    AI_API_KEY: str = ""
    
    CORS_ORIGINS: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

settings = Settings()
