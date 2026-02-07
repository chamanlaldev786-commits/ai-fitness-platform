"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TypewriterText from "@/components/animations/TypewriterText";
import { fetchFoodData } from "@/services/dashboardService";

export default function FoodLogPage() {
  const [foodData, setFoodData] = useState([]);
  const [meal, setMeal] = useState({ name: "", calories: "" });
  const [query, setQuery] = useState("");
  const [minCal, setMinCal] = useState(0);
  const [maxCal, setMaxCal] = useState(5000);
  const [pendingQuery, setPendingQuery] = useState("");
  const [pendingMinCal, setPendingMinCal] = useState(0);
  const [pendingMaxCal, setPendingMaxCal] = useState(5000);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    async function loadFood() {
      const data = await fetchFoodData();
      setFoodData(data);
    }
    loadFood();
  }, []);

  /* ---------------- ADD MEAL ---------------- */
  const addMeal = () => {
    if (!meal.name || !meal.calories) return;
    if (Number(meal.calories) <= 0) return;

    setFoodData((prev) => [
      {
        id: Date.now(),
        name: meal.name,
        calories: Number(meal.calories),
      },
      ...prev,
    ]);

    setMeal({ name: "", calories: "" });
  };

  /* ---------------- DELETE MEAL ---------------- */
  const deleteMeal = (id) => {
    setFoodData((prev) => prev.filter((m) => m.id !== id));
  };

  /* ---------------- SMART LOGIC ---------------- */
  const totalCalories = useMemo(
    () => foodData.reduce((sum, m) => sum + m.calories, 0),
    [foodData]
  );

  const avgCalories = useMemo(
    () => (foodData.length ? Math.round(totalCalories / foodData.length) : 0),
    [totalCalories, foodData]
  );

  const healthStatus = useMemo(() => {
    if (avgCalories === 0) return "No data";
    if (avgCalories < 1800) return "Light Intake 🟢";
    if (avgCalories <= 2200) return "Balanced 🟡";
    return "High Intake 🔴";
  }, [avgCalories]);

  const filteredFood = useMemo(() => {
    const q = query.trim().toLowerCase();
    return foodData.filter((item) => {
      const nameMatch = !q || (item.name || "").toLowerCase().includes(q);
      const cal = Number(item.calories || 0);
      const rangeMatch = cal >= Number(minCal || 0) && cal <= Number(maxCal || Infinity);
      return nameMatch && rangeMatch;
    });
  }, [foodData, query, minCal, maxCal]);

  const applyFilters = () => {
    const min = Number(pendingMinCal || 0);
    const max = Number(pendingMaxCal || 5000);
    setQuery(pendingQuery);
    setMinCal(min);
    setMaxCal(max < min ? min : max);
  };

  const clearFilters = () => {
    setPendingQuery("");
    setPendingMinCal(0);
    setPendingMaxCal(5000);
    setQuery("");
    setMinCal(0);
    setMaxCal(5000);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">

      {/* ---------- HEADER ---------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          <TypewriterText text="Daily Food Log" speed={80} />
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Track meals, calories & eating patterns
        </p>
      </div>

      {/* ---------- SUMMARY ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Card title="Total Calories" value={totalCalories} />
        <Card title="Avg / Meal" value={avgCalories} />
        <Card title="Health Status" value={healthStatus} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <Input
          value={meal.name}
          onChange={(e) => setMeal({ ...meal, name: e.target.value })}
          placeholder="Meal name"
          aria-label="Meal name"
          className="w-full sm:w-60 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <Input
          type="number"
          value={meal.calories}
          onChange={(e) => setMeal({ ...meal, calories: e.target.value })}
          placeholder="Calories"
          aria-label="Calories"
          inputMode="numeric"
          min={0}
          className="w-full sm:w-40 p-3 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={addMeal}
          className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-xl hover:scale-105 transition"
        >
          Add Meal
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <Input
          value={pendingQuery}
          onChange={(e) => setPendingQuery(e.target.value)}
          placeholder="Search meals"
          aria-label="Search meals"
          className="w-full sm:w-72 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <Input
          type="number"
          min={0}
          value={pendingMinCal}
          onChange={(e) => setPendingMinCal(e.target.value)}
          placeholder="Min kcal"
          aria-label="Minimum calories"
          className="w-full sm:w-40 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400"
          inputMode="numeric"
        />
        <Input
          type="number"
          min={0}
          value={pendingMaxCal}
          onChange={(e) => setPendingMaxCal(e.target.value)}
          placeholder="Max kcal"
          aria-label="Maximum calories"
          className="w-full sm:w-40 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400"
          inputMode="numeric"
        />
        <button
          onClick={applyFilters}
          className="px-5 py-3 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-md"
        >
          Search
        </button>
        <button
          onClick={clearFilters}
          className="px-5 py-3 rounded-xl text-white font-semibold bg-gray-500 hover:bg-gray-600 shadow-md"
        >
          Clear
        </button>
      </div>

      {/* ---------- FOOD LIST ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFood.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition animate-fadeIn"
          >
            <Card title={item.name} value={`${item.calories} kcal`} />

            <button
              onClick={() => deleteMeal(item.id)}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-sm text-red-500 hover:text-red-700 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
