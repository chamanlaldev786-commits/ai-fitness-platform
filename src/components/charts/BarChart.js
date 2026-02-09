"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ labels = [], dataCalories = [], dataExercise = [] }) {
  const data = {
    labels,
    datasets: [
      {
        label: "Calories",
        data: dataCalories,
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo
      },
      {
        label: "Exercise",
        data: dataExercise,
        backgroundColor: "rgba(16, 185, 129, 0.7)", // Green
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
      x: { ticks: { maxRotation: 0, autoSkip: true } },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <div className="h-48 md:h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
