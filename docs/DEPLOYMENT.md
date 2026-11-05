# Deployment Guide
**Project:** AI-First Customer Support Platform

## Local Development
```bash
# Clone repo
git clone <repo-url>
cd ai-customer-support-platform

# Copy env
cp .env.example .env

# Start with docker-compose
docker-compose up -d

# Backend: http://localhost:8000
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

## Environment Variables (Key)
See `.env.example` for all variables:
- DATABASE_URL
- REDIS_URL
- JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY
- AI_PROVIDER, AI_API_KEY, AI_MODEL
- S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY, S3_SECRET_KEY
- CORS_ORIGINS

## Database Migrations
```bash
# Backend
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head
```

## Production Considerations
- Use managed PostgreSQL
- Use managed Redis
- Use S3 for attachments
- Set strong secrets
- Enable HTTPS
- Configure CORS properly
- Set up monitoring/logging
- Run migrations before deploy
- Health checks configured
- Rate limiting enabled
- Backups for DB

## Health Endpoints
- GET `/api/v1/health` - Basic health
- GET `/api/v1/health/ready` - Readiness (DB/Redis)
- GET `/api/v1/health/live` - Liveness
