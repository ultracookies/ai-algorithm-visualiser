import React from "react";
import WeightTable from "./weight-table-components/weight-table";

import "./globals.css";

function generateRandomArray(
  rowCount: number,
  columnCount: number
): number[][] {
  const layer: number[][] = [];
  for (let i = 0; i < rowCount; ++i) {
    const row: number[] = [];
    for (let j = 0; j < columnCount; ++j) row.push(Math.random());
    layer.push(row);
  }
  return layer;
}

export default function Page() {
  const layer = generateRandomArray(5, 5);

  return <WeightTable layer={layer} />;
}
