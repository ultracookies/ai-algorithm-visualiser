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
import Zoom from "@mui/material/Zoom";
import { SimulationStream, TrainingMetrics } from "./dqnComponents";
import { LineGraph } from "../../utils/training-metric-components";
import { getGreedySimulation, idk } from "./client";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Zoom in={true}>
          <div>
            <h1 style={{ fontSize: 40, color: "white", padding: 20 }}>
              Deep Q Network
            </h1>
            <div className="pb-4">
              <a
                href=""
                className="text-md underline text-white hover:text-xl transition-all duration-300 hover:no-underline"
              >
                Read More
              </a>
            </div>
          </div>
        </Zoom>
      </Box>
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

  const [isPaused, setIsPaused] = useState(false);

  const [displayedEpisodeValue, setDisplayedEpisodeValue] = useState(0);

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
    (value: number) => {
      currentEpisodeRef.current = value;
      setDisplayedEpisodeValue(value);
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

  const handleEpisodeSliderOnChangeCommit = useCallback(
    (event: React.SyntheticEvent | Event, value: number) => {
      setIsPaused(true);
      setDisplayedEpisodeValue(value);
      handleCurrentNetworkInstanceUpdate(value);
    },
    [trainingNetworkInstances, trainingMetricsData]
  );

  const handlePauseButtonOnClick = useCallback(
    () => setIsPaused((prev) => !prev),
    []
  );

  const handleEpisodeSliderOnMouseDown = () => setIsPaused(true);

  useEffect(() => {
    if (isPaused) return;
    if (currentEpisodeRef.current === numEpisodes - 1) {
      return;
    }
    let currentEpisode: number;
    const interval = setInterval(() => {
      currentEpisode = ++currentEpisodeRef.current;
      handleCurrentNetworkInstanceUpdate(currentEpisode);
      if (currentEpisode === numEpisodes - 1) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, trainingNetworkInstances, trainingMetricsData]);

  return (
    // <Container maxWidth={false}>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Zoom in={true}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <h2 style={{ color: "white", fontSize: 30 }}>
                Deep Q Network Diagram
              </h2>
              <InfoButtonWithToolTip message="It’s a Deep Q-Network (DQN) architecture with 4 input nodes, two hidden layers of 30 nodes each, and 2 output nodes, where the inputs represent the environment state, the hidden layers extract features, and the outputs correspond to the Q-values for each possible action." />
            </div>

            <NeuralNetworkDiagram
              networkDims={networkDims}
              selectedNeurons={selectedNeurons}
              handleNeuronClick={handleNeuronClick}
            />
            <PlaybackControls
              isPaused={isPaused}
              handlePauseButtonOnClick={handlePauseButtonOnClick}
            />
            <div
              style={{
                width: "90%",
                textAlign: "center",
              }}
            >
              <EpisodeSeekBar
                numEpisodes={numEpisodes}
                displayedEpisodeValue={displayedEpisodeValue}
                handleEpisodeSliderOnChangeCommit={
                  handleEpisodeSliderOnChangeCommit
                }
                handleEpisodeSliderOnMouseDown={handleEpisodeSliderOnMouseDown}
                isPaused={isPaused}
              />
            </div>
          </Box>
        </Zoom>
        <Zoom in={true}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <h2 style={{ color: "white", fontSize: 30 }}>Weight Tables</h2>
              <InfoButtonWithToolTip message="Neural network weights are the numerical parameters that determine how strongly one neuron’s output influences another neuron’s input. They’re adjusted during training so the network can learn patterns in the data." />
            </div>
            <WeightTables
              network={currentNetworkInstance}
              selectedNeurons={selectedNeurons}
            />
          </Box>
        </Zoom>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", lg: "row" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Zoom in={true}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white", fontSize: 30, paddingBottom: 10 }}>
                Play Greedy Simulation
              </h2>
              <InfoButtonWithToolTip
                message="It’s a simulation runner where the user clicks a button to watch the trained agent play in the Gymnasium environment, using the saved network weights from a chosen training episode.
"
              />
            </div>
            <GreedySimulator ref={currentEpisodeRef} isPaused={isPaused} />
          </Box>
        </Zoom>
        <Zoom in={true}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white", fontSize: 30, paddingBottom: 10 }}>
                Training Metrics
              </h2>
              <InfoButtonWithToolTip
                message="For a Deep Q-Network, the training metrics are:

Epsilon decay – tracks how exploration decreases over time.

Loss function – measures how well the Q-values are being approximated.

Total rewards per episode – shows the agent’s performance and learning progress."
              />
            </div>
            <TrainingMetrics chartData={trainingMetricsChartValues} />
          </Box>
        </Zoom>
      </Box>
      <AlgorithmDescription />
    </Box>
    // </Container>
  );
};

const AlgorithmDescription = () => {
  return (
    <div className="text-white h-screen">
      <h1 className="text-center text-4xl">Description</h1>
      <div className="flex items-center justify-center">
        <div className="w-1/2">
          <p>
            Imagine that you're playing a game where the goal is to balance a
            stick on your hand for as long as possible. For simplicity sake,
            let's say both your hand and the stick are restricted to moving left
            and right.
          </p>
          <br></br>
          <p> Here are the rules:</p>
          <ol type="1">
            <li>
              For every move you make that keeps the stick upright, you score 1
              point
            </li>
            <li> If the stick falls, the game ends.</li>
          </ol>
          <br></br>
          <p>
            Obviously, the idea is to maximize your score, therefore doing what
            you can to keep the stick upright for as long as possible. This
            painfully obvious detail is in fact{" "}
            <u>
              <b>very critical</b>
            </u>{" "}
            and foundational to understanding what's going on here.
          </p>
          <br></br>
          <p>
            Assuming this is your first time playing such a game, you will
            likely perform very poorly and wound up with a very bad score. If
            you were to practice (assuming you had nothing else better to do),
            over time, you would get better.
          </p>
          <br></br>
          <p>
            For instance, you would learn that if the stick tilts too far to the
            left too fast, you would want to move your hand to the left. You
            would also know how much to the left you'd move by. In pursuit of
            maximizing your score, and after all of that <b>trial and error</b>,
            you will eventually learn to achieve good performance in whatever
            task is presented to you, the stick and hand game in this case.
          </p>
          <br></br>
          <p>
            Besides just achieving a high score and good performance, you would
            end up with a really good understanding and intuition as to what the
            game is and how to play optimally.
          </p>
          <br></br>
          <p>
            You may be wondering by now "this is basically what <b>learning</b>{" "}
            is" and you're absolutely correct for thinking so! What is so
            profound here about it is that this is what a{" "}
            <b>Deep Q Network (DQN)</b> is doing. All of those complicated
            figures and tables above basically describe what the learning looks
            like for a DQN. It's okay if you don't understand all or any of it
            as the main takeaway here is that there exists a mathematical model
            that can learn; learn through trial and error just like us!
          </p>
          <br></br>
          {/* <p>If this mathematical model that I am speaking of were to be the "brain" of the cart, where its "eyes" are where</p> */}
        </div>
      </div>
    </div>
  );
};

const PlaybackControls = memo(
  ({
    isPaused,
    handlePauseButtonOnClick,
  }: {
    isPaused: boolean;
    handlePauseButtonOnClick: () => void;
  }) => {
    return (
      <IconButton aria-label="pause" size="large" sx={{ color: "white" }}>
        {!isPaused ? (
          <PauseIcon fontSize="large" onClick={handlePauseButtonOnClick} />
        ) : (
          <PlayArrow fontSize="large" onClick={handlePauseButtonOnClick} />
        )}
      </IconButton>
    );
  }
);

const GreedySimulator = memo(
  ({ ref, isPaused }: { ref: RefObject<number>; isPaused: boolean }) => {
    const [greedySimulationRewardsValues, setGreedySimulationRewardsValues] =
      useState<number[]>([]);
    const [greedySimulationURL, setGreedySimulationURL] = useState<
      string | null
    >(null);
    const [simulatedEpisodeValue, setSimulatedEpisodeValue] = useState(0);
    const reqIdRef = useRef(0);

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const onClick = () => {
      setIsLoading(true);
      const id = ++reqIdRef.current;
      const currentSimulatedEpisodeValue = ref.current;

      idk(currentSimulatedEpisodeValue)
        .then((value) => {
          setIsLoading(false);

          if (id === reqIdRef.current) {
            setIsError(false);
            const data = value.data;
            setGreedySimulationRewardsValues(data.total_rewards);
            const blob = base64ToBlob(data.simulation, "video/mp4");

            setGreedySimulationURL(URL.createObjectURL(blob));
            setSimulatedEpisodeValue(currentSimulatedEpisodeValue);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          if (error.response) {
            if (error.response.status === 429) {
              setErrorMsg(
                "You've sent too many requests, please wait a few seconds."
              );
            } else {
              setErrorMsg(
                "Could not fetch greedy simulation. Please try again."
              );
            }
          } else {
            setErrorMsg("Could not fetch greedy simulation. Please try again.");
          }
        });
    };

    return (
      <div>
        <div style={{ width: "100%", height: "100%" }}>
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
            <Button
              variant="contained"
              onClick={onClick}
              sx={{ mb: 3, borderColor: "1px solid red" }}
              disabled={!isPaused}
            >
              Play Greedy Simulation
            </Button>
            {isError && (
              <div style={{ marginBottom: 20 }}>
                <Zoom in={true}>
                  <Alert variant="filled" severity="error">
                    {errorMsg}
                  </Alert>
                </Zoom>
              </div>
            )}
          </div>

          <SimulationStream
            greedySimURL={greedySimulationURL}
            isLoading={isLoading}
          />
        </div>
        <GreedyRewardsGraph
          greedySimRewardsValues={greedySimulationRewardsValues}
        />
      </div>
    );
  }
);

function base64ToBlob(base64: string, mime = "video/mp4"): Blob {
  const buf = Buffer.from(base64, "base64");
  return new Blob([buf], { type: mime });
}

const InfoButtonWithToolTip = memo(({ message }: { message: string }) => {
  return (
    <Tooltip
      title={message}
      slotProps={{
        tooltip: {
          sx: {
            fontSize: "large",
          },
        },
      }}
    >
      <Button>
        <InfoIcon
          sx={{ color: "cyan", filter: `drop-shadow(0 0 15px cyan)` }}
        />
      </Button>
    </Tooltip>
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
        greedySimRewardsValues.slice(0, ++indexRef.current)
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
  displayedEpisodeValue,
  handleEpisodeSliderOnChangeCommit,
  handleEpisodeSliderOnMouseDown,
  isPaused,
}: {
  numEpisodes: number;
  displayedEpisodeValue: number;
  handleEpisodeSliderOnChangeCommit: (
    event: React.SyntheticEvent | Event,
    value: number
  ) => void;
  handleEpisodeSliderOnMouseDown: () => void;
  isPaused: boolean;
}) => {
  const [sliderEpisodeValue, setSliderEpisodeValue] = useState(0);

  useEffect(() => {
    if (isPaused) {
      setSliderEpisodeValue(displayedEpisodeValue);
    }
  }, [isPaused]);
  return (
    <>
      <div style={{ padding: 20, fontSize: 20 }}>
        Current Episode: {displayedEpisodeValue}
      </div>
      <Slider
        defaultValue={0}
        aria-label="Default"
        min={0}
        max={numEpisodes - 1}
        value={isPaused ? sliderEpisodeValue : displayedEpisodeValue}
        onChange={(event, value, activeThumb) => setSliderEpisodeValue(value)}
        valueLabelDisplay="auto"
        onChangeCommitted={handleEpisodeSliderOnChangeCommit}
        onMouseDown={handleEpisodeSliderOnMouseDown}
      />
    </>
  );
};
