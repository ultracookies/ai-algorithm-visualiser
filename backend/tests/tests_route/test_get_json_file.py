import hashlib

EXPECTED_FILE_SIZE = 25605
EXPECTED_FILE_HASH = '8f7f7aface65890bfb583ec83f8598748524fc3e3e8f422bfdf63fb4b3129145'

def test_get_json_file(client):
    response = client.get('rl/vdqn')
    assert response.status_code == 200

    content_length = response.headers['Content-Length']
    assert int(content_length) == EXPECTED_FILE_SIZE

    content_hash = hashlib.sha256(response.content).hexdigest()
    assert content_hash == EXPECTED_FILE_HASH

    