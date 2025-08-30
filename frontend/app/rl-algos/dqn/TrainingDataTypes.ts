export interface NeuralNetworkTrainingInstanceData {
  trainingInstances: NeuralNetworkTrainingInstance[];
}

export interface NeuralNetworkTrainingInstance {
  trainingInstanceLayers: NeuralNetworkTrainingInstanceLayer[];
}

export interface NeuralNetworkTrainingInstanceLayer {
  layerName: string;
  networkWeights: number[][];
  networkBiases: number[];
}

export interface TrainingMetricsChartData {
  epsilonDecay: number[];
  lossFn: number[];
  cumulativeRewards: number[];
}
