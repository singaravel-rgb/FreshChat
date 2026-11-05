# System Architecture
**Project:** AI-First Customer Support Platform

## Architecture Principles
- **Modular Monolith First**: Single deployable unit with clear module boundaries
- **API-First**: All features exposed via REST APIs
- **Type Safety**: End-to-end typing (TypeScript + Pydantic)
- **Security by Default**: Defense in depth, least privilege
- **Real-Time**: WebSocket for live updates
- **AI-Safe**: Guardrails, human-in-loop, kill switch
- **Database as Source of Truth**: Never Redis-only for critical data

## Component Architecture
### Frontend (Next.js 14 + TypeScript)
- App Router structure
- Feature-based organization
- Shared component library with design system
- API client with auth interceptors
- WebSocket client with reconnection
- Zustand/React Query for state management

### Backend (FastAPI + Python)
- Router-based API organization (api/v1)
- Service layer for business logic
- Repository pattern via SQLAlchemy
- Dependency injection
- Middleware stack (auth, CORS, rate-limit, audit)
- Pydantic schemas for validation

### Data Layer
- **PostgreSQL 16**: All persistent business data
- **Redis 7**: Caching, sessions, pub/sub, job queue
- **S3/MinIO**: File attachments

## Real-Time Architecture
- WebSocket connections authenticated
- Redis pub/sub for multi-instance ready (even if single now)
- Event-driven updates to inbox/notifications
- Presence/agent status

## AI Architecture
```python
# AI Flow
1. Receive message + context
2. Load approved knowledge (RAG)
3. Classify intent, check resolvability, assess safety
4. If safe & resolvable → generate response with citations/grounding
5. If uncertain/sensitive/KB insufficient/tool fail/human requested → escalate with summary
6. Log interaction (tokens, model, decision, reason)
7. Respect kill switch
```

**Components:** Prompt manager, Knowledge retriever, Safety checker, Tool executor (with allowlist), Response validator, Escalation service

## Background Jobs
- SLA breach detection
- Queue processing on agent availability
- Notification dispatch
- Analytics aggregation
- Webhook delivery retries
- Cleanup tasks

## Security Architecture
- **Auth**: JWT access (short-lived) + refresh (httpOnly cookie)
- **RBAC**: Permission checks on every protected route
- **Rate Limiting**: Per endpoint/user/IP
- **Validation**: All inputs/outputs validated
- **Audit**: Log sensitive operations
- **Secrets**: Environment variables, never committed
- **CORS**: Strict configuration

## Deployment Considerations
- Docker Compose for local/dev
- Environment-based config
- Health/readiness endpoints
- Database migrations via Alembic
- Structured logging
