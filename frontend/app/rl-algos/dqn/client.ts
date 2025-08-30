import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

export async function getTrainingMetrics() {
  try {
    const response = await instance.get("/rl/vdqn/cartpole");
    return response.data;
  } catch (error) {
    if (error.response) {
      // const errorResponse = error.response;
      // console.error(errorResponse.data);
      // console.error(errorResponse.status);
      // console.error(errorResponse.headers);
    } else if (error.request) {
      console.log("Error with no response");
      // console.error(error.request);
    } else {
      console.error("Error with request");
    }
    // console.log("Error config");
    // console.error(error.config);
  }
}

export async function getGreedySimulation(currentEpisode: number) {
  try {
    const response = await instance.get(
      "/rl/vdqn/cartpole/greedy_simulation/" + currentEpisode
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorResponse = error.response;
      console.error(errorResponse.data);
      console.error(errorResponse.status);
      console.error(errorResponse.headers);
    } else if (error.request) {
      console.log("Error with no response");
      console.error(error.request);
    } else {
      console.error("Error with request: " + error.message);
    }
    console.log("Error config");
    console.error(error.config);
  }
}
