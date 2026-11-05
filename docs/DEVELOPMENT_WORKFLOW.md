# Development Workflow
**Project:** AI-First Customer Support Platform

## Git Setup
- **Repository:** Single GitHub repo (new, created fresh)
- **Main branch:** `main` (protected - no direct pushes)
- **Integration branch:** `develop` (protected - PR required)
- **Dev 1 branch:** `feature/frontend-agent-customer-experience`
- **Dev 2 branch:** `feature/backend-core-ai-admin`

## Workflow
1. **Start:** `git checkout develop && git pull origin develop`
2. **Create feature work:** Work on assigned feature branch
3. **Commit often:** Small, meaningful commits with clear messages
4. **Sync regularly:** Pull develop into feature branch to stay updated
5. **PR:** Open PR from feature branch to develop with description
6. **Review:** Review contracts/migrations/integrations
7. **Merge:** After approval, merge to develop
8. **Deploy to main:** Only when stable and tested

## Rules (Strict)
- Never work directly on `main`
- Never push directly to `develop`
- Never force-push shared branches
- Never overwrite another developer's commits
- Never reset/delete other's work
- Review DB migrations and API contracts before merging
- Pull latest develop before starting new work
- Resolve conflicts carefully and test after resolution
- Coordinate changes to shared files
- No silent contract changes

## Coordination Protocol
**Before starting:**
- Agree on API contracts
- Agree on DB schema
- Agree on shared types/events
- Agree on folder ownership

**When changing contracts:**
1. Notify other developer
2. Explain reason
3. Document change in relevant doc
4. Update both sides
5. Update tests
6. Coordinate integration

## Development Phases
0. Product definition (Blueprint) ✓
1. Architecture & repo setup
2. Foundation
3. Core support system
4. Customer experience
5. AI & automation
6. Operations
7. Hardening

## First Steps
1. Create GitHub repo
2. Initialize local repos on both machines
3. Create branches
4. Agree on contracts
5. Setup docker-compose, env files
6. Start with foundation (auth + base structure)
