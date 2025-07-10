"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { emitter } from "./utils/eventBus";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineGraph({ numEpisodes }: { numEpisodes: number }) {
  const chartRef = useRef(null);

  const values = Array.from(
    { length: numEpisodes },
    (_) => Math.random() * 100
  );

  const initialData = {
    labels: [],
    datasets: [
      {
        label: "Epsilon",
        data: [],
        borderColor: "blue",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        title: { display: true, text: "Episode" },
      },
      y: {
        ticks: { color: "white" },
        title: { display: true, text: "Epsilon" },
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const chartData = chart.data;
    const x: number[] = chartData.labels;
    const y: number[] = chartData.datasets[0].data;
    emitter.on("indexUpdate", (i) => {
      if (i < x.length) {
        for (let j = 0; j < i; ++j) {
          x.pop();
          y.pop();
        }
      } else {
        for (let j = x.length; j < i; ++j) {
          y.push(values[j]);
          x.push(j + 1);
        }
      }

      chart.update();
    });

    // const interval = setInterval(() => {
    //   chartData.datasets[0].data.push(Math.random() * 100);
    //   chartData.labels.push(count++);
    //   chart.update();
    //   if (count == numEpisodes) {
    //     clearInterval(interval);
    //   }
    // }, 1000);

    // return () => clearInterval(interval);
  });

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Line
        ref={chartRef}
        data={initialData}
        options={options}
        className="mt-5"
      />
    </div>
  );
}
