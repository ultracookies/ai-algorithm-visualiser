import orjson

def test_get_greedy_sim(client):
    response = client.get('/rl/vdqn/cartpole/0')
    assert response.status_code == 200

    content_json = response.content
    content = orjson.loads(content_json)
    assert content['total_rewards'].__len__() == 5