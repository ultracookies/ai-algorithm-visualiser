import hashlib
import orjson

def test_get_cartpole_vdqn(client):
    EXPECTED_LEN = 5818370
    EXPECTED_HASH = '5592bf90805bf9869dcaae3b1d0edb7aecaf3f4b3495d5e5ba984a94684abaa0'

    response = client.get('rl/vdqn/cartpole')
    assert response.status_code == 200

    content_len = response.headers['Content-Length']
    assert int(content_len) == EXPECTED_LEN

    res_content = response.content

    content_hash = hashlib.sha256(res_content).hexdigest()