# Testing Strategy

## Testing Pyramid
- **Unit Tests (60%)**: Services, utils, business logic
- **Integration Tests (30%)**: API endpoints with DB
- **E2E Tests (10%)**: Critical user flows

## Backend Testing (pytest)
```bash
cd backend
pytest tests/ -v --cov=app
```

## Frontend Testing
```bash
cd frontend
npm run test
```

## E2E Testing (Playwright)
- Login/Registration flow
- Agent inbox workflow
- Assignment routing
- Chat widget flow
- AI escalation flow
- Admin approval flow

## Key Test Areas
- Authentication & authorization
- Assignment algorithm correctness
- AI-first workflow enforcement
- Internal notes never exposed
- Permission enforcement
- SLA calculations
- WebSocket events

## CI/CD Ready
Tests will run on PR to develop/main
