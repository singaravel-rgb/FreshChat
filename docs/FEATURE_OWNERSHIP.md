# Feature Ownership Matrix
**Project:** AI-First Customer Support Platform

## Developer 1 - Frontend & Customer Experience
**Branch:** `feature/frontend-agent-customer-experience`  
**Responsibilities:** All UI/UX, customer-facing interfaces

### Owned Directories
- `frontend/` (entire)
- `frontend/src/app/` (routing, layouts)
- `frontend/src/components/` (shared UI components)
- `frontend/src/features/agent-workspace/`
- `frontend/src/features/inbox/`
- `frontend/src/features/chat-widget/`
- `frontend/src/features/help-center/`
- `frontend/src/features/notifications/`
- `frontend/src/lib/api/`, `frontend/src/lib/auth/`, `frontend/src/lib/realtime/`
- `frontend/src/hooks/`, `frontend/src/types/`, `frontend/src/styles/`

### Key Features
1. Frontend foundation (Next.js, Tailwind, design system)
2. Agent Workspace (dashboard, inbox 3-column, composer)
3. Chat Widget (embeddable)
4. Help & Support page + FAQ UI
5. Frontend auth & routing
6. WebSocket client
7. Frontend tests (unit + E2E)

## Developer 2 - Backend & AI & Admin
**Branch:** `feature/backend-core-ai-admin`  
**Responsibilities:** All server-side logic, APIs, AI, data

### Owned Directories
- `backend/` (entire)
- `backend/app/api/v1/` (all routes)
- `backend/app/models/` (all models)
- `backend/app/services/` (business logic)
- `backend/app/core/` (config, security)
- `backend/app/middleware/`
- `backend/app/workers/` (background jobs)
- `backend/alembic/` (migrations)
- Database schema & migrations
- AI service & safety
- Assignment/routing engine
- Real-time/WebSocket server
- Admin APIs
- Backend tests

### Key Features
1. Authentication & RBAC
2. All API endpoints
3. Conversation engine, messaging
4. Assignment & routing with algorithm
5. AI-first processing + copilot + kill switch
6. Knowledge base backend
7. SLA/business hours
8. Notifications
9. Admin portal backend
10. Audit logs, security

## Shared (Joint Coordination Required)
- Root files: `README.md`, `docker-compose.yml`, `.env.example`, `package.json` (root if any)
- `docs/` (all docs - update collaboratively)
- API contracts (`docs/API_CONTRACTS.md`)
- Database schema (`docs/DATABASE_SCHEMA.md`)
- WebSocket events (`docs/WEBSOCKET_EVENTS.md`)
- Shared TypeScript types / Pydantic schemas used by both
- Environment variables
- Git workflow, branch protection rules
- Dependency version decisions

## Rules
- No independent edits to other dev's owned files
- Shared files require discussion and agreement
- API/DB contract changes need notification + coordination
- PRs to develop with clear description
- Pull develop before starting work
- Resolve conflicts without deleting other's work
