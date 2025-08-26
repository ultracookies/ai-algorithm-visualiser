"use client";

import { WeightTableContainerProps } from "../../utils/weight-table-types";
import UIRoot2 from "./UIRoot2";

const DataReceiver2 = ({
  networkInstances,
  chartDataValues,
}: {
  networkInstances: WeightTableContainerProps[][];
  chartDataValues: TrainingMetricsChartData;
}) => {
  return (
    <UIRoot2
      trainingNetworkInstances={networkInstances}
      trainingMetricsData={chartDataValues}
    />
  );
};

export default DataReceiver2;
