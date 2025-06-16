"use client";

import { FixedSizeGrid } from "react-window";

import "./weighttablestyles.css";

interface WeightTableProps {
  layer: number[][];
}

export default function WeightTable({ layer }: WeightTableProps) {
  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      style={{
        ...style,
        padding: "1px", // creates a "gap" between cells
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "white", // cell color
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {layer[rowIndex][columnIndex]}
      </div>
    </div>
  );

  return (
    <FixedSizeGrid
      rowCount={layer.length}
      rowHeight={50}
      columnCount={layer[0].length}
      columnWidth={200}
      height={250}
      width={600}
      style={{
        background: "black",
      }}
    >
      {Cell}
    </FixedSizeGrid>
  );
}
