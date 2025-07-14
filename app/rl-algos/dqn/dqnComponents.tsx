import { LineGraph } from "../../utils/training-metric-components";
import hi from "../../utils/photos/hi.jpeg";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";

export const NeuralNetworkTrainingMetricsDisplay = ({
  network,
}: {
  network: WeightTableContainerProps[];
}) => {
  return (
    <div className="flex flex-col" style={{ width: "auto" }}>
      <WeightTablesContainer network={network} />
      <LineGraph numEpisodes={200} />
      <LineGraph numEpisodes={200} />
      <LineGraph numEpisodes={200} />
    </div>
  );
};

export const GreedySimulationContainer = ({
  isPaused,
}: {
  isPaused: boolean;
}) => {
  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 rounded-md w-50 m-4"
        disabled={!isPaused}
      >
        Play Greedy Simulation
      </button>
      <SimulationStream />
      <LineGraph numEpisodes={200} />
    </>
  );
};

const SimulationStream = () => {
  return (
    <div
      className="flex h-96 p-4 border-2 border-gray-300 rounded-md mb-4 bg-white"
      style={{ width: "auto" }}
    >
      <img
        src={hi.src}
        alt="Gym Environment Stream"
        className="w-full h-full object-cover rounded-md"
      />
    </div>
  );
};

// maybe incorporate this into the layout.tsx?
export const DeepQNetworkDescription = () => {
  return (
    <>
      <p className="text-white text-2xl font-bold m-4">
        The Deep Q Network is a type of reinforcement learning algorithm that
        uses a neural network to approximate the Q-function. The Q-function is a
        function that maps a state and action to a scalar value, which
        represents the expected reward for taking that action in that state.
      </p>
      <br />
      <p className="text-white text-2xl font-bold m-4">
        The Deep Q Network is a type of reinforcement learning algorithm that
        uses a neural network to approximate the Q-function. The Q-function is a
        function that maps a state and action to a scalar value, which
        represents the expected reward for taking that action in that state. The
        Deep Q Network is a type of reinforcement learning algorithm that uses a
        neural network to approximate the Q-function.
      </p>
    </>
  );
};
