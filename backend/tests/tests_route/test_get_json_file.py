import hashlib
import orjson

def test_get_cartpole_vdqn(client):
    EXPECTED_LEN = 5815590
    EXPECTED_HASH = 'd173d316266f61ef64e76cb74a69df6e8129f2914d5e8f796649593f6a29b1c4'

    response = client.get('rl/vdqn/cartpole')
    assert response.status_code == 200

    content_len = response.headers['Content-Length']
    assert int(content_len) == EXPECTED_LEN

    res_content = response.content

    content_hash = hashlib.sha256(res_content).hexdigest()