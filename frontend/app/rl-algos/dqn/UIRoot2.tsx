"use client";

import { memo, useCallback, useState } from "react";

import Slider from "@mui/material/Slider";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import { getDims } from "./mockNetworkUtils";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const UIRoot2 = ({
  trainingNetworkInstances,
  trainingMetricsData,
}: {
  trainingNetworkInstances: WeightTableContainerProps[][];
  trainingMetricsData: TrainingMetricsChartData;
}) => {
  const numEpisodes = trainingNetworkInstances.length;
  const networkDims = getDims(trainingNetworkInstances[0]);

  return (
    <Container maxWidth={false}>
      <h1>Deep Q Network</h1>
      <TrainingMetricsInteractivity
        numEpisodes={numEpisodes}
        trainingNetworkInstances={trainingNetworkInstances}
        trainingMetricsData={trainingMetricsData}
        networkDims={networkDims}
      />
    </Container>
  );
};

export default UIRoot2;

const TrainingMetricsInteractivity = ({
  numEpisodes,
  trainingNetworkInstances,
  trainingMetricsData,
  networkDims,
}: {
  numEpisodes: number;
  trainingNetworkInstances: WeightTableContainerProps[][];
  trainingMetricsData: TrainingMetricsChartData;
  networkDims: number[];
}) => {
  const [currentEpisodeValue, setCurrentEpisodeValue] = useState(0);
  const [currentNetworkInstance, setCurrentNetworkInstance] = useState<
    WeightTableContainerProps[]
  >(trainingNetworkInstances[0]);
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

  const handleCurrentNetworkInstanceUpdate = useCallback(
    (event, value) => {
      setCurrentNetworkInstance(trainingNetworkInstances[value]);
    },
    [trainingNetworkInstances]
  );

  const handleCurrentEpisodeValueChange = useCallback(
    (event, value, activeThumb) => {
      setCurrentEpisodeValue(value);
    },
    []
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
        p: 3,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "40%" },
          backgroundColor: "oklch(27.9% 0.041 260.031)",
          borderRadius: "25px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div style={{ padding: 20 }}>
          <NeuralNetworkDiagram
            networkDims={networkDims}
            selectedNeurons={selectedNeurons}
            handleNeuronClick={handleNeuronClick}
          />
        </div>
        <div>Current Episode: {currentEpisodeValue}</div>
        <div
          style={{
            padding: "30px",
            width: "95%",
          }}
        >
          <EpisodeSeekBar
            numEpisodes={numEpisodes}
            currentEpisodeValue={currentEpisodeValue}
            handleCurrentEpisodeValueChange={handleCurrentEpisodeValueChange}
            handleCurrentNetworkInstanceUpdate={
              handleCurrentNetworkInstanceUpdate
            }
          />
        </div>
      </Box>
      <Box sx={{ width: { xs: "100%", lg: "60%" }, m: 3 }}>
        <WeightTables
          network={currentNetworkInstance}
          selectedNeurons={selectedNeurons}
        />
      </Box>
    </Box>
  );
};

const NeuralNetworkDiagram = memo(
  ({
    networkDims,
    selectedNeurons,
    handleNeuronClick,
  }: {
    networkDims: number[];
    selectedNeurons: Set<number>[];
    handleNeuronClick: (i: number, j: number) => void;
  }) => {
    return (
      <div style={{ backgroundColor: "" }}>
        <NeuralNetworkSVG
          networkDims={networkDims}
          selectedNeurons={selectedNeurons}
          handleNeuronClick={handleNeuronClick}
        />
      </div>
    );
  }
);

const WeightTables = memo(
  ({
    network,
    selectedNeurons,
  }: {
    network: WeightTableContainerProps[];
    selectedNeurons: Set<number>[];
  }) => {
    return (
      <WeightTablesContainer
        network={network}
        selectedNeurons={selectedNeurons}
      />
    );
  }
);

const EpisodeSeekBar = ({
  numEpisodes,
  currentEpisodeValue,
  handleCurrentEpisodeValueChange,
  handleCurrentNetworkInstanceUpdate,
}: {
  numEpisodes: number;
  currentEpisodeValue: number;
  handleCurrentEpisodeValueChange: (
    event: Event,
    value: number,
    activeThumb: number
  ) => void;
  handleCurrentNetworkInstanceUpdate: (
    event: React.SyntheticEvent | Event,
    value: number
  ) => void;
}) => {
  return (
    <Slider
      defaultValue={0}
      aria-label="Default"
      min={0}
      max={numEpisodes}
      value={currentEpisodeValue}
      onChange={handleCurrentEpisodeValueChange}
      onChangeCommitted={handleCurrentNetworkInstanceUpdate}
    />
  );
};
