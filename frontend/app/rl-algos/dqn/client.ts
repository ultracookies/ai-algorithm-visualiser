import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 50000,
});

export async function getTrainingMetrics() {
  try {
    const response = await instance.get("/rl/vdqn/cartpole");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getGreedySimulation(currentEpisode: number) {
  try {
    const response = await instance.get(
      "/rl/vdqn/cartpole/greedy_simulation/" + currentEpisode
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
