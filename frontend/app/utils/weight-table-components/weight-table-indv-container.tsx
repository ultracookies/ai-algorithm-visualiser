"use client";

import { useState } from "react";
import WeightTable from "./weight-table";

import "./weight-tables-style.css";

export default function WeightTableContainer({
  layerName,
  layerWeights,
  selectedNeuronsLayer,
}: {
  layerName: string;
  layerWeights: number[][];
  selectedNeuronsLayer: {
    inputNeurons: Set<number>;
    outputNeurons: Set<number>;
  };
}) {
  const [isDropped, setIsDropped] = useState(true);
  return (
    <div
      style={{
        border: "1px solid #fff",
        borderRadius: "20px",
      }}
      className="items-center dark:bg-slate-800 float-right w-175 p-3"
    >
      <div className="flex gap-x-4">
        <button
          onClick={() => setIsDropped((prev) => !prev)}
          // style={{ color: "white" }}
          className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600"
        >
          {isDropped ? (
            <i className="arrow down"></i>
          ) : (
            <i className="arrow right"></i>
          )}
        </button>
        <p className="text-3xl text-white">{layerName}</p>
      </div>

      <div
        className={`grid-slide-container ${
          isDropped ? "open" : "closed"
        } mx-auto flex mt-3 max-w-200 items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10`}
      >
        <WeightTable
          layerWeights={layerWeights}
          selectedNeuronsLayer={selectedNeuronsLayer}
        />
      </div>
    </div>
  );
}
