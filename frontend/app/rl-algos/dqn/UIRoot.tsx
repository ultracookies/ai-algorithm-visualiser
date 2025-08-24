"use client";

import React, { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";

import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import { TrainingMetrics, GreedySimulationComponent } from "./dqnComponents";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import { Idk } from "../../utils/playback-control-components/seek-bar";
import { WeightTableContainerProps } from "../../utils/weight-table-types";

export const UIRoot = ({
  network,
  numEpisodes,
  chartDataValues,
  networkDims,
  currentEpisode,
  handleCurrentEpisodeChange,
  isPaused,
  handlePauseBtn,
  handleMouseDown,
  greedyChartDataValues,
  playGreedySimulationHandler,
  greedySimURL,
  isLoading,
}: {
  network: WeightTableContainerProps[];
  numEpisodes: number;
  chartDataValues: TrainingMetricsChartData;
  networkDims: number[];
  currentEpisode: number;
  handleCurrentEpisodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPaused: boolean;
  handlePauseBtn: () => void;
  handleMouseDown: () => void;
  greedyChartDataValues: number[];
  playGreedySimulationHandler: () => void;
  greedySimURL: string;
  isLoading: boolean;
}) => {
  const [selectedNeurons, setSelectedNeurons] = useState(() => {
    const networkNodeLayers: Set<number>[] = [];
    for (let i = 0; i < networkDims.length; ++i) {
      networkNodeLayers.push(new Set<number>());
    }
    return networkNodeLayers;
  });

  const handleNeuronClick = useCallback(
    (layerIndex: number, neuronIndex: number) => {
      setSelectedNeurons((prev) => {
        const newSelectedNeurons = prev.map((layer, index) => {
          if (index === layerIndex) {
            const newLayer = new Set(layer);
            if (newLayer.has(neuronIndex)) {
              newLayer.delete(neuronIndex);
            } else {
              newLayer.add(neuronIndex);
            }
            return newLayer;
          }
          return layer;
        });
        return newSelectedNeurons;
      });
    },
    []
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <NeuralNetworkSVG
              networkDims={networkDims}
              selectedNeurons={selectedNeurons}
              handleNeuronClick={handleNeuronClick}
            />
          </Box>

          <Idk
            numEpisodes={numEpisodes}
            currentEpisode={currentEpisode}
            handleCurrentEpisodeChange={handleCurrentEpisodeChange}
            handleMouseDown={handleMouseDown}
            isPaused={isPaused}
            handlePauseBtn={handlePauseBtn}
          />
        </Box>
        <Box sx={{ m: 3 }}>
          <WeightTablesContainer
            network={network}
            selectedNeurons={selectedNeurons}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Button variant="outlined" onClick={playGreedySimulationHandler}>
            Play Greedy Simulation
          </Button>
          <GreedySimulationComponent
            greedySimURL={greedySimURL}
            greedyChartDataValues={greedyChartDataValues}
            isLoading={isLoading}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <TrainingMetrics chartData={chartDataValues} />
        </Box>
      </Box>
    </>
  );
};
