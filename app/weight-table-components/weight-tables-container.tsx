import { WeightTableContainerProps } from "../weight-table-types";
import WeightTableContainer from "./weight-table-indv-container";

export default function WeightTablesContainer({
  network,
}: {
  network: WeightTableContainerProps[];
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
            />
          </div>
        );
      })}
    </div>
  );
}
