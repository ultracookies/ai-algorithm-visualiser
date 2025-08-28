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
import {
  GreedyCumulativeRewardsGraph,
  SimulationStream,
  TrainingMetrics,
} from "./dqnComponents";
import { LineGraph } from "../../utils/training-metric-components";
import { getGreedySimulation } from "./client";

const FEATURE_BOX_COLOR = "oklch(27.9% 0.041 260.031)";

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
    <Container maxWidth={false}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "80%", md: "50%", lg: "40%" },
              backgroundColor: FEATURE_BOX_COLOR,
              borderRadius: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              mb: 3,
              p: 2,
            }}
          >
            <h2 style={{ color: "white", fontSize: 30, paddingBottom: 10 }}>
              Deep Q Network Diagram
            </h2>
            <NeuralNetworkDiagram
              networkDims={networkDims}
              selectedNeurons={selectedNeurons}
              handleNeuronClick={handleNeuronClick}
            />
            <div
              style={{
                width: "90%",
                textAlign: "center",
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
          <Box
            sx={{
              width: { xs: "80vw", lg: "60%" },
              m: { xs: 2, lg: 3 },
              backgroundColor: FEATURE_BOX_COLOR,
              borderRadius: "25px",
              p: 3,
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "white", fontSize: 30, paddingBottom: 20 }}>
              Weight Tables
            </h2>
            <WeightTables
              network={currentNetworkInstance}
              selectedNeurons={selectedNeurons}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", lg: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              backgroundColor: FEATURE_BOX_COLOR,
              borderRadius: "25px",
              textAlign: "center",
              p: 2,
              m: 2,
            }}
          >
            <h2 style={{ color: "white", fontSize: 30, paddingBottom: 10 }}>
              Greedy Simulation
            </h2>
            <GreedySimulator ref={currentEpisodeRef} />
          </Box>

          <Box
            sx={{
              width: { xs: "100%", lg: "50%" },
              backgroundColor: FEATURE_BOX_COLOR,
              borderRadius: "25px",
              textAlign: "center",
              p: 2,
              m: 2,
            }}
          >
            <h2 style={{ color: "white", paddingBottom: 10, fontSize: 30 }}>
              Training Metrics
            </h2>
            <TrainingMetrics chartData={trainingMetricsChartValues} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

function Diagram({
  networkDims,
  selectedNeurons,
  handleNeuronClick,
  numEpisodes,
  handleCurrentNetworkInstanceUpdate,
}: {
  networkDims: number[];
  selectedNeurons: Set<number>[];
  handleNeuronClick: (i: number, j: number) => void;
  numEpisodes: number;
  handleCurrentNetworkInstanceUpdate: (
    event: React.SyntheticEvent | Event,
    value: number
  ) => void;
}) {
  return (
    <>
      <h2 style={{ color: "white", paddingBottom: 20, fontSize: 30 }}>
        Deep Q Network Diagram
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NeuralNetworkDiagram
          networkDims={networkDims}
          selectedNeurons={selectedNeurons}
          handleNeuronClick={handleNeuronClick}
        />
      </div>
      <div
        style={{
          width: "100%",
          padding: "30px",
          textAlign: "center",
          color: "white",
        }}
      >
        <EpisodeSeekBar
          numEpisodes={numEpisodes}
          handleCurrentNetworkInstanceUpdate={
            handleCurrentNetworkInstanceUpdate
          }
        />
      </div>
    </>
  );
}

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
  const [greedySimulationURL, setGreedySimulationURL] = useState<string | null>(
    null
  );
  const [simulatedEpisodeValue, setSimulatedEpisodeValue] = useState(0);
  const reqIdRef = useRef(0);

  const onClick = async () => {
    const id = ++reqIdRef.current;
    const currentSimulatedEpisodeValue = ref.current;
    const greedySimData = await fetchGreedySimulation(
      currentSimulatedEpisodeValue
    );

    if (id === reqIdRef.current) {
      setGreedySimulationRewardsValues(greedySimData.greedyRewardsValues);

      const blob = base64ToBlob(
        greedySimData.greedySimulationVideoBytes,
        "video/mp4"
      );

      setGreedySimulationURL(URL.createObjectURL(blob));
      setSimulatedEpisodeValue(currentSimulatedEpisodeValue);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div
            style={{
              color: "white",
              fontSize: 20,
              padding: 10,
              paddingBottom: 20,
            }}
          >
            Simulated Episode: {simulatedEpisodeValue}
          </div>
          <Button variant="contained" onClick={onClick} sx={{ mb: 3 }}>
            Play Greedy Simulation
          </Button>
        </div>
        <SimulationStream
          greedySimURL={greedySimulationURL}
          isLoading={false}
        />
      </div>
      <GreedyRewardsGraph
        greedySimRewardsValues={greedySimulationRewardsValues}
      />
    </div>
  );
});

function base64ToBlob(base64: string, mime = "video/mp4"): Blob {
  const buf = Buffer.from(base64, "base64");
  return new Blob([buf], { type: mime });
}

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
      <NeuralNetworkSVG
        networkDims={networkDims}
        selectedNeurons={selectedNeurons}
        handleNeuronClick={handleNeuronClick}
      />
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
      <div style={{ padding: 20, fontSize: 20 }}>
        Current Episode: {displayedEpisodeValue}
      </div>
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
