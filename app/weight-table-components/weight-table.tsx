"use client";

import { FixedSizeGrid } from "react-window";

import "./weighttablestyles.css";
import { CSSProperties } from "react";

interface GridCellData {
  layerWeights: number[][];
  selectedNeuronSetsCopy: Set<number>[];
}

interface GridCellProps {
  columnIndex: number;
  data: GridCellData;
  rowIndex: number;
  style: CSSProperties;
}

const CELL_WIDTH = 175;
const CELL_HEIGHT = 50;

const GRID_HEIGHT = 250;
const GRID_WIDTH = 800;

export default function WeightTable({
  layerWeights,
  selectedNeuronSets,
}: {
  layerWeights: number[][];
  selectedNeuronSets: Set<number>[];
}) {
  const rowCount = layerWeights.length;
  const columnCount = layerWeights[0].length;

  const selectedNeuronSetsCopy = [];

  selectedNeuronSets.forEach((set) => {
    const setCopy = new Set<number>();
    set.forEach((neuron) => {
      setCopy.add(neuron + 1);
    });
    selectedNeuronSetsCopy.push(setCopy);
  });

  const data: GridCellData = { layerWeights, selectedNeuronSetsCopy };

  return (
    <FixedSizeGrid
      rowCount={rowCount + 1}
      columnCount={columnCount + 1}
      rowHeight={CELL_HEIGHT}
      columnWidth={CELL_WIDTH}
      height={GRID_HEIGHT}
      width={GRID_WIDTH}
      itemData={data}
      style={{ color: "white", fontSize: "12px" }}
    >
      {GridCell}
    </FixedSizeGrid>
  );
}

function GridCell({ columnIndex, data, rowIndex, style }: GridCellProps) {
  const { layerWeights, selectedNeuronSetsCopy } = data;

  const inputNeuronSet = selectedNeuronSetsCopy[0];
  const gridCellStyle = { ...style };

  if (inputNeuronSet.has(rowIndex)) {
    const outputNeuronSet = selectedNeuronSetsCopy[1];
    if (outputNeuronSet.size === 0 || outputNeuronSet.has(columnIndex)) {
      gridCellStyle.backgroundColor = "cyan";
    } else {
      gridCellStyle.backgroundColor = "transparent";
    }
  }

  if (columnIndex === 0 && rowIndex > 0) {
    return (
      <div style={{ ...style }} className="cell">
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
      <div style={{ ...gridCellStyle }} className="cell">
        {layerWeights[rowIndex - 1][columnIndex - 1]}
      </div>
    );
  }

  return null;
}
