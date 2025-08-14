from fastapi import FastAPI
from app.api.routes import router as api_router
# from app.core.socket import sio_app
# import socketio
# from socketio import ASGIApp
import logging

logger = logging.getLogger('uvicorn.error')

app = FastAPI()

# Include API routes
app.include_router(api_router)

# app = ASGIApp(sio_app, app)