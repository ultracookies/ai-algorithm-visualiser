"use client";

import { useState } from "react";

import "./weight-tables-style.css";
import BetterWeightTable from "./better-weight-table";

import Box from "@mui/material/Box";

export default function WeightTableContainer({
  layerName,
  layerWeights,
  layerBiases,
  selectedNeuronsLayer,
}: {
  layerName: string;
  layerWeights: number[][];
  layerBiases: number[];
  selectedNeuronsLayer: {
    inputNeurons: Set<number>;
    outputNeurons: Set<number>;
  };
}) {
  const [isDropped, setIsDropped] = useState(true);
  return (
    <Box
      sx={{
        border: "1px solid #fff",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        width: { xs: "70vw", lg: "50vw" },
        p: 2,
      }}
    >
      <div
        className="flex mx-auto items-center sm:mx-0 sm:items-right"
        style={
          {
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      >
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
        <p className="text-3xl text-white" style={{ marginLeft: 15 }}>
          {layerName}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
        className={`grid-slide-container ${isDropped ? "open" : "closed"}`}
      >
        <BetterWeightTable
          layerBiases={layerBiases}
          layerWeights={layerWeights}
          selectedNeuronsLayer={selectedNeuronsLayer}
        />
        {/* <WeightTable
          layerBiases={layerBiases}
          layerWeights={layerWeights}
          selectedNeuronsLayer={selectedNeuronsLayer}
        /> */}
      </div>
    </Box>
  );
}
