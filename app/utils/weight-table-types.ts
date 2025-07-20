export interface WeightTableContainerProps {
  layerName: string;
  layerWeights: number[][];
}

export interface SelectedNeuronsLayer {
  inputNodes: Set<number>;
  outputNodes: Set<number>;
}
