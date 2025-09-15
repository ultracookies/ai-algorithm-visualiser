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
import { idk } from "./client";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";

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
                href="#description"
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        scrollBehavior: "smooth",
      }}
    >
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
      <h1 id="description" className="text-center text-4xl p-8">
        Description
      </h1>
      <div className="flex items-center justify-center">
        <div className=" xs:w-1 md:w-2/3">
          <p>
            Imagine that you're playing a game where you control a cart with a
            remote on a track with a pole balanced on it, moving left or right
            to keep the pole upright as long as possible.
          </p>
          <br></br>
          <p> Here are the rules:</p>
          <ol type="1">
            <li>
              For every move you make that keeps the pole upright, you score 1
              point
            </li>
            <li> If the pole falls, the game ends.</li>
          </ol>
          <br />
          <div className="flex items-center justify-center p-4">
            <img
              src="https://gymnasium.farama.org/_images/cart_pole.gif"
              alt="Gymnasium CartPole gif"
            />
          </div>

          <p>
            Obviously, the idea is to maximize your score, therefore doing what
            you can to keep the pole upright for as long as possible. This
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
            For instance, you would learn that if the pole tilts too far to the
            left too fast, you would want to move the cart to the left. You
            would also know how much to the left you'd move it by. In pursuit of
            maximizing your score, and after all of that <b>trial and error</b>,
            you will eventually learn to achieve good performance in whatever
            task is presented to you, the cart-pole game in this case. Besides
            just achieving a high score and good performance, you would end up
            with a really good understanding and intuition as to what the game
            is and how to play optimally.
          </p>
          <br></br>
          <p>
            You may be wondering by now "this is basically what <b>learning</b>{" "}
            is" and you're absolutely correct for thinking so! What is so
            profound here about it is that this is what a{" "}
            <b>Deep Q Network (DQN)</b> is doing. What is a DQN? A DQN is
            basically a giant mathematical model and a special type of neural
            network that can learn to output some desired result given some
            input through trial and error. As was mentioned in the rules of the
            game, you would get 1 point for every move made that keeps the pole
            upright. This point is referred to as a <b>reward</b> value.
          </p>
          <br></br>
          <p>
            In the case of the cart-pole example, the inputs would take the form
            of 4 continuous numerical values:
          </p>
          <ol type="1">
            <li>Position of the cart.</li>
            <li>Velocity of the cart.</li>
            <li>Angle of the pole.</li>
            <li>Angular velocity of the pole.</li>
          </ol>
          <br></br>
          <p>
            Each of these values in conjunction represent the current{" "}
            <b>state</b> of the cart in some given moment. Based upon some given
            state, the DQN will choose an <b>action</b> (in this case, left or
            right) that the cart will take. Once the action is taken, the cart
            will <b>step</b> into a new state ready to take another action. This
            logic is exactly what takes place in the <a href="">simulator</a>{" "}
            above.
          </p>
          <br />
          <p>
            Now how does the DQN just <i>learn</i> like that? It learns through
            trial and error so there must be some way to for it to learn from
            its <b>experience</b>. For every step taken, it records the state it
            was originally at, the action it had taken, the reward it got for
            taking that action and the new state it is now in.
          </p>
          <br />
          <p>
            Once a threshold of these steps have been taken, there will be a
            series of mathematical calculations involving the recorded
            transitions performed on the DQN to help it learn from the bad or
            not-so-good decisions it made. It will learn little by little so it
            does take a bit of time and quite a number of trials. Eventually
            (assuming that the calculations were configured to run optimally),
            you have yourself a trained DQN.
          </p>
          <br />
          <p>
            A common misconception is that these DQNs "store" the data of all of
            these transitions and recalls it when thrown out into the wild. This
            is simply not true as its "understanding" is actually embedded in
            its <b>weights</b> (or parameters). The idea is that all that is
            needed is the model itself (which includes the weights) which itself
            carries understanding that it has developed throughout its training.
          </p>
          <br />
          <p>
            The weights are where the magic is really happening. You can think
            of them as numbers that describe a compressed representation of what
            it has learned from its trial and error experience(s). This
            compressed representation has the patterns that it has found in
            experience data during its training and ultimately some form of{" "}
            <b>understanding</b> that is used to make the decision for the cart
            to go either right or left!
          </p>
          <br />
          <p>
            The tooling above allows you to see how the DQN performs (and
            ultimately the cartpole) at different points of its training. Each
            of these points is referred to as <b>episodes</b>. In each of these
            episodes, the cart is allowed to take a maximum of 500 steps. If the
            pole were to tilt past a certain threshold angle, the episode will
            terminate and the cart will be brought back to the center, and so a
            new epsisode will begin.
          </p>
          <br />
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
