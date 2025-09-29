import axios from "axios";

const ENV = process.env.NODE_ENV;

let baseUrl = "http://localhost:8000";

if (ENV === "production") {
  baseUrl = "https://ai-algorithm-visualiser-1.onrender.com";
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
});

export function getGreedySim(currentEpisode: number) {
  return instance.get("/rl/vdqn/cartpole/greedy_simulation/" + currentEpisode);
}
