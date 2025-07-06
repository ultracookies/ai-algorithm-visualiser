import React from "react";

import "./globals.css";
import { WeightTableContainerProps } from "./weight-table-types";
import ClientNetworkController from "./ClientNetworkController";

function generateRandomArray(
  rowCount: number,
  columnCount: number
): number[][] {
  const layer: number[][] = [];
  for (let i = 0; i < rowCount; ++i) {
    const row: number[] = [];
    for (let j = 0; j < columnCount; ++j) row.push(Math.random());
    layer.push(row);
    layer;
  }
  return layer;
}

export default function Page() {
  const inputLayer: WeightTableContainerProps = {
    layerName: "Input Layer",
    layerWeights: generateRandomArray(5, 20),
  };

  const hiddenLayer: WeightTableContainerProps = {
    layerName: "Hidden Layer",
    layerWeights: generateRandomArray(20, 10),
  };

  const hiddenLayer2: WeightTableContainerProps = {
    layerName: "Hidden Layer 2",
    layerWeights: generateRandomArray(10, 5),
  };

  const outputLayer: WeightTableContainerProps = {
    layerName: "Output Layer",
    layerWeights: generateRandomArray(5, 3),
  };

  const network: WeightTableContainerProps[] = [
    inputLayer,
    hiddenLayer,
    hiddenLayer2,
    outputLayer,
  ];

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-white text-4xl font-bold m-4">Deep Q Network</h1>
      </div>
      <ClientNetworkController network={network} />
      <div className="flex flex-col">
        <DeepQNetworkDescription />
      </div>
    </>
  );
}

const DeepQNetworkDescription = () => {
  return (
    <>
      <p className="text-white text-2xl font-bold m-4">
        The Deep Q Network is a type of reinforcement learning algorithm that
        uses a neural network to approximate the Q-function. The Q-function is a
        function that maps a state and action to a scalar value, which
        represents the expected reward for taking that action in that state.
      </p>
      <br />
      <p className="text-white text-2xl font-bold m-4">
        The Deep Q Network is a type of reinforcement learning algorithm that
        uses a neural network to approximate the Q-function. The Q-function is a
        function that maps a state and action to a scalar value, which
        represents the expected reward for taking that action in that state. The
        Deep Q Network is a type of reinforcement learning algorithm that uses a
        neural network to approximate the Q-function.
      </p>
    </>
  );
};
