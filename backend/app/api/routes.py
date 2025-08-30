from fastapi import APIRouter
import orjson
from fastapi.responses import ORJSONResponse
import imageio.v3 as iio
import io

from fastapi import Request

from pathlib import Path

import app.algorithms.rl.vanlla_dqn.greedy_sim as greedy_sim
import base64

from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()

limiter = Limiter(key_func=get_remote_address)

@router.get("/ping")
async def ping():
    return {"message": "pong"}

@router.get('/rl/vdqn/cartpole', response_class=ORJSONResponse)
@limiter.exempt
async def vdqn(request: Request):
    file_path = Path(__file__).parent / '..' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'cartpole_vdqn_transposed_data.bin'
    with open(file_path, 'rb') as f:
        obj = orjson.loads(f.read())
        return ORJSONResponse(obj)

@router.get('/rl/vdqn/cartpole/greedy_simulation/{index}')
@limiter.limit('3/6 seconds')
async def greedy_simulation(request: Request, index: int, epsilon: float = 0.0):
    file_path = Path(__file__).parent / '..' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'cartpole_vdqn_data.bin'
    with open(file_path, 'rb') as f:
        obj = orjson.loads(f.read())
        index_network_instance = obj['network_instances'][index]
        simulation_frames, total_rewards = greedy_sim.simulate_cartpole(index_network_instance, epsilon, steps=100)
        video_buffer = io.BytesIO()
        with iio.imopen(video_buffer, 'w', extension='.mp4') as writer:
            writer.write(simulation_frames)

        video_bytes = video_buffer.getvalue()
        video_b64 = base64.b64encode(video_bytes).decode('ascii')

        return ORJSONResponse({
            'simulation': video_b64,
            'total_rewards': total_rewards
        })