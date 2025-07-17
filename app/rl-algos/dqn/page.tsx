import DataReceiverEmulator from "./DataReceiverEmulator";

export default function Page() {
  const networkDims = [5, 20, 10, 5, 3];
  const numEpisodes = 200;
  const chartDataValues: number[] = Array.from(
    { length: numEpisodes },
    () => Math.random() * 100
  );
  return (
    <DataReceiverEmulator
      networkDims={networkDims}
      numEpisodes={numEpisodes}
      chartDataValues={chartDataValues}
    />
  );
}
