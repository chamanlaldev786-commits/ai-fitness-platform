"use client";

import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TypewriterText from "@/components/animations/TypewriterText";
import { fetchExerciseData } from "@/services/dashboardService";

export default function ExerciseLogPage() {
  const [exerciseData, setExerciseData] = useState([]);
  const [workout, setWorkout] = useState({ name: "", duration: "" });
  const [query, setQuery] = useState("");
  const [minDur, setMinDur] = useState(0);
  const [maxDur, setMaxDur] = useState(300);
  const [pendingQuery, setPendingQuery] = useState("");
  const [pendingMinDur, setPendingMinDur] = useState(0);
  const [pendingMaxDur, setPendingMaxDur] = useState(300);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    async function loadExercises() {
      const data = await fetchExerciseData();
      setExerciseData(data);
    }
    loadExercises();
  }, []);

  /* ---------------- ADD WORKOUT ---------------- */
  const addWorkout = () => {
    if (!workout.name || !workout.duration) return;
    if (Number(workout.duration) <= 0) return;

    setExerciseData((prev) => [
      {
        id: Date.now(),
        name: workout.name,
        duration: Number(workout.duration),
      },
      ...prev,
    ]);

    setWorkout({ name: "", duration: "" });
  };

  /* ---------------- DELETE WORKOUT ---------------- */
  const deleteWorkout = (id) => {
    setExerciseData((prev) => prev.filter((w) => w.id !== id));
  };

  /* ---------------- SMART LOGIC ---------------- */
  const totalMinutes = useMemo(
    () => exerciseData.reduce((sum, w) => sum + w.duration, 0),
    [exerciseData]
  );

  const avgDuration = useMemo(
    () =>
      exerciseData.length
        ? Math.round(totalMinutes / exerciseData.length)
        : 0,
    [totalMinutes, exerciseData]
  );

  const fitnessStatus = useMemo(() => {
    if (avgDuration === 0) return "No activity";
    if (avgDuration < 20) return "Low Activity 🟡";
    if (avgDuration <= 45) return "Good Fitness 🟢";
    return "Athletic Level 🔥";
  }, [avgDuration]);

  const filteredWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exerciseData.filter((item) => {
      const nameMatch = !q || (item.name || "").toLowerCase().includes(q);
      const d = Number(item.duration || 0);
      const rangeMatch = d >= Number(minDur || 0) && d <= Number(maxDur || Infinity);
      return nameMatch && rangeMatch;
    });
  }, [exerciseData, query, minDur, maxDur]);

  const applyFilters = () => {
    const min = Number(pendingMinDur || 0);
    const max = Number(pendingMaxDur || 300);
    setQuery(pendingQuery);
    setMinDur(min);
    setMaxDur(max < min ? min : max);
  };

  const clearFilters = () => {
    setPendingQuery("");
    setPendingMinDur(0);
    setPendingMaxDur(300);
    setQuery("");
    setMinDur(0);
    setMaxDur(300);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-red-100">

      {/* ---------- HEADER ---------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          <TypewriterText text="Daily Exercise Log" speed={80} />
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Track workouts, duration & performance
        </p>
      </div>

      {/* ---------- SUMMARY ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Card title="Total Minutes" value={totalMinutes} />
        <Card title="Avg / Workout" value={`${avgDuration} min`} />
        <Card title="Fitness Status" value={fitnessStatus} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <Input
          value={workout.name}
          onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
          placeholder="Workout name"
          aria-label="Workout name"
          className="w-full sm:w-60 p-3 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-pink-400"
        />
        <Input
          type="number"
          value={workout.duration}
          onChange={(e) =>
            setWorkout({ ...workout, duration: e.target.value })
          }
          placeholder="Duration (min)"
          aria-label="Duration in minutes"
          inputMode="numeric"
          min={0}
          className="w-full sm:w-40 p-3 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={addWorkout}
          className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl hover:scale-105 transition"
        >
          Add Workout
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <Input
          value={pendingQuery}
          onChange={(e) => setPendingQuery(e.target.value)}
          placeholder="Search workouts"
          aria-label="Search workouts"
          className="w-full sm:w-72 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400"
        />
        <Input
          type="number"
          min={0}
          value={pendingMinDur}
          onChange={(e) => setPendingMinDur(e.target.value)}
          placeholder="Min min"
          aria-label="Minimum duration"
          className="w-full sm:w-40 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          inputMode="numeric"
        />
        <Input
          type="number"
          min={0}
          value={pendingMaxDur}
          onChange={(e) => setPendingMaxDur(e.target.value)}
          placeholder="Max min"
          aria-label="Maximum duration"
          className="w-full sm:w-40 p-3 text-black rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400"
          inputMode="numeric"
        />
        <button
          onClick={applyFilters}
          className="px-5 py-3 rounded-xl text-white font-semibold bg-pink-600 hover:bg-pink-700 shadow-md"
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

      {/* ---------- WORKOUT LIST ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition animate-fadeIn"
          >
            <Card title={item.name} value={`${item.duration} min`} />

            <button
              onClick={() => deleteWorkout(item.id)}
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
