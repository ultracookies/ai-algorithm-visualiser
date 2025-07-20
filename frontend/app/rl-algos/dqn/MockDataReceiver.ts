import { WeightTableContainerProps } from "../../utils/weight-table-types";
import { initMockNetwork } from "./mockNetworkUtils";

export function getNeuralNetworkData(networkDims: number[]): {
  network: WeightTableContainerProps[];
  trainingMetrics: {
    epsilonVal: number;
    cumRewardsVal: number;
    lossVal: number;
  };
} {
  const network = initMockNetwork(networkDims);
  const epsilonVal = Math.random();
  const cumRewardsVal = Math.random() * 500;
  const lossVal = Math.random() * 100;

  return {
    network: network,
    trainingMetrics: {
      epsilonVal: epsilonVal,
      cumRewardsVal: cumRewardsVal,
      lossVal: lossVal,
    },
  };
}
