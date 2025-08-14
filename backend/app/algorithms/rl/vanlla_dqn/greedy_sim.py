import torch
import gymnasium as gym
import numpy as np

from . import gymenvs_neuralnets

def simulate_cartpole(network_instance: dict, epsilon: float, num_episodes=5, steps=500):
    frames = []
    total_rewards = []
    env = gym.make('CartPole-v1', render_mode='rgb_array')

    # for k, v in network_instance.items():
    #     network_instance[k] = torch.tensor(v)
    
    # model.load_state_dict(network_instance)

    for _ in range(num_episodes):
        obs, _ = env.reset()
        total_reward = 0
        for _ in range(steps):
            obs_tensor = torch.tensor(obs)
            q_values = gymenvs_neuralnets.cartpole_model(obs_tensor)
            greedy_action = torch.argmax(q_values).item()
            action = greedy_action
            if np.random.rand() < epsilon:
                action = env.action_space.sample()

            obs, reward, terminated, _, _ = env.step(action)
            total_reward += reward

            if terminated: break
            
            frame = env.render()
            frames.append(frame)
        
        total_rewards.append(total_reward)

    env.close()
    
    return frames, total_rewards