"use client";

import { FixedSizeGrid } from "react-window";

import "./weighttablestyles.css";
import { CSSProperties } from "react";

interface GridCellProps {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: {
    networkWeights: number[][];
    selectedNeuronsLayer: {
      inputNeurons: Set<number>;
      outputNeurons: Set<number>;
    };
  };
}

const CELL_WIDTH = 175;
const CELL_HEIGHT = 50;

const GRID_HEIGHT = 250;
const GRID_WIDTH = 800;

function GridCell({ columnIndex, data, rowIndex, style }: GridCellProps) {
  // rowIndex is the input node
  // columnIndex is the output node

  const networkWeights = data.networkWeights;
  const selectedNeuronsLayer = data.selectedNeuronsLayer;

  const gridCellStyle = { ...style };

  const inputNeurons = selectedNeuronsLayer.inputNeurons;
  const outputNeurons = selectedNeuronsLayer.outputNeurons;

  if (rowIndex > 0 && columnIndex > 0) {
    if (inputNeurons.has(rowIndex - 1)) {
      if (outputNeurons.size === 0 || outputNeurons.has(columnIndex - 1)) {
        gridCellStyle.background = "cyan";
        gridCellStyle.color = "black";
      } else {
        gridCellStyle.background = "transparent";
        gridCellStyle.color = "white";
      }
    }
  }

  if (columnIndex === 0 && rowIndex > 0) {
    // row labels
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

  // column labels
  if (columnIndex > 0 && rowIndex === 0) {
    return (
      <div className="cell" style={{ ...style }}>
        {columnIndex}
      </div>
    );
  }

  if (columnIndex > 0 && rowIndex > 0) {
    return (
      <div style={gridCellStyle} className="cell">
        {networkWeights[rowIndex - 1][columnIndex - 1]}
      </div>
    );
  }

  return null;
}

const WeightTable = ({
  layerWeights,
  selectedNeuronsLayer,
}: {
  layerWeights: number[][];
  selectedNeuronsLayer: {
    inputNeurons: Set<number>;
    outputNeurons: Set<number>;
  };
}) => {
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
      itemData={{
        networkWeights: layerWeights,
        selectedNeuronsLayer: selectedNeuronsLayer,
      }}
      style={{ color: "white", fontSize: "12px" }}
    >
      {GridCell}
    </FixedSizeGrid>
  );
};

export default WeightTable;
