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

export function LineGraph({ chartData }: { chartData: number[] }) {
  const data = {
    labels: Array.from(chartData, (_, i) => i),
    datasets: [
      {
        label: "Epsilon",
        data: chartData,
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

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Line data={data} options={options} className="mt-5" />
    </div>
  );
}
