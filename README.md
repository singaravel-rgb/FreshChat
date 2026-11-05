# AI-First Customer Support Platform

A production-ready, AI-first customer support platform built from scratch with collaborative development.

## Features
- **AI-First Workflow**: Every conversation evaluated by AI before human assignment
- **Intelligent Routing**: Workload-based assignment with configurable limits
- **Shared Inbox**: Real-time agent workspace with 3-column layout
- **Chat Widget**: Embeddable widget for websites
- **Help & Support**: FAQ/Knowledge base with chat-from-FAQ
- **Admin Portal**: Complete platform management
- **SLA Management**: Business hours, policies, breach tracking
- **Real-Time**: WebSocket updates
- **Security**: RBAC, audit logs, AI safety guardrails

## Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+, SQLAlchemy 2.0, Pydantic v2
- **Database**: PostgreSQL 16
- **Cache/Queue**: Redis 7
- **Real-time**: WebSockets
- **Storage**: S3-compatible
- **AI**: Provider-neutral LLM integration

## Quick Start
```bash
cp .env.example .env
docker-compose up -d
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Documentation
See `docs/` for complete documentation:
- [Project Blueprint](docs/PROJECT_BLUEPRINT.md)
- [Product Requirements](docs/PRODUCT_REQUIREMENTS.md)
- [System Architecture](docs/SYSTEM_ARCHITECTURE.md)
- [API Contracts](docs/API_CONTRACTS.md)
- [Feature Ownership](docs/FEATURE_OWNERSHIP.md)
- [Development Workflow](docs/DEVELOPMENT_WORKFLOW.md)

## Development
Two developers working collaboratively on single repo with separate feature branches merged to `develop`.

## License
Proprietary
