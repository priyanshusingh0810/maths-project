import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import math_router

# Load environment variables from .env file if it exists
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

app = FastAPI(
    title="Math in Action — API Service",
    description="Mathematical computing backend for Smt. CHM College T.Y.B.Sc. Data Science Internal Assessment",
    version="1.0.0"
)

# Enable environment-based CORS configuration
frontend_url = os.getenv("FRONTEND_URL")
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
if frontend_url:
    if "," in frontend_url:
        origins.extend([o.strip() for o in frontend_url.split(",") if o.strip()])
    else:
        origins.append(frontend_url.strip())

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(math_router.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "project": "Math in Action - Interactive Mathematics Explorer",
        "course": "T.Y.B.Sc. Data Science (Autonomous)",
        "semester": "SEM-V",
        "academic_year": "2026-2027",
        "message": "FastAPI mathematical service is running."
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Math in Action API"
    }
