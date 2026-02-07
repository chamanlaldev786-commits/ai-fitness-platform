"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * PieChart Component
 * @param {Array} labels - Array of labels
 * @param {Array} values - Array of numbers for each slice
 * @param {Array} colors - Optional array of colors for slices
 */
export default function PieChart({ labels = [], values = [], colors = [] }) {
  const defaultColors = [
    "rgba(99, 102, 241, 0.7)", // Indigo
    "rgba(16, 185, 129, 0.7)", // Green
    "rgba(239, 68, 68, 0.7)",  // Red
    "rgba(250, 204, 21, 0.7)", // Yellow
    "rgba(14, 165, 233, 0.7)"  // Blue
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors.length ? colors : defaultColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <Pie data={chartData} options={options} />
    </div>
  );
}
