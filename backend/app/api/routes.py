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

from memory_profiler import memory_usage

router = APIRouter()

limiter = Limiter(key_func=get_remote_address)

file_path = Path(__file__).parent / '..' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'cartpole_vdqn_transposed_data.bin'
with open(file_path) as f:
    cartpole_transposed_data = orjson.loads(f.read())

file_path = Path(__file__).parent / '..' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'cartpole_vdqn_data.bin'
with open(file_path) as f:
    cartpole_data = orjson.loads(f.read())

@router.get("/ping")
async def ping():
    return {"message": "pong"}

@router.get('/rl/vdqn/cartpole', response_class=ORJSONResponse)
@limiter.exempt
async def vdqn(request: Request):
    return ORJSONResponse(cartpole_transposed_data)

@router.get('/rl/vdqn/cartpole/greedy_simulation/{index}')
@limiter.limit('3/6 seconds')
async def greedy_simulation(request: Request, index: int, epsilon: float = 0.0):
    index_network_instance = cartpole_data['network_instances'][index]

    mem_usage, (simulation_frames, total_rewards) = memory_usage((greedy_sim.simulate_cartpole, (index_network_instance, epsilon), {'steps': 100}), retval=True, max_usage=True)
    print(mem_usage)

    # simulation_frames, total_rewards = greedy_sim.simulate_cartpole(index_network_instance, epsilon, steps=100)
    video_buffer = io.BytesIO()

    iio.imwrite(video_buffer, simulation_frames, extension='.mp4', macro_block_size=1)

    video_bytes = video_buffer.getvalue()
    video_b64 = base64.b64encode(video_bytes).decode('ascii')

    return ORJSONResponse({
        'simulation': video_b64,
        'total_rewards': total_rewards
    })