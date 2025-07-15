"use client";

import React, { useState } from "react";

import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import { initMockNetwork } from "./mockNetworkUtils";
import {
  NeuralNetworkTrainingMetricsDisplay,
  DeepQNetworkDescription,
} from "./dqnComponents";
import { Idk } from "../../utils/playback-control-components/seek-bar";

export const Idk2 = () => {
  const networkDims = [5, 20, 10, 5, 3];
  const network = initMockNetwork(networkDims);

  const [selectedNeurons, setSelectedNeurons] = useState<Set<number>[]>(() => {
    const networkLayers: Set<number>[] = [];
    for (let i = 0; i < networkDims.length; ++i) {
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

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-white text-4xl font-bold m-4">Deep Q Network</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row mt-5">
          {/* parent component */}
          <div className="flex flex-col items-center" style={{ width: "45%" }}>
            <NeuralNetworkSVG
              networkDims={networkDims}
              selectedNeurons={selectedNeurons}
              handleNeuronClick={handleNeuronClick}
            />
            <Idk numEpisodes={200} />
          </div>
          <NeuralNetworkTrainingMetricsDisplay network={network} />
        </div>
        <DeepQNetworkDescription />
      </div>
    </>
  );
};
