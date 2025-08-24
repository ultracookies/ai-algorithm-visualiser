"use client";

import { getTrainingMetrics } from "./client";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import { useEffect, useState } from "react";
import DataReceiver from "./DataReceiver";
import { initMockNetwork, generateRandomList } from "./mockNetworkUtils";

export default function NeuralNetworkFetcher() {
  const networkDims = [4, 30, 30, 30, 2];
  const displayData: {
    networkInstances: WeightTableContainerProps[][];
    chartDataValues: TrainingMetricsChartData;
  } = {
    networkInstances: Array.from({ length: 5 }, () =>
      initMockNetwork(networkDims)
    ),
    chartDataValues: {
      epsilonDecay: generateRandomList(5),
      lossFn: generateRandomList(5),
      cumulativeRewards: generateRandomList(5),
    },
  };
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [display, setDisplay] = useState(displayData);

  const toggleIsLoading = () => {
    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTrainingMetrics();
        setDisplay(preprocessRetrievedData(data, displayData));
      } catch (error) {
        console.error("Error fetching network data:", error);
      }
    };

    getData();
  }, []);

  return (
    <DataReceiver
      networkInstances={display.networkInstances}
      chartDataValues={display.chartDataValues}
      isLoading={isLoading}
      toggleIsLoading={toggleIsLoading}
    />
  );
}

function preprocessRetrievedData(data, displayData) {
  const networkInstances = data.network_instances;
  const displayInstances: WeightTableContainerProps[][] = [];
  for (let i = 0; i < networkInstances.length; ++i) {
    const instanceObj: Object = networkInstances[i];
    const instanceDisplay: WeightTableContainerProps[] = [];
    for (let layer = 0; layer < 4; ++layer) {
      const weights: number[][] = instanceObj["layer" + layer]["weights"];
      const biases: number[] = instanceObj["layer" + layer]["biases"];
      let layerName = "Hidden Layer";
      if (layer == 0) {
        layerName = "Input Layer";
      }
      if (layer == 3) {
        layerName = "Output Layer";
      }
      const layerDisplay: WeightTableContainerProps = {
        layerWeights: weights,
        layerBiases: biases,
        layerName: layerName,
      };
      instanceDisplay.push(layerDisplay);
    }
    displayInstances.push(instanceDisplay);
  }

  const displayChartDataValues: TrainingMetricsChartData = {
    epsilonDecay: data.epsilon_values,
    lossFn: data.loss_values_per_episode,
    cumulativeRewards: data.total_rewards,
  };

  displayData.chartDataValues = displayChartDataValues;
  displayData.networkInstances = displayInstances;
  return displayData;
}
