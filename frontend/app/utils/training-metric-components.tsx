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

export function LineGraph({
  chartData,
  chartTitle,
  xlabel,
  ylabel,
}: {
  chartData: number[];
  chartTitle: string;
  xlabel: string;
  ylabel: string;
}) {
  const data = {
    labels: Array.from(chartData, (_, i) => i + 1),
    datasets: [
      {
        label: chartTitle,
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
        title: { display: true, text: xlabel },
      },
      y: {
        ticks: { color: "white" },
        title: { display: true, text: ylabel },
      },
    },
  };

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Line data={data} options={options} className="mt-5" />
    </div>
  );
}
