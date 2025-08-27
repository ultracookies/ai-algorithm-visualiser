"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  RefObject,
} from "react";

import Slider from "@mui/material/Slider";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import NeuralNetworkSVG from "../../utils/neural-network-components/neural-network-visual";
import { getDims } from "./mockNetworkUtils";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { GreedyCumulativeRewardsGraph, TrainingMetrics } from "./dqnComponents";
import { LineGraph } from "../../utils/training-metric-components";
import { getGreedySimulation } from "./client";

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
  const [currentNetworkInstance, setCurrentNetworkInstance] = useState<
    WeightTableContainerProps[]
  >(trainingNetworkInstances[0]);
  const [trainingMetricsChartValues, setTrainingMetricsChartValues] =
    useState<TrainingMetricsChartData>({
      epsilonDecay: [],
      lossFn: [],
      cumulativeRewards: [],
    });
  const [selectedNeurons, setSelectedNeurons] = useState(() => {
    const networkNodeLayers: Set<number>[] = [];
    for (let i = 0; i < networkDims.length; ++i) {
      networkNodeLayers.push(new Set<number>());
    }
    return networkNodeLayers;
  });

  const currentEpisodeRef = useRef(0);

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
      currentEpisodeRef.current = value;
      setCurrentNetworkInstance(trainingNetworkInstances[value]);
      setTrainingMetricsChartValues(() => {
        const newState: TrainingMetricsChartData = {
          epsilonDecay: trainingMetricsData.epsilonDecay.slice(0, value + 1),
          lossFn: trainingMetricsData.lossFn.slice(0, value + 1),
          cumulativeRewards: trainingMetricsData.cumulativeRewards.slice(
            0,
            value + 1
          ),
        };
        return newState;
      });
    },
    [trainingNetworkInstances, trainingMetricsData]
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
        <h2 style={{ padding: 10, fontSize: 30 }}>Deep Q Network Diagram</h2>
        <div style={{ padding: 20 }}>
          <NeuralNetworkDiagram
            networkDims={networkDims}
            selectedNeurons={selectedNeurons}
            handleNeuronClick={handleNeuronClick}
          />
        </div>

        <div
          style={{
            padding: "30px",
            width: "95%",
          }}
        >
          <EpisodeSeekBar
            numEpisodes={numEpisodes}
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
        <TrainingMetrics chartData={trainingMetricsChartValues} />
        <GreedySimulator ref={currentEpisodeRef} />
      </Box>
    </Box>
  );
};

async function fetchGreedySimulation(episodeIndex: number): Promise<{
  greedyRewardsValues: number[];
  greedySimulationVideoBytes: string;
}> {
  const greedySimulationData = await getGreedySimulation(episodeIndex);
  const greedyRewardsValues: number[] = greedySimulationData.total_rewards;
  const greedySimulationVideoBytes: string = greedySimulationData.simulation;
  return { greedyRewardsValues, greedySimulationVideoBytes };
}

const GreedySimulator = memo(({ ref }: { ref: RefObject<number> }) => {
  const [greedySimulationRewardsValues, setGreedySimulationRewardsValues] =
    useState<number[]>([]);
  const [greedySimulationBytes, setGreedySimulationBytes] = useState<
    string | null
  >(null);

  console.log("GreedySimulator re-rendered");
  console.log("fetched values for episode " + ref.current);
  console.log("rewards values: " + greedySimulationRewardsValues);

  const onClick = async () => {
    const greedySimData = await fetchGreedySimulation(ref.current);
    setGreedySimulationRewardsValues(greedySimData.greedyRewardsValues);
    setGreedySimulationBytes(greedySimData.greedySimulationVideoBytes);
  };

  return (
    <>
      <Button variant="contained" onClick={onClick}>
        Play Greedy Simulation
      </Button>
      <GreedyRewardsGraph
        greedySimRewardsValues={greedySimulationRewardsValues}
      />
    </>
  );
});

const GreedyRewardsGraph = ({
  greedySimRewardsValues,
}: {
  greedySimRewardsValues: number[];
}) => {
  const [displayedRewardsValues, setDisplayedRewardsValues] = useState<
    number[]
  >([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current == greedySimRewardsValues.length) return;
      setDisplayedRewardsValues(
        greedySimRewardsValues.slice(0, indexRef.current++)
      );
    }, 1000);

    return () => {
      clearInterval(interval);
      indexRef.current = 0;
    };
  }, [greedySimRewardsValues]);

  return (
    <LineGraph
      chartData={displayedRewardsValues}
      chartTitle="Greedy Rewards Per Episode"
      xlabel="Episode"
      ylabel="Greedy Reward"
    />
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

const WeightTables = ({
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
};

const EpisodeSeekBar = ({
  numEpisodes,
  handleCurrentNetworkInstanceUpdate,
}: {
  numEpisodes: number;
  handleCurrentNetworkInstanceUpdate: (
    event: React.SyntheticEvent | Event,
    value: number
  ) => void;
}) => {
  const [displayedEpisodeValue, setDisplayedEpisodeValue] = useState(0);

  return (
    <>
      <div>Current Episode: {displayedEpisodeValue}</div>
      <Slider
        defaultValue={0}
        aria-label="Default"
        min={0}
        max={numEpisodes}
        value={displayedEpisodeValue}
        onChange={(event: Event, value: number, activeThumb: number) =>
          setDisplayedEpisodeValue(value)
        }
        onChangeCommitted={handleCurrentNetworkInstanceUpdate}
      />
    </>
  );
};
