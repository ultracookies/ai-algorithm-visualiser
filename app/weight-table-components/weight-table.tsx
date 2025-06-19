"use client";

import { FixedSizeGrid } from "react-window";

import "./weighttablestyles.css";
import { useState, CSSProperties } from "react";

export interface WeightTableProps {
  weights: number[][];
}
interface GridCellProps {
  columnIndex: number;
  data: number[][];
  rowIndex: number;
  style: CSSProperties;
}

const CELL_WIDTH = 200;
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

const WeightTable = ({ weights }: WeightTableProps) => {
  const rowCount = weights.length;
  const columnCount = weights[0].length;

  return (
    <FixedSizeGrid
      rowCount={rowCount + 1}
      columnCount={columnCount + 1}
      rowHeight={CELL_HEIGHT}
      columnWidth={CELL_WIDTH}
      height={GRID_HEIGHT}
      width={GRID_WIDTH}
      itemData={weights}
    >
      {GridCell}
    </FixedSizeGrid>
  );
};

export default WeightTable;
