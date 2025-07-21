import DataReceiverEmulator from "./DataReceiverEmulator";

export default function Page() {
  const networkDims = [5, 20, 10, 5, 3];
  const numEpisodes = 20;
  const chartDataValues: TrainingMetricsChartData = {
    epsilonDecay: Array.from({ length: numEpisodes }, () => Math.random()),
    lossFn: Array.from({ length: numEpisodes }, () => Math.random() * 50),
    cumulativeRewards: Array.from(
      { length: numEpisodes },
      () => Math.random() * 500
    ),
  };
  return (
    <DataReceiverEmulator
      networkDims={networkDims}
      numEpisodes={numEpisodes}
      chartDataValues={chartDataValues}
    />
  );
}
