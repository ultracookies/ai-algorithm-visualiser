import socketio

sio_app = socketio.AsyncServer(async_mode="asgi")

@sio_app.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio_app.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio_app.event
async def message(sid, data):
    print(f"Message from {sid}: {data}")
    await sio_app.emit("response", {"msg": "Received!"}, to=sid)
