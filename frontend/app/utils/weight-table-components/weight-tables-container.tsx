"use client";

import { WeightTableContainerProps } from "../weight-table-types";
import WeightTableContainer from "./weight-table-indv-container";
import { memo } from "react";

const WeightTablesContainer = memo(
  ({
    network,
    selectedNeurons,
  }: {
    network: WeightTableContainerProps[];
    selectedNeurons: Set<number>[];
  }) => {
    return (
      <div
        className="flex flex-col border-white border-1 p-6 items-center bg-slate-900 overflow-scroll"
        style={{ height: "100vh", borderRadius: "25px" }}
      >
        {Array.from(network).map((layer, i) => {
          return (
            <div className="mt-4 mb-4" key={i}>
              <WeightTableContainer
                layerName={layer.layerName}
                layerWeights={layer.layerWeights}
                layerBiases={layer.layerBiases}
                selectedNeuronsLayer={{
                  inputNeurons: selectedNeurons[i],
                  outputNeurons: selectedNeurons[i + 1],
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

export default WeightTablesContainer;

function WeightTablesContainer2({
  network,
  selectedNeurons,
}: {
  network: WeightTableContainerProps[];
  selectedNeurons: Set<number>[];
}) {
  return (
    <div
      className="flex flex-col border-white border-1 p-6 items-center bg-slate-900 overflow-scroll"
      style={{ height: "100vh", borderRadius: "25px" }}
    >
      {Array.from(network).map((layer, i) => {
        return (
          <div className="mt-4 mb-4" key={i}>
            <WeightTableContainer
              layerName={layer.layerName}
              layerWeights={layer.layerWeights}
              layerBiases={layer.layerBiases}
              selectedNeuronsLayer={{
                inputNeurons: selectedNeurons[i],
                outputNeurons: selectedNeurons[i + 1],
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
