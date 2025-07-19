import { LineGraph } from "../../utils/training-metric-components";
import hi from "../../utils/photos/hi.jpeg";
import { WeightTableContainerProps } from "../../utils/weight-table-types";
import WeightTablesContainer from "../../utils/weight-table-components/weight-tables-container";
import { useEffect, useRef, useState, memo } from "react";

export const NeuralNetworkTrainingMetricsDisplay = ({
  network,
  selectedNeurons,
  chartData,
}: {
  network: WeightTableContainerProps[];
  selectedNeurons: Set<number>[];
  chartData: number[];
}) => {
  return (
    <div className="flex flex-col" style={{ width: "auto" }}>
      <WeightTablesContainer
        network={network}
        selectedNeurons={selectedNeurons}
      />
      <LineGraph chartData={chartData} />
      <LineGraph chartData={chartData} />
      <LineGraph chartData={chartData} />
    </div>
  );
};

export const GreedySimulationContainer = ({
  isPaused,
  greedyChartDataValues,
  playGreedySimulationHandler,
}: {
  isPaused: boolean;
  greedyChartDataValues: number[];
  playGreedySimulationHandler: () => void;
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
      <SimulationStream />
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
    console.log("fuck");

    useEffect(() => {
      const interval = setInterval(() => {
        console.log("hhddhd");
        if (indexRef.current === chartDataValues.length) return;
        chartDataRef.current.push(chartDataValues[indexRef.current++]);
        forceRender((prev) => prev + 1);
      }, 1000);

      return () => {
        console.log("JHFDSH");
        clearInterval(interval);
        indexRef.current = 0;
        chartDataRef.current = [];
      };
    }, [chartDataValues]);

    return <LineGraph chartData={chartDataRef.current} />;
  }
);

const SimulationStream = () => {
  return (
    <div
      className="flex h-96 p-4 border-2 border-gray-300 rounded-md mb-4 bg-white"
      style={{ width: "auto" }}
    >
      <img
        src={hi.src}
        alt="Gym Environment Stream"
        className="w-full h-full object-cover rounded-md"
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
