"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import {
  NeuralNetworkTrainingMetricsDisplay,
  DeepQNetworkDescription,
} from "./dqnComponents";
import { Idk } from "../../utils/playback-control-components/seek-bar";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import { getDims } from "./mockNetworkUtils";

export const Idk2 = ({
  network,
  numEpisodes,
}: {
  network: WeightTableContainerProps[];
  numEpisodes: number;
}) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);

  const networkDims = getDims(network);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedNeurons, setSelectedNeurons] = useState(() => {
    const networkNodeLayers: Set<number>[] = [];
    for (let i = 0; i < networkDims.length; ++i) {
      networkNodeLayers.push(new Set<number>());
    }
    return networkNodeLayers;
  });

  const [isPaused, setIsPaused] = useState(false);

  const handlePauseBtn = useCallback(() => setIsPaused(!isPaused), [isPaused]);

  const pauseTheUpdates = () => {
    setIsPaused(true);
  };

  const appendToChartData = (dataPoint: number) => {
    setChartData((prev) => {
      const data = [...prev];
      data.push(dataPoint);
      return data;
    });
  };

  const handleCurrentEpisodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentEpisode(Number(e.target.value));
  };

  const incrementCurrentEpisode = () => {
    const newEpisode =
      currentEpisode < numEpisodes ? currentEpisode + 1 : currentEpisode;
    setCurrentEpisode(newEpisode);
  };

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

  const handleMouseDown = () => {
    clearInterval(intervalRef.current!);
    pauseTheUpdates();
  };

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      incrementCurrentEpisode();
      appendToChartData(Math.random() * 100);
    }, 2000);

    return () => clearInterval(intervalRef.current!);
  });

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
            />
          </div>
          <NeuralNetworkTrainingMetricsDisplay
            network={network}
            selectedNeurons={selectedNeurons}
            chartData={chartData}
          />
        </div>
        <DeepQNetworkDescription />
      </div>
    </>
  );
};
