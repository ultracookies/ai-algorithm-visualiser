import hashlib
import orjson

def test_get_cartpole_vdqn(client):
    EXPECTED_LEN = 5817814
    EXPECTED_HASH = '483fbb81e0570435670d9ac593fc8f9f2ff095b1651cf19eecf6b2ad73e1ad84'

    response = client.get('rl/vdqn/cartpole')
    assert response.status_code == 200

    content_len = response.headers['Content-Length']
    assert int(content_len) == EXPECTED_LEN

    res_content = response.content

    content_hash = hashlib.sha256(res_content).hexdigest()