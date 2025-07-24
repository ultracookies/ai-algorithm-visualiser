import pytest
import asyncio

@pytest.mark.asyncio
async def test_connect_event(sio_client):
    result = {}

    assert sio_client.connected

    @sio_client.on('response1')
    async def on_response1(data):
        result['data'] = data
    
    sio_client.sleep(1)
    assert result['data']['msg'] == 'Connected to ws server'