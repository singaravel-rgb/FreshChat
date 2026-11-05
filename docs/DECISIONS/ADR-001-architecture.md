# Architecture Decision Record: ADR-001 - Modular Monolith Architecture

**Status:** Accepted  
**Date:** 2026-11-05  
**Deciders:** Both developers

## Context
Need to build production-ready AI-first customer support platform from scratch with 2 developers. Must support future expansion to multi-org SaaS.

## Decision
Use a **modular monolith** architecture initially with:
- Frontend: Next.js 14 + TypeScript + Tailwind
- Backend: FastAPI + Python + SQLAlchemy
- Database: PostgreSQL
- Cache/Queue: Redis
- Real-time: WebSockets
- AI: Provider-neutral integration

## Rationale
- Faster development with 2 developers
- Simpler deployment and debugging
- Lower operational complexity
- Clear module boundaries still maintainable
- Easy to extract to microservices later if needed
- Shared database simplifies transactions (critical for assignment/routing)

## Consequences
**Positive:**
- Unified deployment
- Easier cross-module transactions
- Less network complexity
- Faster iteration

**Negative:**
- All modules in one process
- Scaling is all-or-nothing
- Need discipline on boundaries

**Mitigations:**
- Enforce module boundaries (services layer)
- Use clear folder structure
- Dependency injection
- Document module interfaces

## Alternatives Considered
- Microservices from start: Too complex for 2 devs, premature optimization
- Serverless: Less suitable for real-time WebSockets and long-running AI flows
