import torch.nn as nn

class CartPoleNeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        HIDDEN_LAYER_DIMS = 24
        self.fc = nn.Sequential(
            nn.Linear(4, HIDDEN_LAYER_DIMS),
            nn.ReLU(),
            nn.Linear(HIDDEN_LAYER_DIMS, HIDDEN_LAYER_DIMS),
            nn.ReLU(),
            nn.Linear(HIDDEN_LAYER_DIMS, HIDDEN_LAYER_DIMS),
            nn.ReLU(),
            nn.Linear(HIDDEN_LAYER_DIMS, 2)
        )

    def forward(self, observation):
        return self.fc(observation)

cartpole_model = CartPoleNeuralNetwork()