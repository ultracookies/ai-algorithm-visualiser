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

export function idk(currentEpisode: number) {
  return instance.get("/rl/vdqn/cartpole/greedy_simulation/" + currentEpisode);
}

export async function getGreedySimulation(currentEpisode: number) {
  try {
    const response = await instance.get(
      "/rl/vdqn/cartpole/greedy_simulation/" + currentEpisode
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // const errorResponse = error.response;
      // console.error(errorResponse.data);
      // console.error(errorResponse.status);
      // console.error(errorResponse.headers);
      return error.response;
    } else if (error.request) {
      console.log("Error with no response");
      // console.error(error.request);
    } else {
      console.error("Error with request");
    }
    console.log("Error config");
    // console.error(error.config);
  }
}
