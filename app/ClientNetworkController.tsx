"use client";

import { MediaControls, SeekBar } from "./playback-control-components/seek-bar";
import NeuralNetworkSVG from "./neural-network-components/neural-network-visual";
import { WeightTableContainerProps } from "./weight-table-types";
import { LineGraph } from "./training-metric-components";
import WeightTablesContainer from "./weight-table-components/weight-tables-container";
import hi from "./photos/hi.jpeg";
import { useState } from "react";

export default function ClientNetworkController({
  network,
}: {
  network: WeightTableContainerProps[];
}) {
  const [selectedNeurons, setSelectedNeurons] = useState(() => {
    const networkLayers: Set<number>[] = [];
    for (let i = 0; i < network.length + 1; ++i) {
      networkLayers.push(new Set<number>());
    }
    return networkLayers;
  });

  const handleNeuronClick = (layerIndex: number, neuronIndex: number) => {
    setSelectedNeurons((prev) => {
      const newSelectedNeurons = prev.map((layer, index) => {
        if (index === layerIndex) {
          const newLayer = new Set(layer);
          if (newLayer.has(neuronIndex)) {
            newLayer.delete(neuronIndex);
          } else {
            newLayer.add(neuronIndex);
          }
          return newLayer;
        }
        return layer;
      });
      return newSelectedNeurons;
    });
  };

  const networkDims = getDims(network);

  return (
    <div className="flex flex-row mt-5">
      {/* parent component */}

      <div className="flex flex-col items-center" style={{ width: "45%" }}>
        <NeuralNetworkSVG
          networkDims={networkDims}
          onChange={handleNeuronClick}
          selectedNeurons={selectedNeurons}
        />
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

function getDims(layers: WeightTableContainerProps[]): number[] {
  const dims: number[] = [];
  dims.push(layers[0].layerWeights.length, layers[0].layerWeights[0].length);
  for (let i = 1; i < layers.length; ++i) {
    dims.push(layers[i].layerWeights[0].length);
  }
  return dims;
}
