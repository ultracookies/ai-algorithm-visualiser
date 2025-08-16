from fastapi import FastAPI
from app.api.routes import router as api_router
from fastapi.middleware.cors import CORSMiddleware
# from app.core.socket import sio_app
# import socketio
# from socketio import ASGIApp
import logging

logger = logging.getLogger('uvicorn.error')

app = FastAPI()

origins = [
    "http://localhost:8000",
    'http://localhost:3000'
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

# app = ASGIApp(sio_app, app)