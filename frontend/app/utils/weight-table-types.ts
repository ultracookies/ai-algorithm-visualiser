export interface WeightTableContainerProps {
  layerName: string;
  layerWeights: number[][];
  layerBiases: number[];
}

export interface SelectedNeuronsLayer {
  inputNodes: Set<number>;
  outputNodes: Set<number>;
}
