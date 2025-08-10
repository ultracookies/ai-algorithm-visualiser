from pathlib import Path
import json

def test_get_json_file(client):
    response = client.get('rl/vdqn')
    assert response.status_code == 200
    file_path = Path(__file__).parent / '..' / '..' / 'app' / 'algorithms' / 'rl' / 'vanlla_dqn' / 'vdqn.json'
    with open(file_path, 'r') as f:
        assert response.json() == json.load(f)