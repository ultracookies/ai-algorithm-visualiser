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
import { title } from "process";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

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
    let count = 0;
    const chart = chartRef.current;
    if (!chart) return;
    const chartData = chart.data;

    const interval = setInterval(() => {
      chartData.datasets[0].data.push(Math.random() * 100);
      chartData.labels.push(count++);
      chart.update();
      if (count == numEpisodes) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
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
