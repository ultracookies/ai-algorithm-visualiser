# import pytest
# import asyncio

# @pytest.mark.asyncio
# async def test_connect_event(sio_client):
#     result = {}

#     assert sio_client.connected

#     @sio_client.on('response1')
#     async def on_response1(data):
#         result['data'] = data
    
#         await sio_client.sleep(1)
#         assert result['data']['msg'] == 'Connected to ws server'

# @pytest.mark.asyncio
# async def test_client_message(sio_client):
#     result = {}
#     assert sio_client.connected

#     await sio_client.emit('message', {'msg': 'hello I am sending a message'})

#     @sio_client.on('response')
#     async def on_response(data):
#         result['data'] = data
#         await sio_client.sleep(1)
#         assert result['data']['msg'] == 'Received!'

# @pytest.mark.asyncio
# async def test_idk(sio_client):
#     result = {}

#     assert sio_client.connected
    
#     data = {
#         'action': 'get_resource',
#         'resource': 'training_metrics',
#     }

#     await sio_client.emit('joemama', data)

#     @sio_client.on('hi')
#     async def on_hi(res):
#         result.update(res)
    
#     await asyncio.sleep(1)
#     idk = result['data']
#     assert idk['epsilon_values'] == [0.99, 0.98, 0.97]
#     assert idk['loss_values'] == [1, 2, 3]
#     assert idk['cum_reward'] == [100, 200, 300]