import { WeightTableContainerProps } from "../../utils/weight-table-types";

export function initMockNetwork(nDims: number[]): WeightTableContainerProps[] {
  const network: WeightTableContainerProps[] = [];
  let j = 1;
  for (let i = 0; i < nDims.length - 1; ++i) {
    let layerName: string;
    if (i === 0) {
      layerName = "Input Layer";
    } else if (j === nDims.length - 1) {
      layerName = "Output Layer";
    } else {
      layerName = "Hidden Layer";
    }
    const layer: WeightTableContainerProps = {
      layerName: layerName,
      layerWeights: generateRandomArray(nDims[i], nDims[j++]),
    };
    network.push(layer);
  }
  return network;
}

function generateRandomArray(
  rowCount: number,
  columnCount: number
): number[][] {
  const layer: number[][] = [];
  for (let i = 0; i < rowCount; ++i) {
    const row: number[] = [];
    for (let j = 0; j < columnCount; ++j) row.push(Math.random());
    layer.push(row);
    layer;
  }
  return layer;
}

export function getDims(layers: WeightTableContainerProps[]): number[] {
  const dims: number[] = [];
  dims.push(layers[0].layerWeights.length, layers[0].layerWeights[0].length);
  for (let i = 1; i < layers.length; ++i) {
    dims.push(layers[i].layerWeights[0].length);
  }
  return dims;
}
