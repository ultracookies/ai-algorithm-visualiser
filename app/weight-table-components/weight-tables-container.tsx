import { WeightTableContainerProps } from "../weight-table-types";
import WeightTableContainer from "./weight-table-indv-container";

export default function WeightTablesContainer({
  network,
}: {
  network: WeightTableContainerProps[];
}) {
  return (
    <div
      className="flex flex-col gap-4 w-full border-white border-2 rounded-md items-center"
      style={{ overflow: "auto", height: "600px" }}
    >
      {Array.from(network).map((layer, i) => {
        return (
          <WeightTableContainer
            key={i}
            layerName={layer.layerName}
            layerWeights={layer.layerWeights}
          />
        );
      })}
    </div>
  );
}
