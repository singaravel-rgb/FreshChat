# API Contracts
**Base URL:** `/api/v1`  
**Auth:** Bearer token in Authorization header (except /public/*)

## Standard Response
```json
{
  "success": true|false,
  "data": object|array|null,
  "message": "string",
  "meta": {"page": 1, "limit": 20, "total": 100, "pages": 5}
}
```

## Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR|UNAUTHORIZED|FORBIDDEN|NOT_FOUND|CONFLICT|RATE_LIMITED|INTERNAL_ERROR",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Core Endpoints (Key)

### Auth
- POST `/auth/login` - Login
- POST `/auth/register` - Register (pending approval)
- POST `/auth/logout` - Logout
- POST `/auth/refresh` - Refresh token

### Conversations
- GET `/conversations` - List (paginated, filters)
- POST `/conversations` - Create
- GET `/conversations/{id}` - Get details
- GET `/conversations/{id}/messages` - Get messages
- POST `/conversations/{id}/messages` - Send message (public or agent)
- PUT `/conversations/{id}/assign` - Manual assign (if permitted)
- PUT `/conversations/{id}/status` - Update status

### Inbox (Agent)
- GET `/inbox/conversations` - Inbox with filters/sort
- GET `/agent/dashboard` - Dashboard stats
- PUT `/agent/status` - Update availability/status

### Public (Widget/Help)
- GET `/public/widget/config` - Widget config
- POST `/public/conversations` - Start conversation
- GET `/public/knowledge/faqs` - FAQ list
- POST `/public/conversations/from-faq` - Start chat from FAQ

### Admin
- CRUD `/employees`, `/teams`, `/roles`, `/knowledge/*`, `/ai/config`, `/sla-policies`, `/automation-rules`, `/audit-logs`

### AI
- GET/PUT `/ai/config` - AI configuration (kill switch)
- POST `/ai/copilot/suggest` - Copilot suggestions

## WebSocket Events
**Connect:** `/ws` with auth token  
**Rooms:** conversation:{id}, inbox:{org_id}, agent:{user_id}, queue:{org_id}

**Events:**
- `message.new` {conversation_id, message, sender_type}
- `conversation.assigned` {conversation_id, agent_id, agent_name}
- `conversation.status_changed` {conversation_id, status}
- `notification.new` {notification}
- `queue.updated` {team_id, count}
- `agent.status_changed` {agent_id, status, availability}

## Contract Rules
- Never change response structure silently
- Add fields as optional when backward compatible
- Breaking changes require coordination and versioning discussion
- Document all changes in API_CONTRACTS.md
- Keep FE/BE types in sync
