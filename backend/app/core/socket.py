import socketio

sio_app = socketio.AsyncServer(async_mode='asgi')

@sio_app.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")
    await sio_app.emit('response1', {'msg': 'Connected to ws server'}, to=sid)

@sio_app.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio_app.event
async def message(sid, data):
    print(f"Message from {sid}: {data}")
    await sio_app.emit("response", {"msg": "Received!"}, to=sid)

@sio_app.event
async def connect_error(data):
    print("The connection failed!")

@sio_app.on('joemama')
async def training_metrics(sid, data):
    response = {
        'data': {
            'epsilon_values': [0.99, 0.98, 0.97],
            'loss_values': [1, 2, 3],
            'cum_reward': [100, 200, 300]
        }
    }
    await sio_app.emit('hi', response)