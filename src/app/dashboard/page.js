"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import TypewriterText from "@/components/animations/TypewriterText";

/* ---------------- MOCK DATA LOGIC ---------------- */

const mockFoodLogs = [
  { day: "Mon", calories: 2200 },
  { day: "Tue", calories: 2000 },
  { day: "Wed", calories: 1800 },
  { day: "Thu", calories: 2100 },
  { day: "Fri", calories: 2300 },
];

const mockWorkoutLogs = [
  { type: "Cardio", duration: 30 },
  { type: "Strength", duration: 45 },
  { type: "Yoga", duration: 25 },
];

/* ---------------- PAGE ---------------- */

export default function DashboardPage() {
  const [foodData] = useState(mockFoodLogs);
  const [workoutData] = useState(mockWorkoutLogs);

  const totalCalories = useMemo(
    () => foodData.reduce((sum, item) => sum + item.calories, 0),
    [foodData]
  );

  const avgCalories = useMemo(
    () => (foodData.length ? Math.round(totalCalories / foodData.length) : 0),
    [totalCalories, foodData]
  );

  const totalWorkoutMinutes = useMemo(
    () => workoutData.reduce((sum, w) => sum + w.duration, 0),
    [workoutData]
  );

  const aiScore = useMemo(() => {
    if (!avgCalories || !totalWorkoutMinutes) return null;
    let score = 50;
    if (avgCalories < 2000) score += 15;
    if (avgCalories > 2300) score -= 10;
    if (totalWorkoutMinutes > 90) score += 20;
    return Math.min(100, score);
  }, [avgCalories, totalWorkoutMinutes]);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-green-100 via-sky-100 to-purple-100">
      
      {/* ---------- HERO ---------- */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
          <TypewriterText text="AI Health Dashboard" speed={70} />
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Smart insights based on your daily habits
        </p>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
        <Card title="Avg Calories / Day" value={avgCalories} />
        <Card title="Workout Minutes" value={totalWorkoutMinutes} />
        <Card title="AI Health Score" value={aiScore ?? "Analyzing..."} />
      </section>

      {/* ---------- FOOD ANALYSIS ---------- */}
      <section className="bg-white rounded-2xl shadow-xl p-6 mb-10 animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Weekly Calorie Breakdown
        </h2>

        <div className="space-y-3">
          {foodData.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 group"
            >
              <span className="w-12 font-semibold">{item.day}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700 group-hover:scale-x-110 origin-left"
                  style={{ width: `${item.calories / 25}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {item.calories} cal
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- AI INSIGHT ---------- */}
      <section className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-2xl animate-slideUp">
        <h2 className="text-2xl font-bold mb-2">
          AI Daily Insight
        </h2>

        <p className="opacity-90 mb-4">
          Based on your food intake & workout balance
        </p>

        <p className="text-4xl font-extrabold">
          Health Score: {aiScore ?? "..."}
        </p>

        <p className="mt-3 text-sm opacity-80">
          Tip: Consistency beats perfection. Keep moving 🚀
        </p>

        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
      </section>
    </div>
  );
}
