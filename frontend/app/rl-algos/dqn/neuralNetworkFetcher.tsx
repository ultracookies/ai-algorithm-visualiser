"use client";

import { getTrainingMetrics } from "./client";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import { useEffect } from "react";
import DataReceiver from "./DataReceiver";
import { initMockNetwork, generateRandomList } from "./mockNetworkUtils";

export default function NeuralNetworkFetcher() {
  const networkDims = [5, 20, 10, 1];
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

  useEffect(() => {
    const getData = async () => {
      const data = await getTrainingMetrics();
      const networkInstances = data.network_instances;

      //   for (let i = 0; i < networkInstances.length; ++i) {
      //     const instanceObj: Object = networkInstances[i];
      //     const layer: WeightTableContainerProps = {
      //       layerName: "Layer",
      //       layerBiases: [],
      //       layerWeights: [],
      //     };

      //     for (let j=0; j<instanceObj.)
      //   }

      const instance = networkInstances[0];
      for (const key in instance) {
        if (instance.hasOwnProperty(key)) {
          console.log(`Key: ${key}, Value: ${instance[key]}`);
        }
      }
    };

    getData();
  }, []);

  return (
    <DataReceiver
      networkInstances={displayData.networkInstances}
      chartDataValues={displayData.chartDataValues}
    />
  );
}
