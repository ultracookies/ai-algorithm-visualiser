"use client";

import React, { useCallback, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import { TrainingMetrics, GreedySimulationComponent } from "./dqnComponents";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import { Idk } from "../../utils/playback-control-components/seek-bar";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Slider from "@mui/material/Slider";

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
  const cellRefs = useRef({});

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
    <Container maxWidth={false}>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 50,
          padding: 2,
        }}
      >
        Deep Q Network
      </h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "column", lg: "row" },
          p: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: {
              md: "50%",
              lg: "35%",
            },
            textAlign: "center",
          }}
        >
          <h2 style={{ color: "white", fontSize: 30 }}>
            Neural Network Diagram
          </h2>
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: "oklch(27.9% 0.041 260.031)",
              borderRadius: "25px",
              // width: {
              //   md: "50%",
              //   lg: "35%",
              // },
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
        </Box>
        <Box
          sx={{
            width: { md: "75%", lg: "65%" },
            textAlign: "center",
            mt: {},
          }}
        >
          <h2 style={{ color: "white", fontSize: 30, padding: 10 }}>
            Weight Table
          </h2>
          <Box
            sx={{
              height: "100vh",
              m: 3,
            }}
          >
            <WeightTablesContainer
              network={network}
              selectedNeurons={selectedNeurons}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: 30,
              padding: 10,
              paddingBottom: 20,
            }}
          >
            See How The Network Performs!
          </h2>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Button
              sx={{ mb: 3 }}
              variant="contained"
              onClick={playGreedySimulationHandler}
              disabled={!isPaused}
              endIcon={<PlayArrow />}
            >
              Play Greedy Simulation
            </Button>
            <div>
              <h3>Advanced</h3>
              {/* <EpsilonSlider /> */}
            </div>
            <GreedySimulationComponent
              greedySimURL={greedySimURL}
              greedyChartDataValues={greedyChartDataValues}
              isLoading={isLoading}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
            textAlign: "center",
            p: 1,
          }}
        >
          <h2 style={{ color: "white", fontSize: 30, padding: 10 }}>
            Training Metrics
          </h2>
          <TrainingMetrics chartData={chartDataValues} />
        </Box>
      </Box>
    </Container>
  );
};

// function EpsilonSlider() {
//   return (
//     <Box sx={{ width: 50, display: "flex", flexDirection: "row" }}>
//       <h4>Epsilon: </h4>
//       <Slider
//         aria-label="Small steps"
//         defaultValue={0}
//         step={0.00000001}
//         marks
//         min={0}
//         max={1}
//         valueLabelDisplay="auto"
//       />
//     </Box>
//   );
// }
