from app.api.v1 import auth, conversations, ai

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["conversations"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
