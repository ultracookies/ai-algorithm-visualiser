from pydantic import BaseModel
from enum import Enum

class Action(str, Enum):
    GET_TRAINING_METRICS = 'get_training_metrics'
    SUBSCRIBE_NETWORK_PARAMS = 'subscribe'
    GET_GREEDY_SIM = 'get_greedy_sim'
    GET_GREEDY_SIM_METRICS = 'get_greedy_sim_metrics'

class Resource(str, Enum):
    NETWORK_WEIGHTS = 'network_weights'
    TRAINING_METRICS = 'training_metrics'
    GREEDY_SIM = 'greedy_sim'
    GREEDY_SIM_METRICS = 'greedy_sim_metrics'

class WSClientMessage(BaseModel):
    action: Action
    resource: Resource
    data: dict = {}