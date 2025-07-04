"use client";

import React, { useState } from "react";

const layerRadius = 8;
const verticalSpacing = 30;

/**
 * Returns Y positions for neurons spaced vertically and centered.
 */
const getNeuronYPositions = (count: number): number[] => {
  const totalHeight = (count - 1) * verticalSpacing;
  const startY = 300 - totalHeight / 2;
  return Array.from({ length: count }, (_, i) => startY + i * verticalSpacing);
};

const NeuralNetworkSVG = ({ networkDims }: { networkDims: number[] }) => {
  const [selectedNeurons, setSelectedNeurons] = useState<Set<string>>(
    new Set()
  );

  const layerCount = networkDims.length;
  const layerPositions = Array.from({ length: layerCount }, (_, i) => {
    if (layerCount === 1) return 300;
    const totalWidth = 400;
    const startX = 100;
    const step = totalWidth / (layerCount - 1);
    return startX + i * step;
  });

  const neurons: number[][] = networkDims.map((count) =>
    getNeuronYPositions(count)
  );

  const handleNeuronClick = (layerIndex: number, neuronIndex: number) => {
    const neuronKey = `${layerIndex}-${neuronIndex}`;
    setSelectedNeurons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(neuronKey)) {
        newSet.delete(neuronKey);
      } else {
        newSet.add(neuronKey);
      }
      return newSet;
    });
  };

  const getNeuronFill = (layerIndex: number, neuronIndex: number) => {
    const neuronKey = `${layerIndex}-${neuronIndex}`;
    return selectedNeurons.has(neuronKey) ? "#ef4444" : "#1d4ed8";
  };

  const getNeuronClass = (layerIndex: number, neuronIndex: number) => {
    const neuronKey = `${layerIndex}-${neuronIndex}`;
    return selectedNeurons.has(neuronKey) ? "neuron selected" : "neuron";
  };

  return (
    <div className="flex flex-col gap-4">
      <style jsx>{`
        .neuron {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .neuron.selected {
          filter: drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            filter: drop-shadow(0 0 8px #ef4444) drop-shadow(0 0 16px #ef4444);
          }
          50% {
            filter: drop-shadow(0 0 12px #ef4444) drop-shadow(0 0 24px #ef4444);
          }
        }
      `}</style>

      <svg viewBox="0 0 600 600" className="w-150 h-auto">
        {/* Connections */}
        {neurons.map((layer, layerIndex) => {
          if (layerIndex === neurons.length - 1) return null;
          const nextLayer = neurons[layerIndex + 1];
          return layer.flatMap((y1, i) =>
            nextLayer.map((y2, j) => (
              <line
                key={`line-${layerIndex}-${i}-${j}`}
                x1={layerPositions[layerIndex]}
                y1={y1}
                x2={layerPositions[layerIndex + 1]}
                y2={y2}
                stroke="#ccc"
                strokeWidth={1}
              />
            ))
          );
        })}

        {/* Neuron nodes */}
        {neurons.map((layer, layerIndex) =>
          layer.map((y, i) => (
            <circle
              key={`circle-${layerIndex}-${i}`}
              cx={layerPositions[layerIndex]}
              cy={y}
              r={layerRadius}
              fill={getNeuronFill(layerIndex, i)}
              onClick={() => handleNeuronClick(layerIndex, i)}
              className={getNeuronClass(layerIndex, i)}
            />
          ))
        )}
      </svg>
    </div>
  );
};

export default NeuralNetworkSVG;
