from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router

app = FastAPI(
    title="AI Customer Support Platform API",
    description="Production-ready AI-first customer support platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)

@app.get("/")
async def root():
    return {"message": "AI Customer Support Platform API", "version": "1.0.0", "docs": "/docs"}

@app.get(f"{settings.API_V1_PREFIX}/health")
async def health():
    return {"status": "healthy", "service": "backend"}
