from fastapi import FastAPI
from app.api.routes import router as api_router
from app.api.routes import limiter
from fastapi.middleware.cors import CORSMiddleware
import logging

from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

logger = logging.getLogger('uvicorn.error')

app = FastAPI()

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = [
    "http://localhost:8000",
    'http://localhost:3000',
    'https://ai-algorithm-visualiser.vercel.app/rl-algos/dqn'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)
