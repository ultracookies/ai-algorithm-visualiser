import mitt, { Emitter } from "mitt";

interface DataPoint {
  epsilon: number;
  cum_reward: number;
  loss: number;
}

type NNChartUpdateEvent = {
  dataPoint: DataPoint;
  dataPoints: DataPoint[];
  indexUpdate: number;
};

export const emitter: Emitter<NNChartUpdateEvent> = mitt<NNChartUpdateEvent>();
