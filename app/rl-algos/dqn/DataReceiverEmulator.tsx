"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import { initMockNetwork, updateMockNetwork } from "./mockNetworkUtils";
import { UIRoot } from "./UIRoot";

export default function DataReceiverEmulator({
  networkDims,
  numEpisodes,
  chartDataValues,
}: {
  networkDims: number[];
  numEpisodes: number;
  chartDataValues: number[];
}) {
  const [currentNetworkWeights, setCurrentNetworkWeights] = useState<
    WeightTableContainerProps[]
  >([]);
  const [currentEpisode, setCurrentEpisode] = useState<number>(0);
  const [chartData, setChartData] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [greedyChartDataValues, setGreedyChartDataValues] = useState<number[]>(
    []
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCurrentEpisodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const episode = Number(e.target.value);
    setCurrentEpisode(episode);
    setChartData(chartDataValues.slice(0, episode));
  };

  const incrementCurrentEpisode = () => {
    const newEpisode =
      currentEpisode < numEpisodes ? currentEpisode + 1 : currentEpisode;
    setCurrentEpisode(newEpisode);
  };

  const handlePauseBtn = useCallback(() => setIsPaused(!isPaused), [isPaused]);

  const handleMouseDown = () => {
    clearInterval(intervalRef.current!);
    setIsPaused(true);
  };

  const playGreedySimulationHandler = () => {
    console.log("bye");
    setGreedyChartDataValues(() => {
      return Array.from({ length: numEpisodes }, () => Math.random() * 100);
    });
  };

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      incrementCurrentEpisode();
      setChartData(chartDataValues.slice(0, currentEpisode));
      setCurrentNetworkWeights(updateMockNetwork(initMockNetwork(networkDims)));
    }, 2000);

    return () => clearInterval(intervalRef.current!);
  });

  return (
    <UIRoot
      network={currentNetworkWeights}
      numEpisodes={numEpisodes}
      chartDataValues={chartData}
      networkDims={networkDims}
      currentEpisode={currentEpisode}
      handleCurrentEpisodeChange={handleCurrentEpisodeChange}
      isPaused={isPaused}
      handlePauseBtn={handlePauseBtn}
      handleMouseDown={handleMouseDown}
      greedyChartDataValues={greedyChartDataValues}
      playGreedySimulationHandler={playGreedySimulationHandler}
    />
  );
}
