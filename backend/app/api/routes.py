from fastapi import APIRouter
import json
from fastapi.responses import ORJSONResponse

from pathlib import Path

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong"}

@router.get('/rl/vdqn')
async def vdqn():
    data = {}
    file_path = Path(__file__).parent / '..' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'vdqn.json'
    with open(file_path, 'r') as f:
        data.update(json.load(f))
    return data
