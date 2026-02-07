import exerciseData from "@/data/exercise.json";

export function getExercises() {
  // Simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(exerciseData), 500);
  });
}
