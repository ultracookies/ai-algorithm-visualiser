"use client";

import { MediaControls, SeekBar } from "./playback-control-components/seek-bar";
import NeuralNetworkSVG from "./neural-network-components/neural-network-visual";
import { WeightTableContainerProps } from "./weight-table-types";
import { LineGraph } from "./training-metric-components";
import WeightTablesContainer from "./weight-table-components/weight-tables-container";
import hi from "./photos/hi.jpeg";

export default function ClientNetworkController({
  networkDims,
  network,
}: {
  networkDims: number[];
  network: WeightTableContainerProps[];
}) {
  return (
    <div className="flex flex-row mt-5">
      {/* parent component */}

      <div className="flex flex-col items-center" style={{ width: "45%" }}>
        <NeuralNetworkSVG networkDims={networkDims} />
        <MediaControls />
        <SeekBar numEpisodes={200} />
        <GreedySimulationContainer />
      </div>
      <NeuralNetworkTrainingMetricsDisplay network={network} />
    </div>
  );
}

const GreedySimulationContainer = () => {
  return (
    <>
      <button className="bg-blue-500 text-white p-2 rounded-md w-50 m-4">
        Play Greedy Simulation
      </button>
      <SimulationStream />
      <LineGraph numEpisodes={200} />
    </>
  );
};

const NeuralNetworkTrainingMetricsDisplay = ({
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
