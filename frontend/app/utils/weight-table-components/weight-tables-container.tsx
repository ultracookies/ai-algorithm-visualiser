"use client";

import { WeightTableContainerProps } from "../weight-table-types";
import WeightTableContainer from "./weight-table-indv-container";

export default function WeightTablesContainer({
  network,
  selectedNeurons,
}: {
  network: WeightTableContainerProps[];
  selectedNeurons: Set<number>[];
}) {
  return (
    <div
      className="flex flex-col border-white border-2 p-6 rounded-md items-center bg-slate-900 overflow-scroll"
      style={{ height: "500px" }}
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
