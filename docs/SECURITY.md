# Security & Reliability

## Security Measures
- **Authentication**: JWT access + refresh tokens, bcrypt password hashing
- **Authorization**: RBAC enforced on backend for all protected endpoints
- **Input Validation**: Pydantic schemas on all requests
- **Rate Limiting**: Ready for implementation
- **CORS**: Configured
- **Audit Logs**: Track sensitive operations
- **Internal Notes**: Never exposed to customers
- **AI Safety**: Kill switch, escalation rules, no hallucination
- **Owner Protection**: Only owner can transfer ownership
- **Approval Workflow**: New users require admin approval
- **Secrets**: Environment variables only, never committed

## Reliability
- **Health Checks**: /api/v1/health endpoints
- **Database Transactions**: For critical operations
- **Row Locking**: Assignment uses SELECT FOR UPDATE
- **Error Handling**: Consistent error responses
- **Logging**: Structured logging ready

## AI Guardrails
- Every conversation passes through AI first
- Escalate on uncertainty, complexity, sensitivity
- Human approval for refunds/financial/account changes
- Kill switch disables AI, human support continues
- Only approved knowledge used
- Never invent customer data
