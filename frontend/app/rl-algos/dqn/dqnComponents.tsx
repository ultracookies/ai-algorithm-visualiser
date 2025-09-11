import { LineGraph } from "../../utils/training-metric-components";
import hi from "../../utils/photos/hi.jpeg";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import { useEffect, useRef, useState, memo } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const NeuralNetworkTrainingMetricsDisplay = ({
  network,
  selectedNeurons,
  chartData,
}: {
  network: WeightTableContainerProps[];
  selectedNeurons: Set<number>[];
  chartData: TrainingMetricsChartData;
}) => {
  return (
    <div className="flex flex-col" style={{ width: "auto" }}>
      <WeightTablesContainer
        network={network}
        selectedNeurons={selectedNeurons}
      />
    </div>
  );
};

export const GreedySimulationComponent = ({
  greedySimURL,
  greedyChartDataValues,
  isLoading,
}: {
  greedySimURL: string;
  greedyChartDataValues: number[];
  isLoading: boolean;
}) => {
  return (
    <>
      <SimulationStream greedySimURL={greedySimURL} isLoading={isLoading} />
      <GreedyCumulativeRewardsGraph chartDataValues={greedyChartDataValues} />
    </>
  );
};

export const TrainingMetrics = ({
  chartData,
}: {
  chartData: TrainingMetricsChartData;
}) => {
  return (
    <div>
      <LineGraph
        chartData={chartData.epsilonDecay}
        chartTitle="Epsilon Decay"
        xlabel="Episode"
        ylabel="Epsilon"
      />
      <LineGraph
        chartData={chartData.lossFn}
        chartTitle="Loss Curve"
        xlabel="Episode"
        ylabel="Loss"
      />
      <LineGraph
        chartData={chartData.cumulativeRewards}
        chartTitle="Cumulative Rewards Per Episode"
        xlabel="Episode"
        ylabel="Cumulative Reward"
      />
    </div>
  );
};

export const GreedySimulationContainer = ({
  isPaused,
  greedyChartDataValues,
  playGreedySimulationHandler,
  greedySimURL,
}: {
  isPaused: boolean;
  greedyChartDataValues: number[];
  playGreedySimulationHandler: () => void;
  greedySimURL: string;
}) => {
  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 rounded-md w-50 m-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!isPaused}
        onClick={playGreedySimulationHandler}
      >
        Play Greedy Simulation
      </button>
      {/* <SimulationStream greedySimURL={greedySimURL} /> */}
      <GreedyCumulativeRewardsGraph chartDataValues={greedyChartDataValues} />
    </>
  );
};

// i want this to re-render only when needed
export const GreedyCumulativeRewardsGraph = memo(
  ({ chartDataValues }: { chartDataValues: number[] }) => {
    const chartDataRef = useRef<number[]>([]);
    const indexRef = useRef(0);
    const [, forceRender] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        if (indexRef.current === chartDataValues.length) return;
        chartDataRef.current.push(chartDataValues[indexRef.current++]);
        forceRender((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
        indexRef.current = 0;
        chartDataRef.current = [];
      };
    }, [chartDataValues]);

    return (
      <LineGraph
        chartData={chartDataRef.current}
        chartTitle="Greedy Rewards Per Episode"
        xlabel="Episode"
        ylabel="Greedy Reward"
      />
    );
  }
);

export const SimulationStream = ({
  greedySimURL,
  isLoading,
}: {
  greedySimURL: string;
  isLoading: boolean;
}) => {
  return (
    <div
      className="flex h-96 p-4 border-2 border-gray-300 rounded-md mb-4 bg-white"
      style={{
        width: "auto",
        position: "relative",
        display: "flex",
      }}
    >
      {isLoading && (
        <div
          style={{
            zIndex: 1,
            display: "flex",
            position: "absolute",
            top: 170,
            left: 295,
          }}
        >
          <CircularProgress />
        </div>
      )}
      <video
        src={greedySimURL}
        className="w-full h-full object-cover rounded-md"
        controls
      />
    </div>
  );
};

// maybe incorporate this into the layout.tsx?
export const DeepQNetworkDescription = () => {
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
