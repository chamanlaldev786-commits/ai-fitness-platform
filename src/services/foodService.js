// Correct exports
import foodData from "@/data/food.json";

export function getFoodLogs() {
  // Simulate async API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(foodData), 500);
  });
}
