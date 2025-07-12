import React from "react";

import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import {
  MediaControls,
  SeekBar,
} from "../../utils/playback-control-components/seek-bar";
import { LineGraph } from "../../utils/training-metric-components";
import hi from "../../utils/photos/hi.jpeg";

function generateRandomArray(
  rowCount: number,
  columnCount: number
): number[][] {
  const layer: number[][] = [];
  for (let i = 0; i < rowCount; ++i) {
    const row: number[] = [];
    for (let j = 0; j < columnCount; ++j) row.push(Math.random());
    layer.push(row);
    layer;
  }
  return layer;
}

function getDims(layers: WeightTableContainerProps[]): number[] {
  const dims: number[] = [];
  dims.push(layers[0].layerWeights.length, layers[0].layerWeights[0].length);
  for (let i = 1; i < layers.length; ++i) {
    dims.push(layers[i].layerWeights[0].length);
  }
  return dims;
}

export default function Page() {
  const inputLayer: WeightTableContainerProps = {
    layerName: "Input Layer",
    layerWeights: generateRandomArray(5, 20),
  };

  const hiddenLayer: WeightTableContainerProps = {
    layerName: "Hidden Layer",
    layerWeights: generateRandomArray(20, 10),
  };

  const hiddenLayer2: WeightTableContainerProps = {
    layerName: "Hidden Layer 2",
    layerWeights: generateRandomArray(10, 5),
  };

  const outputLayer: WeightTableContainerProps = {
    layerName: "Output Layer",
    layerWeights: generateRandomArray(5, 3),
  };

  const network: WeightTableContainerProps[] = [
    inputLayer,
    hiddenLayer,
    hiddenLayer2,
    outputLayer,
  ];

  const networkDims = getDims(network);

  // const [selectedNeurons, setSelectedNeurons] = useState(() => {
  //   const networkLayers: Set<number>[] = [];
  //   Array.from({ length: network.length }, (_, i) => {
  //     networkLayers.push(new Set());
  //   });
  //   return networkLayers;
  // });

  // const handleNeuronClick = (layerIndex: number, neuronIndex: number) => {
  //   setSelectedNeurons((prev) => {
  //     if (prev[layerIndex].has(neuronIndex)) {
  //       prev[layerIndex].delete(neuronIndex);
  //     } else {
  //       prev[layerIndex].add(neuronIndex);
  //     }
  //     return [...prev];
  //   });
  // };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-white text-4xl font-bold m-4">Deep Q Network</h1>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row mt-5">
          {/* parent component */}

          <div className="flex flex-col items-center" style={{ width: "45%" }}>
            <NeuralNetworkSVG networkDims={networkDims} />
            <MediaControls />
            <SeekBar numEpisodes={200} />
          </div>
          <NeuralNetworkTrainingMetricsDisplay network={network} />
        </div>
        <GreedySimulationContainer />
        <DeepQNetworkDescription />
      </div>
    </>
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

const DeepQNetworkDescription = () => {
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
