// services/dashboardService.js

import foodData from "@/data/food.json";
import exerciseData from "@/data/exercise.json";
import aiData from "@/data/aiPredictions.json";

/* ---------------- UTILITY ---------------- */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ---------------- FOOD ---------------- */
export async function fetchFoodData() {
  await delay(400);
  return Array.isArray(foodData) ? foodData : [];
}

/* ---------------- EXERCISE ---------------- */
export async function fetchExerciseData() {
  await delay(400);
  return Array.isArray(exerciseData) ? exerciseData : [];
}

/* ---------------- AI PREDICTIONS ---------------- */
export async function fetchAIPredictions() {
  await delay(600);
  return Array.isArray(aiData) ? aiData : [];
}

/* ---------------- ANALYTICS / CHARTS ---------------- */
export async function fetchChartsData() {
  await delay(500);

  /* BAR CHART (Calories per day) */
  const bar = foodData.map((item, index) => ({
    label: item.name || `Day ${index + 1}`,
    value: Number(item.calories || 0),
  }));

  /* LINE CHART (Workout duration trend) */
  const line = exerciseData.map((item, index) => ({
    label: item.date || `Session ${index + 1}`,
    value: Number(item.duration || 0),
  }));

  /* PIE CHART (Macros) */
  let protein = 0;
  let carbs = 0;
  let fats = 0;

  foodData.forEach((f) => {
    protein += Number(f.protein || 0);
    carbs += Number(f.carbs || 0);
    fats += Number(f.fats || 0);
  });

  const pie = [
    { label: "Protein", value: protein },
    { label: "Carbs", value: carbs },
    { label: "Fats", value: fats },
  ];

  return {
    bar,
    line,
    pie,
  };
}
