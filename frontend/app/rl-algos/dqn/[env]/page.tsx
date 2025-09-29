import { WeightTableContainerProps } from "../../../utils/weight-table-types";
import fs from "fs";
import { notFound } from "next/navigation";
import UIRoot2 from "./UIRoot2";

import path from "path";

export default async function Page({
  params,
}: {
  params: Promise<{ env: string }>;
}) {
  const { env } = await params;
  const filePath = path.join(
    process.cwd(),
    "app/rl-algos/dqn/data/",
    `${env}.json`
  );

  let envData: any;
  let metrics: TrainingMetricsChartData = {
    epsilonDecay: [],
    lossFn: [],
    cumulativeRewards: [],
  };
  let trainingNetworkInstances: WeightTableContainerProps[][] = [[]];
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    envData = JSON.parse(file);
    const preprocessedData = preprocessRetrievedData(envData);
    metrics = preprocessedData.chartDataValues;
    trainingNetworkInstances = preprocessedData.networkInstances;
  } catch {
    notFound();
  }

  return (
    <UIRoot2
      trainingMetricsData={metrics}
      trainingNetworkInstances={trainingNetworkInstances}
      env={env}
    />
  );
}

function preprocessRetrievedData(data) {
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

  const preprocessedData: {
    networkInstances: WeightTableContainerProps[][];
    chartDataValues: TrainingMetricsChartData;
  } = {
    networkInstances: displayInstances,
    chartDataValues: displayChartDataValues,
  };
  return preprocessedData;
}
