# Master Project Blueprint: AI-First Customer Support Platform

## 1. Product Overview

Build a production-ready, AI-first customer support platform inspired by Freshchat functionality. This is a completely new project built from absolute zero with collaborative development by two developers on separate machines working in a single shared GitHub repository.

### Core Objectives
- AI-first workflow: Every incoming conversation passes through AI evaluation before human assignment
- Seamless escalation: Complex/sensitive/uncertain queries escalate to human agents
- Intelligent routing: Workload-based assignment with configurable limits
- Real-time collaboration: Shared inbox for agents with live updates
- Comprehensive management: Admin portal for full platform control
- Customer-centric: Website widget + Help & Support page
- Multi-org ready: Architecture designed for future SaaS expansion

### Target Users
| Role | Purpose | Access |
|------|---------|--------|
| Owner | Organization owner, full control, can transfer ownership | Full system access |
| Super Admin | Top-level admin | Full admin access except ownership transfer |
| Admin | Administrative functions | Most admin functions |
| Supervisor | Monitor performance, view reports | Reporting & monitoring focus |
| Agent | Handle customer conversations | Agent workspace/inbox only |
| Customer (Anonymous/Identified) | End users contacting support | Chat widget & Help Center |

## 2. Complete Feature Breakdown by Module (25 Modules)

### Module 1: Identity and Organization
**Purpose:** Core org structure and identity management

| Category | Details |
|----------|---------|
| User Roles | Owner, Super Admin, Admin, Supervisor, Agent |
| Functional Req | Org creation, org settings, multi-tenant ready structure |
| Backend | Org model, org settings API, validation |
| Frontend | Org setup UI, settings forms |
| DB Entities | organizations(id, name, slug, settings_json, created_at, updated_at) |
| API Endpoints | POST /api/v1/orgs, GET /api/v1/orgs/{id}, PUT /api/v1/orgs/{id} |
| Security | Only Owner can modify critical org settings |
| Tests | Org CRUD, permissions |

### Module 2: Authentication and Sessions
**Purpose:** Secure auth with session management

| Category | Details |
|----------|---------|
| Features | Email/password auth, JWT access + refresh tokens, session tracking, logout, token refresh |
| Auth Flow | Login, register (pending approval), password reset (future), MFA-ready |
| Backend | Auth service, JWT middleware, session store |
| Frontend | Login/register forms, auth guards, token management |
| DB Entities | users(id, email, password_hash, role_id, org_id, status, approved_by, approved_at, last_login_at), sessions(id, user_id, token_hash, expires_at, ip, user_agent) |
| API Endpoints | POST /api/v1/auth/login, POST /api/v1/auth/register, POST /api/v1/auth/logout, POST /api/v1/auth/refresh |
| Security | Bcrypt/Argon2, httpOnly cookies for refresh, rate limiting, CSRF protection |
| Tests | Auth flows, token validation, session invalidation |

### Module 3: Employee and User Management
**Purpose:** Manage support team members

| Category | Details |
|----------|---------|
| Features | Add employees, pending approvals, approve/reject/suspend/reactivate, profile management |
| Rules | New registration requires admin approval, pending users blocked from protected areas |
| Backend | User CRUD, approval workflow, status management |
| Frontend | User list, approval queue, user details modal |
| DB Entities | users (extended), user_approvals(audit trail) |
| API Endpoints | GET /api/v1/employees, POST /api/v1/employees, PUT /api/v1/employees/{id}/approve, PUT /api/v1/employees/{id}/reject, PUT /api/v1/employees/{id}/suspend |
| Security | Only Admin/Super Admin/Owner can manage employees |
| Tests | Approval workflow, permission enforcement |

### Module 4: Roles and Permissions
**Purpose:** RBAC system

| Category | Details |
|----------|---------|
| Roles | Owner, Super Admin, Admin, Supervisor, Agent (predefined) |
| Features | Permission matrix, role assignment, custom permissions (future), Owner protection |
| Backend | Permission checker middleware, role service |
| Frontend | Permission matrix UI, role management |
| DB Entities | roles(id, name, permissions_json, is_system), permissions(id, code, category, description) |
| API Endpoints | GET /api/v1/roles, PUT /api/v1/roles/{id}/permissions |
| Security | Backend-enforced permissions always, Owner cannot be demoted/deleted by others |
| Tests | Permission enforcement across endpoints |

### Module 5: Teams and Departments
**Purpose:** Organize agents into teams

| Category | Details |
|----------|---------|
| Features | Create teams, assign agents, team routing, team supervisors |
| Backend | Team CRUD, member management |
| Frontend | Team management UI |
| DB Entities | teams(id, org_id, name, description, supervisor_id), team_members(team_id, user_id, joined_at) |
| API Endpoints | CRUD /api/v1/teams, POST /api/v1/teams/{id}/members |
| Tests | Team assignment, routing constraints |

### Module 6: Customer Management and Identity
**Purpose:** Track customers across conversations

| Category | Details |
|----------|---------|
| Features | Customer profiles, identity resolution, contact info, conversation history, notes |
| Backend | Customer service, deduplication logic |
| Frontend | Customer details panel in inbox |
| DB Entities | customers(id, org_id, email, name, phone, external_id, metadata_json, first_seen_at, last_seen_at) |
| API Endpoints | GET /api/v1/customers, GET /api/v1/customers/{id}, PUT /api/v1/customers/{id} |
| Tests | Identity resolution, profile updates |

### Module 7: Communication Channels
**Purpose:** Multi-channel support foundation

| Category | Details |
|----------|---------|
| Channels | Web chat (primary), extensible for email/social (future) |
| Features | Channel configuration, enable/disable, widget settings |
| Backend | Channel config service |
| Frontend | Channel settings in admin |
| DB Entities | channels(id, org_id, type, config_json, enabled, created_at) |
| API Endpoints | GET/PUT /api/v1/channels |
| Tests | Channel config persistence |

### Module 8: Customer Chat Widget
**Purpose:** Embeddable widget

| Category | Details |
|----------|---------|
| Features | Launcher, pre-chat form (optional), AI-first experience, conversation continuity, responsive, configurable styling |
| Requirements | Hidden on Help & Support page, configurable, works across pages |
| Frontend (Device 1) | Widget script/build, React component, iframe/embed support |
| Backend (Device 2) | Widget config API, public conversation API |
| DB Entities | widget_configs(id, org_id, settings_json, theme_json) |
| API Endpoints | GET /api/v1/public/widget/config, POST /api/v1/public/conversations |
| Tests | Widget init, conversation start, styling |

### Module 9: Conversation Engine
**Purpose:** Core conversation lifecycle

| Category | Details |
|----------|---------|
| Features | Create conversations, status tracking, AI/human assignment state, resolution, closure |
| Statuses | new, ai_handling, queued_human, assigned, in_progress, resolved, closed, escalated |
| Backend | Conversation service, state machine, validation |
| Frontend | Conversation state display |
| DB Entities | conversations(id, org_id, customer_id, channel_id, status, assigned_agent_id, team_id, priority, tags_json, ai_handled(bool), first_response_at, resolved_at, closed_at, sla_due_at) |
| API Endpoints | GET /api/v1/conversations, GET /api/v1/conversations/{id}, PUT /api/v1/conversations/{id}/status |
| Business Rules | AI-first processing mandatory, state transitions validated |
| Tests | State machine, transitions, rules |

### Module 10: Message Engine and Attachments
**Purpose:** Messaging with attachments

| Category | Details |
|----------|---------|
| Features | Messages (customer/agent/ai/system), internal notes (never exposed to customers), attachments, timestamps, read/delivery status |
| Backend | Message service, attachment handling, S3-compatible storage |
| Frontend | Message thread, composer, attachment UI |
| DB Entities | messages(id, conversation_id, sender_type(enum:customer,agent,ai,system), sender_id, content, message_type, internal_note(bool), attachments_json, read_at, created_at), attachments(id, message_id, filename, mime_type, size, storage_key, url) |
| API Endpoints | GET /api/v1/conversations/{id}/messages, POST /api/v1/conversations/{id}/messages |
| Security | Internal notes filtered from customer-facing APIs |
| Tests | Message creation, internal notes isolation, attachments |

### Module 11: Shared Inbox
**Purpose:** Agent inbox interface

| Category | Details |
|----------|---------|
| Features | 3-column layout, conversation list with filters/sort, real-time updates, unread indicators |
| Sorting | Newest, Oldest, Last activity, Oldest unanswered, Priority, SLA deadline, Overdue |
| Filters | Team, Agent, Status, Priority, Tags, Channel, AI/Human, Date, Unread |
| Frontend (Device 1) | Full inbox implementation |
| Backend (Device 2) | Inbox query APIs with filtering/pagination |
| API Endpoints | GET /api/v1/inbox/conversations (with filters/sort/pagination) |
| Tests | Filtering, sorting, real-time updates |

### Module 12: Assignment and Routing
**Purpose:** Intelligent workload-based routing

| Category | Details |
|----------|---------|
| Rules | Agent eligible if: Online & Available, in correct team, has permissions, active_count < max_active (default 5, admin configurable) |
| Algorithm | Find eligible → lowest active count → round-robin tie-break → transactional assignment → prevent duplicates |
| Queue | If no eligible agent, queue in FIFO; process on agent availability/status change |
| Backend | Assignment service with locking/transactions |
| Frontend | Assignment display, queue indicator |
| DB Entities | assignment_rules(id, org_id, type, config_json), agent_workload(agent_id, active_count, last_assigned_at), queue_items(id, conversation_id, priority, queued_at, team_id) |
| API Endpoints | POST /api/v1/conversations/{id}/assign, GET /api/v1/queue |
| Tests | Routing logic, tie-breaking, capacity enforcement, transactional safety |

### Module 13: Agent Workspace
**Purpose:** Agent operations hub

| Category | Details |
|----------|---------|
| Features | Dashboard with metrics, availability control (Online/Available/Busy/Offline), notifications, conversation management |
| Dashboard Cards | All, Open, Queue, Pending, AI Chats, SLA compliance, Nearing deadline, Breached, FRT/Resolution time |
| Frontend (Device 1) | Complete workspace UI |
| Backend (Device 2) | Agent stats APIs, status management |
| DB Entities | agent_status(user_id, status, availability, last_seen_at, max_active_conversations) |
| API Endpoints | GET /api/v1/agent/dashboard, PUT /api/v1/agent/status, GET /api/v1/agent/stats |
| Tests | Dashboard data, status changes, availability rules |

### Module 14: Tags and Custom Fields
**Purpose:** Conversation organization

| Category | Details |
|----------|---------|
| Features | Predefined/custom tags, conversation tagging, custom fields per org |
| Backend | Tag CRUD, conversation tagging |
| Frontend | Tag selector, tag management |
| DB Entities | tags(id, org_id, name, color), conversation_tags(conversation_id, tag_id), custom_fields(id, org_id, name, type, options_json), conversation_custom_values(id, conversation_id, field_id, value) |
| API Endpoints | CRUD /api/v1/tags, POST /api/v1/conversations/{id}/tags |
| Tests | Tagging, filtering by tags |

### Module 15: Canned Responses and Internal Notes
**Purpose:** Efficiency tools

| Category | Details |
|----------|---------|
| Features | Canned responses (personal/team/org), internal notes (agent-only, never customer-visible), rich text |
| Backend | Canned response CRUD, internal note validation |
| Frontend | Canned response picker, internal note composer |
| DB Entities | canned_responses(id, org_id, team_id, user_id, title, content, shortcut, shared), messages with internal_note flag |
| API Endpoints | CRUD /api/v1/canned-responses |
| Security | Internal notes strictly filtered from public/customer APIs |
| Tests | Visibility rules, sharing permissions |

### Module 16: Business Hours and SLA
**Purpose:** SLA management

| Category | Details |
|----------|---------|
| Features | Business hours config, holidays, SLA policies (first response, resolution), breach tracking, escalations |
| SLA Calculation | Based on business hours, pause rules, breach alerts |
| Backend | SLA calculator, breach detection job |
| Frontend | SLA indicators, policy management |
| DB Entities | business_hours(id, org_id, timezone, schedule_json, holidays_json), sla_policies(id, org_id, name, first_response_minutes, resolution_minutes, conditions_json), sla_breaches(id, conversation_id, type, breached_at) |
| API Endpoints | CRUD /api/v1/business-hours, CRUD /api/v1/sla-policies |
| Tests | SLA calculation, business hours logic, breach detection |

### Module 17: Rule-Based Automation
**Purpose:** Automated workflows

| Category | Details |
|----------|---------|
| Features | Trigger-based rules (conversation created/updated/message received), actions (assign/tag/notify/change priority), conditions |
| Backend | Rule engine, condition evaluator, action executor |
| Frontend | Rule builder UI |
| DB Entities | automation_rules(id, org_id, name, enabled, trigger_type, conditions_json, actions_json, priority) |
| API Endpoints | CRUD /api/v1/automation-rules |
| Tests | Rule evaluation, action execution |

### Module 18: Chatbot and Bot Flows
**Purpose:** Bot handling before escalation

| Category | Details |
|----------|---------|
| Features | Bot flows, greetings, FAQs, data collection, handoff to AI/human |
| Backend | Bot flow engine |
| Frontend | Bot flow builder (admin) |
| DB Entities | bot_flows(id, org_id, name, enabled, flow_json, trigger_conditions) |
| API Endpoints | CRUD /api/v1/bot-flows |
| Tests | Flow execution, handoff logic |

### Module 19: AI Assistant and Copilot
**Purpose:** AI-first processing + agent copilot

| Category | Details |
|----------|---------|
| Features | AI-first on every conversation, intent detection, knowledge retrieval, safe resolution, escalation with summary, agent copilot (suggestions/replies/summary), AI kill switch, provider-neutral LLM |
| Safety | Never invent data, sensitive ops require human approval, uncertainty → escalate, insufficient knowledge → escalate, tool failure → escalate |
| Backend | AI service, prompt orchestration, RAG/knowledge retrieval, tool calling, safety checks, kill switch |
| Frontend | AI status indicators, copilot suggestions, escalation display |
| DB Entities | ai_configs(id, org_id, enabled, provider, model, api_key_ref, settings_json, kill_switch(bool)), ai_interactions(id, conversation_id, type, prompt_tokens, completion_tokens, model, resolved(bool), escalated(bool), reason), knowledge_items(id, org_id, title, content, category, enabled, source) |
| API Endpoints | GET/PUT /api/v1/ai/config, POST /api/v1/ai/copilot/suggest |
| Tests | AI-first flow, escalation rules, kill switch, safety constraints |

### Module 20: Knowledge Base
**Purpose:** Approved knowledge for AI and customers

| Category | Details |
|----------|---------|
| Features | FAQ management, categories, ordering, visibility, "Chat with us" on FAQ, KB articles, AI uses only approved KB |
| Frontend (Device 1) | FAQ display on Help page, admin KB management |
| Backend (Device 2) | KB CRUD, AI retrieval integration |
| DB Entities | knowledge_categories(id, org_id, name, order, visible), knowledge_articles(id, org_id, category_id, title, content, order, visible, allow_chat(bool)) |
| API Endpoints | CRUD /api/v1/knowledge/categories, CRUD /api/v1/knowledge/articles, GET /api/v1/public/knowledge/faqs |
| Tests | FAQ ordering/visibility, AI retrieval, chat-from-FAQ context |

### Module 21: Notifications
**Purpose:** Real-time alerts

| Category | Details |
|----------|---------|
| Features | In-app notifications, assignment alerts, SLA alerts, mentions, unread counts, real-time via WebSocket |
| Backend | Notification service, event triggers |
| Frontend | Notification bell, notification list |
| DB Entities | notifications(id, user_id, type, title, body, data_json, read_at, created_at) |
| API Endpoints | GET /api/v1/notifications, PUT /api/v1/notifications/{id}/read, PUT /api/v1/notifications/read-all |
| Tests | Notification delivery, read status |

### Module 22: Reporting and Analytics
**Purpose:** Performance metrics

| Category | Details |
|----------|---------|
| Metrics | Conversations volume, AI resolution rate, first response time, resolution time, agent workload, SLA compliance, queue time, CSAT-ready |
| Reports | Agent performance, team performance, channel performance, AI effectiveness |
| Backend | Analytics service, aggregation queries |
| Frontend | Charts/reports UI (Supervisor/Admin) |
| DB Entities | analytics_daily(id, org_id, date, metrics_json) (materialized views/aggregates) |
| API Endpoints | GET /api/v1/reports/overview, GET /api/v1/reports/agents, GET /api/v1/reports/ai |
| Tests | Calculations, permissions (Supervisor+ can view) |

### Module 23: APIs, Webhooks, and Integrations
**Purpose:** Extensibility

| Category | Details |
|----------|---------|
| Features | REST API (v1), API keys, webhooks (events), rate limiting, integration framework |
| Backend | API key auth, webhook dispatcher, event system |
| Frontend | API/integration settings |
| DB Entities | api_keys(id, org_id, name, key_hash, permissions_json, last_used_at, expires_at), webhooks(id, org_id, url, events_json, secret, enabled), webhook_deliveries(id, webhook_id, event_type, payload_json, status, response_code, delivered_at) |
| API Endpoints | CRUD /api/v1/api-keys, CRUD /api/v1/webhooks |
| Security | Key hashing, webhook signatures, rate limits |
| Tests | API auth, webhook delivery, rate limiting |

### Module 24: Campaigns and Proactive Messaging
**Purpose:** Outbound messaging (future-ready)

| Category | Details |
|----------|---------|
| Features | Campaigns, segments, proactive messages (with opt-in considerations), templates |
| Backend | Campaign service |
| Frontend | Campaign management UI |
| DB Entities | campaigns(id, org_id, name, status, segment_json, template_id, scheduled_at), campaign_messages(id, campaign_id, customer_id, status, sent_at) |
| API Endpoints | CRUD /api/v1/campaigns |
| Tests | Campaign creation, sending logic |

### Module 25: Administration and Audit Logs, Security/Reliability/Operations
**Purpose:** System governance

| Category | Details |
|----------|---------|
| Admin Settings | Org settings, general config, feature flags, AI kill switch |
| Audit Logs | All admin actions, sensitive operations, login attempts, permission changes |
| Security | Rate limiting, input validation, CORS, headers, secrets management, RLS-ready |
| Reliability | Health checks, background jobs, error tracking, logging |
| Operations | Docker setup, migrations, env management |
| Backend | Audit service, middleware, health endpoints |
| Frontend | Audit log viewer, system settings |
| DB Entities | audit_logs(id, org_id, user_id, action, resource_type, resource_id, ip, user_agent, metadata_json, created_at), system_settings(id, org_id, key, value_json) |
| API Endpoints | GET /api/v1/audit-logs, GET /api/v1/health, GET /api/v1/health/ready |
| Tests | Audit logging, security controls |

## 3. System Architecture

### Architecture Style
**Modular Monolith** - Single deployable application with clear module boundaries. Microservices only if demonstrated need.

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│  Agent       │  Admin       │  Help Center │  Chat Widget    │
│  Workspace   │  Portal      │  (Next.js)   │  (Embed/Script) │
└─────────────┴─────────────┴─────────────┴─────────────────┘
                            │ HTTP/WS
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                      │
│  FastAPI (Routes) → Middleware (Auth/RBAC/RateLimit/Audit)  │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer (Business Logic)           │
│  Auth, Conversation, Assignment, AI, SLA, Notification, etc.│
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  PostgreSQL (SQLAlchemy) + Redis (Cache/Queue/Session)     │
│  S3-compatible (Attachments)                                │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack (Proposed & Verified)
| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Frontend | Next.js (App Router) | 14.x LTS | TypeScript strict |
| Frontend UI | React | 18.x | With hooks |
| Styling | Tailwind CSS | 3.x | Design system |
| Backend | FastAPI | 0.115.x | Async, Pydantic v2 |
| ORM | SQLAlchemy | 2.0.x | Async support |
| Migrations | Alembic | 1.13.x | |
| Validation | Pydantic | 2.x | |
| Database | PostgreSQL | 16.x | Primary store |
| Cache/Queue | Redis | 7.x | Caching, sessions, pub/sub, jobs |
| Real-time | WebSockets (FastAPI + native WS) | - | With Redis pub/sub for scaling |
| Task Queue | Celery/RQ or FastAPI BackgroundTasks + Redis | - | Start simple, can upgrade |
| Storage | S3-compatible (MinIO for local dev) | - | Attachments |
| AI | Provider-neutral (OpenRouter/OpenAI/Anthropic/etc) | - | Configurable via env |
| Testing (Backend) | pytest, pytest-asyncio, httpx | - | |
| Testing (Frontend) | Vitest/Jest, React Testing Library | - | |
| E2E | Playwright | - | |
| Containerization | Docker, Docker Compose | - | |

*Verify compatibility and freeze versions before implementation.*

## 4. Repository Structure
```
ai-customer-support-platform/
├── .github/
│   └── workflows/          # CI (lint, test) - future
├── docs/                   # All documentation
│   ├── DECISIONS/         # ADRs
│   └── *.md               # Contracts, architecture, etc.
├── backend/
│   ├── alembic/           # Migrations
│   ├── app/
│   │   ├── api/v1/        # Route handlers
│   │   ├── core/          # Config, security, deps
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Helpers
│   │   ├── workers/       # Background jobs
│   │   └── main.py
│   ├── tests/
│   ├── requirements.txt   # or pyproject.toml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js App Router
│   │   ├── components/    # Shared UI components
│   │   ├── features/      # Feature modules
│   │   │   ├── agent-workspace/
│   │   │   ├── inbox/
│   │   │   ├── chat-widget/
│   │   │   ├── help-center/
│   │   │   └── admin/
│   │   ├── lib/           # API client, auth, realtime
│   │   ├── hooks/
│   │   ├── types/         # Shared types
│   │   └── styles/
│   ├── public/
│   ├── tests/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 5. Database Schema Plan (Core Entities)

Key entities with relationships:
- organizations (1:N) users, customers, conversations
- users (N:1) organizations, roles; many:N teams via team_members
- customers (1:N) conversations
- conversations (N:1) customer, channel, assigned_agent, team; (1:N) messages
- messages (N:1) conversation; attachments
- agent_status (1:1) users
- knowledge_articles (N:1) knowledge_categories
- ai_configs (1:1) organizations
- audit_logs (N:1) organizations, users

All tables: id (UUID), org_id for multi-tenancy where applicable, created_at, updated_at, soft deletes where sensible.

## 6. API Contract Plan

**Base:** `/api/v1/`
**Auth:** Bearer JWT (access) + httpOnly refresh cookie
**Response format:** 
```json
{
  "success": true,
  "data": {...},
  "message": "...",
  "meta": {"page": 1, "limit": 20, "total": 100}
}
```
**Error format:**
```json
{
  "success": false,
  "error": {"code": "ERROR_CODE", "message": "...", "details": {...}}
}
```
**Pagination:** `?page=1&limit=20` with meta
**Public routes:** `/api/v1/public/*` (widget, help center)

## 7. WebSocket Event Plan
Namespace/topics:
- `conversation:{id}` - conversation updates
- `inbox:{org_id}` - new conversations/assignments
- `agent:{user_id}` - agent notifications
- `queue:{org_id}:{team_id}` - queue updates

Events: `message.new`, `conversation.assigned`, `conversation.status_changed`, `agent.status_changed`, `notification.new`, `typing.start/stop`

## 8. AI Workflow & Safety Plan

### Mandatory Flow
1. Customer message → create/update conversation
2. AI processes with context + approved KB
3. Intent classification + resolution check
4. If resolvable with confidence & safe → AI responds, mark resolved or continue
5. If not resolvable/uncertain/sensitive/request human/KB insufficient/tool failure → escalate with summary
6. If human requested → route to assignment
7. Assignment engine assigns eligible agent or queues
8. Agent notified and handles

### Safety Rules
- Never invent customer info/transactions/policies/actions
- Refunds/financial/account changes require human approval by default
- Escalate on uncertainty, complexity, sensitivity, explicit request, insufficient KB, tool failure
- AI kill switch: when disabled/unavailable, human support continues
- Only use approved knowledge
- Structured outputs, tool calling with validation
- Log all AI interactions with tokens/costs
- Human-in-the-loop for sensitive operations

## 9. Assignment Algorithm
```python
def assign_conversation(conv, team_id):
    # 1. Find eligible agents
    eligible = agents where status in (online,available) 
                        and team_id matches 
                        and has permissions 
                        and active_count < max_active
    # 2. Select by lowest active_count
    candidates = group by active_count, take min
    # 3. Round-robin tie-break by last_assigned_at
    selected = min(candidates, key=lambda a: a.last_assigned_at)
    # 4. Transactional assignment with row lock
    with db.transaction():
        lock agent row, check still eligible/capacity
        assign conversation, increment agent.active_count
        update agent.last_assigned_at
        create assignment event, notify agent
```

## 10. Security & Permissions Plan
- RBAC enforced on backend for every protected endpoint
- Owner protection (cannot be demoted/deleted by others, only Owner transfers ownership)
- New registrations pending approval, blocked until approved
- JWT access + refresh, secure cookies
- Password hashing (bcrypt/argon2)
- Rate limiting per IP/user
- Input validation (Pydantic)
- CORS configured
- Security headers
- API keys hashed
- Webhook signatures
- Audit logging for sensitive actions
- Internal notes never exposed to customers
- No secrets in code/VCS

## 11. Testing Plan
| Type | Coverage | Tools |
|------|----------|-------|
| Unit (Backend) | Services, utils, rules engine | pytest |
| Integration (Backend) | API endpoints with DB | pytest + httpx + test DB |
| Unit (Frontend) | Components, hooks, utils | Vitest + RTL |
| E2E | Critical flows (auth, inbox, widget, assignment) | Playwright |
| Contract | API contract validation | OpenAPI/schema checks |

## 12. Development Phases
0. Product definition (complete - this blueprint)
1. Architecture & repo setup (Day 1)
2. Foundation (Auth, RBAC, DB, API shell, UI shell) 
3. Core support (Conversations, messages, inbox, assignment)
4. Customer experience (Widget, Help Center, FAQ)
5. AI & automation (AI-first, KB, escalation, copilot)
6. Operations (SLA, notifications, reports, admin, audit)
7. Hardening (Security, tests, perf, deployment prep)

## 13. Two-Developer Ownership Matrix

### Developer 1 (Device 1) - Frontend & Customer Experience
**Owns:**
- `frontend/` entire directory (with shared contracts coordination)
- Agent Workspace UI (dashboard, inbox layout, composer, panels)
- Customer chat widget
- Help & Support page / FAQ UI
- Frontend auth integration
- WebSocket client integration
- Shared UI components design system
- Frontend tests

**Shared (coordinate):** Root configs, shared types/contracts, package.json dependencies

### Developer 2 (Device 2) - Backend & AI & Admin
**Owns:**
- `backend/` entire directory
- All API endpoints
- Database models/migrations
- Business logic/services
- Authentication/Authorization
- Assignment & routing engine
- AI service & safety
- Real-time/WebSocket server
- Admin portal backend
- Background jobs
- Security, audit logs
- Backend tests

**Shared (coordinate):** docker-compose, .env.example, root docs, API contracts

### Integration Points (Joint Approval Required)
- API contract changes
- Database schema/migration changes affecting both
- WebSocket event contracts
- Shared TypeScript types/Pydantic schemas
- Authentication contract
- Environment variables
- Design system tokens that affect both

## 14. Git & Integration Workflow
- **Repo:** Single GitHub repo (created fresh)
- **Branches:** `main` (protected), `develop` (integration), feature branches per dev
- **Dev1 branch:** `feature/frontend-agent-customer-experience`
- **Dev2 branch:** `feature/backend-core-ai-admin`
- **Rules:** No direct push to main/develop, PR required, review migrations/contracts, pull develop before starting, resolve conflicts carefully
- **Workflow:** Feature branch → PR to develop → review → merge → sync

## 15. Implementation Order & Dependencies
1. **Setup (Joint):** Create repo, structure, contracts, ownership, env
2. **Foundation (Joint parallel):** DB models core, auth API + UI, RBAC, base UI components
3. **Core (Parallel):** Conversations/messages/inbox (BE+FE together per contract)
4. **Widget/Help (Dev1 heavy, Dev2 APIs):** Public APIs + widget UI
5. **AI (Dev2 heavy):** AI service with safety + integration points
6. **Routing/Assignment (Dev2) + UI (Dev1):** Assignment engine + workspace integration
7. **Admin/Reports (Split):** Admin APIs + admin UI
8. **Polish & Hardening (Joint):** Tests, security, performance

## 16. Acceptance Criteria (Global)
- Every module functional end-to-end (UI + API + DB)
- AI-first workflow enforced
- Assignment algorithm correct with constraints
- Permissions enforced backend-side
- Internal notes never exposed to customers
- No fake/placeholder data in production paths
- All shared contracts followed
- Tests pass
- Migrations work
- Security controls in place
- Documentation complete

## 17. First Deliverables Checklist
- [ ] docs/PRODUCT_REQUIREMENTS.md (detailed)
- [ ] docs/SYSTEM_ARCHITECTURE.md
- [ ] docs/REPOSITORY_STRUCTURE.md
- [ ] docs/DATABASE_SCHEMA.md
- [ ] docs/API_CONTRACTS.md
- [ ] docs/WEBSOCKET_EVENTS.md
- [ ] docs/SECURITY.md
- [ ] docs/DEVELOPMENT_WORKFLOW.md
- [ ] docs/FEATURE_OWNERSHIP.md
- [ ] docs/TESTING_STRATEGY.md
- [ ] docs/DEPLOYMENT.md
- [ ] docs/DECISIONS/ADR-001-architecture.md
- [ ] Shared contracts agreed
- [ ] Repo initialized with structure
- [ ] docker-compose.yml skeleton
- [ ] .env.example

---

**Status:** Blueprint complete. Ready for review and approval before implementation begins.
