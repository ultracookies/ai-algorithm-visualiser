from fastapi import APIRouter
import orjson
from fastapi.responses import ORJSONResponse

from pathlib import Path

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong"}

@router.get('/rl/vdqn', response_class=ORJSONResponse)
async def vdqn():
    file_path = Path(__file__).parent / '..' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'ddqn.bin'
    with open(file_path, 'rb') as f:
        obj = orjson.loads(f.read())
        return ORJSONResponse(obj)
