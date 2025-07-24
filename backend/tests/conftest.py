import pytest
from httpx import AsyncClient
from app.main import app  # FastAPI app
import socketio

@pytest.fixture
async def async_client():
    async with AsyncClient(base_url='http://localhost:8000') as client:
        yield client

@pytest.fixture
async def sio_client():
    sio = socketio.AsyncClient()
    await sio.connect('http://localhost:8000')
    yield sio
    # await sio.disconnect()
