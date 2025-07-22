from fastapi import FastAPI
from app.api.routes import router as api_router
from app.core.socket import sio_app
import socketio

app = FastAPI()

# Mount Socket.IO ASGI app
app.mount("/ws", socketio.ASGIApp(sio_app))

# Include API routes
app.include_router(api_router)
