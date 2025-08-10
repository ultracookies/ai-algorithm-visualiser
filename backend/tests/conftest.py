import pytest
import socketio
from app.main import app

from fastapi.testclient import TestClient

@pytest.fixture
def client():
    client = TestClient(app)
    yield client
    client.close()
    

@pytest.fixture
async def sio_client():
    sio = socketio.AsyncClient()
    await sio.connect('http://test')
    yield sio
    await sio.disconnect()
