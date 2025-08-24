"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import { UIRoot } from "./UIRoot";
import { getDims } from "./mockNetworkUtils";
import { getGreedySimulation } from "./client";

export default function DataReceiver({
  networkInstances,
  chartDataValues,
  isLoading,
  toggleIsLoading,
}: {
  networkInstances: WeightTableContainerProps[][];
  chartDataValues: TrainingMetricsChartData;
  isLoading: boolean;
  toggleIsLoading: () => void;
}) {
  const networkDims = getDims(networkInstances[0]);

  const numEpisodes = networkInstances.length;

  const [currentNetworkWeights, setCurrentNetworkWeights] = useState<
    WeightTableContainerProps[]
  >([]);
  const [currentEpisode, setCurrentEpisode] = useState<number>(0);
  const [chartData, setChartData] = useState<TrainingMetricsChartData>({
    epsilonDecay: [],
    lossFn: [],
    cumulativeRewards: [],
  });
  const [isPaused, setIsPaused] = useState(false);
  const [greedyChartDataValues, setGreedyChartDataValues] = useState<number[]>(
    []
  );
  const [greedySimURL, setGreedySimURL] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleCurrentEpisodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const episode = Number(e.target.value);
    setCurrentEpisode(episode);
    setCurrentNetworkWeights(networkInstances[episode]);
    setChartData(() => {
      const newState: TrainingMetricsChartData = {
        epsilonDecay: chartDataValues.epsilonDecay.slice(0, episode + 1),
        lossFn: chartDataValues.lossFn.slice(0, episode + 1),
        cumulativeRewards: chartDataValues.cumulativeRewards.slice(
          0,
          episode + 1
        ),
      };
      return newState;
    });
  };

  const incrementCurrentEpisode = () => {
    const newEpisode =
      currentEpisode < numEpisodes - 1 ? currentEpisode + 1 : currentEpisode;
    setCurrentEpisode(newEpisode);
  };

  const handlePauseBtn = useCallback(() => setIsPaused(!isPaused), [isPaused]);

  const handleMouseDown = () => {
    clearInterval(intervalRef.current!);
    setIsPaused(true);
  };

  const fetchGreedySimData = async () => {
    toggleIsLoading();
    try {
      const greedySimData = await getGreedySimulation(currentEpisode);
      const greedySimChartData: number[] = greedySimData.total_rewards;
      const greedySimVidBytes = greedySimData.simulation;
      setGreedyChartDataValues(greedySimChartData);

      const blob = base64ToBlob(greedySimVidBytes, "video/mp4");
      const url = URL.createObjectURL(blob);
      setGreedySimURL(url);
    } catch (error) {
      console.error("Error fetching greedy simulation data: ", error);
    } finally {
      toggleIsLoading();
    }
  };

  const playGreedySimulationHandler = () => {
    fetchGreedySimData();
  };

  useEffect(() => {
    if (isPaused) return;

    setCurrentNetworkWeights(networkInstances[currentEpisode]);
    intervalRef.current = setInterval(() => {
      incrementCurrentEpisode();
      setChartData(() => {
        const newState: TrainingMetricsChartData = {
          epsilonDecay: chartDataValues.epsilonDecay.slice(
            0,
            currentEpisode + 1
          ),
          lossFn: chartDataValues.lossFn.slice(0, currentEpisode + 1),
          cumulativeRewards: chartDataValues.cumulativeRewards.slice(
            0,
            currentEpisode + 1
          ),
        };
        return newState;
      });
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
      greedySimURL={greedySimURL}
      isLoading={isLoading}
    />
  );
}

function base64ToBlob(base64: string, mime = "video/mp4"): Blob {
  const buf = Buffer.from(base64, "base64");
  return new Blob([buf], { type: mime });
}
