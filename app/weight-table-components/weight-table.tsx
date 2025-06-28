"use client";

import { FixedSizeGrid } from "react-window";

import "./weighttablestyles.css";
import { CSSProperties } from "react";

interface GridCellProps {
  columnIndex: number;
  data: number[][];
  rowIndex: number;
  style: CSSProperties;
}

const CELL_WIDTH = 175;
const CELL_HEIGHT = 50;

const GRID_HEIGHT = 250;
const GRID_WIDTH = 800;

function GridCell({ columnIndex, data, rowIndex, style }: GridCellProps) {
  if (columnIndex === 0 && rowIndex > 0) {
    return (
      <div
        style={{
          ...style,
        }}
        className="cell"
      >
        <div>{rowIndex}</div>
      </div>
    );
  }

  if (columnIndex > 0 && rowIndex === 0) {
    return (
      <div className="cell" style={{ ...style }}>
        {columnIndex}
      </div>
    );
  }

  if (columnIndex > 0 && rowIndex > 0) {
    return (
      <div style={{ ...style }} className="cell">
        {data[rowIndex - 1][columnIndex - 1]}
      </div>
    );
  }

  return null;
}

const WeightTable = ({ layerWeights }: { layerWeights: number[][] }) => {
  const rowCount = layerWeights.length;
  const columnCount = layerWeights[0].length;

  return (
    <FixedSizeGrid
      rowCount={rowCount + 1}
      columnCount={columnCount + 1}
      rowHeight={CELL_HEIGHT}
      columnWidth={CELL_WIDTH}
      height={GRID_HEIGHT}
      width={GRID_WIDTH}
      itemData={layerWeights}
      style={{ color: "white", fontSize: "12px" }}
    >
      {GridCell}
    </FixedSizeGrid>
  );
};

export default WeightTable;
