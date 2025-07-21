"use client";

import React, { useCallback, useState } from "react";

import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import {
  NeuralNetworkTrainingMetricsDisplay,
  DeepQNetworkDescription,
} from "./dqnComponents";
import { Idk } from "../../utils/playback-control-components/seek-bar";
import { WeightTableContainerProps } from "../../utils/weight-table-types";

export const UIRoot = ({
  network,
  numEpisodes,
  chartDataValues,
  networkDims,
  currentEpisode,
  handleCurrentEpisodeChange,
  isPaused,
  handlePauseBtn,
  handleMouseDown,
  greedyChartDataValues,
  playGreedySimulationHandler,
}: {
  network: WeightTableContainerProps[];
  numEpisodes: number;
  chartDataValues: TrainingMetricsChartData;
  networkDims: number[];
  currentEpisode: number;
  handleCurrentEpisodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPaused: boolean;
  handlePauseBtn: () => void;
  handleMouseDown: () => void;
  greedyChartDataValues: number[];
  playGreedySimulationHandler: () => void;
}) => {
  console.log("hi i re-rendered");

  const [selectedNeurons, setSelectedNeurons] = useState(() => {
    const networkNodeLayers: Set<number>[] = [];
    for (let i = 0; i < networkDims.length; ++i) {
      networkNodeLayers.push(new Set<number>());
    }
    return networkNodeLayers;
  });

  const handleNeuronClick = useCallback(
    (layerIndex: number, neuronIndex: number) => {
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
    },
    []
  );

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
            <Idk
              numEpisodes={numEpisodes}
              currentEpisode={currentEpisode}
              handleCurrentEpisodeChange={handleCurrentEpisodeChange}
              handleMouseDown={handleMouseDown}
              handlePauseBtn={handlePauseBtn}
              isPaused={isPaused}
              greedyChartDataValues={greedyChartDataValues}
              playGreedySimulationHandler={playGreedySimulationHandler}
            />
          </div>
          <NeuralNetworkTrainingMetricsDisplay
            network={network}
            selectedNeurons={selectedNeurons}
            chartData={chartDataValues}
          />
        </div>
        <DeepQNetworkDescription />
      </div>
    </>
  );
};
