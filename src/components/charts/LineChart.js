"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function LineChart({ labels = [], data = [] }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Progress Trend",
        data,
        fill: false,
        borderColor: "rgba(239, 68, 68, 0.8)", // Red-500
        backgroundColor: "rgba(239, 68, 68, 0.4)",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, tooltip: { mode: "index", intersect: false } },
    scales: { y: { beginAtZero: true }, x: { ticks: { maxRotation: 0, autoSkip: true } } },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <div className="h-48 md:h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
