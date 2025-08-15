import orjson

def test_get_greedy_sim(client):
    EXPECTED_TOTAL_REWARDS_LEN = 5

    response = client.get('/rl/vdqn/cartpole/greedy_simulation/0')
    assert response.status_code == 200

    content_json = response.content
    content = orjson.loads(content_json)
    greedy_rewards = content['total_rewards']
    assert len(greedy_rewards) == EXPECTED_TOTAL_REWARDS_LEN

def test_get_greedy_sim_final_instance(client):
    EXPECTED_TOTAL_REWARDS_LEN = 5

    response = client.get('/rl/vdqn/cartpole/greedy_simulation/138')
    assert response.status_code == 200

    content_json = response.content
    content = orjson.loads(content_json)
    greedy_rewards = content['total_rewards']
    assert len(greedy_rewards) == EXPECTED_TOTAL_REWARDS_LEN

    for reward in greedy_rewards:
        assert reward == 100

def test_get_greedy_sim_with_epsilon(client):
    pass