"use client";

import React from "react";

import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import {
  MediaControls,
  SeekBar,
} from "../../utils/playback-control-components/seek-bar";

export default function Page() {
  const networkDims = [5, 20, 10, 5, 3];
  const network = initMockNetwork(networkDims);
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-white text-4xl font-bold m-4">Deep Q Network</h1>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row mt-5">
          {/* parent component */}

          <div className="flex flex-col items-center" style={{ width: "45%" }}>
            <NeuralNetworkSVG networkDims={networkDims} />
            <MediaControls />
            <SeekBar numEpisodes={200} />
          </div>
          <NeuralNetworkTrainingMetricsDisplay network={network} />
        </div>
        <GreedySimulationContainer />
        <DeepQNetworkDescription />
      </div>
    </>
  );
}
