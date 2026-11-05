from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import structlog

logger = structlog.get_logger()

app = FastAPI(
    title="AI Customer Support Platform API",
    description="Production-ready AI-first customer support platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Customer Support Platform API", "version": "1.0.0", "docs": "/docs"}

@app.get("/api/v1/health")
async def health():
    return {"status": "healthy", "service": "backend"}
