import hashlib

def test_get_bin_file(client):
    EXPECTED_FILE_SIZE = 8267837
    EXPECTED_FILE_HASH = 'd0ee99e551305ca73dbbd56e49675d9820085e41f9ff2faf0836be9decd121de'

    response = client.get('/rl/vdqn')
    assert response.status_code == 200

    content_length = response.headers['Content-Length']
    assert int(content_length) == EXPECTED_FILE_SIZE

    content_hash = hashlib.sha256(response.content).hexdigest()
    assert content_hash == EXPECTED_FILE_HASH