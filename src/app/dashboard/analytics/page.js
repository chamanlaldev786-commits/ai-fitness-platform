"use client";

import { useEffect, useMemo, useState } from "react";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import Card from "@/components/ui/Card";
import TypewriterText from "@/components/animations/TypewriterText";
import { fetchChartsData } from "@/services/dashboardService";

export default function AnalyticsPage() {
  const [chartsData, setChartsData] = useState({ bar: [], line: [], pie: [] });

  useEffect(() => {
    async function loadCharts() {
      const data = await fetchChartsData();
      setChartsData({
        bar: data?.bar || [],
        line: data?.line || [],
        pie: data?.pie || [],
      });
    }
    loadCharts();
  }, []);

  const totalCalories = useMemo(
    () => chartsData.bar.reduce((sum, item) => sum + Number(item.value || 0), 0),
    [chartsData.bar]
  );

  const avgCalories = useMemo(() => (chartsData.bar.length ? Math.round(totalCalories / chartsData.bar.length) : 0), [totalCalories, chartsData.bar]);

  const workoutTrend = useMemo(() => {
    if (chartsData.line.length < 2) return "No trend";
    const first = chartsData.line[0].value;
    const last = chartsData.line[chartsData.line.length - 1].value;
    return last > first ? "Improving 📈" : "Declining 📉";
  }, [chartsData.line]);

  const macroBalance = useMemo(() => {
    const total = chartsData.pie.reduce((sum, p) => sum + Number(p.value || 0), 0);
    if (!total) return "No data";
    const max = Math.max(...chartsData.pie.map((p) => p.value));
    return max / total > 0.5 ? "Unbalanced ⚠️" : "Balanced ✅";
  }, [chartsData.pie]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          <TypewriterText text="Analytics & Health Trends" speed={80} />
        </h1>
        <p className="mt-3 text-gray-700 text-lg">Visual insights from your nutrition & workout data</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        <Card title="Total Calories" value={`${totalCalories} kcal`} />
        <Card title="Avg Calories / Day" value={`${avgCalories} kcal`} />
        <Card title="Workout Trend" value={workoutTrend} />
        <Card title="Macro Balance" value={macroBalance} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        <div className="bg-white p-5 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Calories Intake</h2>
          <BarChart
            labels={chartsData.bar.map((i) => i.label)}
            dataCalories={chartsData.bar.map((i) => i.value)}
            dataExercise={[]}
          />
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Workout Performance</h2>
          <LineChart
            labels={chartsData.line.map((i) => i.label)}
            data={chartsData.line.map((i) => i.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Nutrition Distribution</h2>
          <PieChart
            data={{
              labels: chartsData.pie.map((i) => i.label),
              datasets: [
                { data: chartsData.pie.map((i) => i.value), backgroundColor: ["#6366F1", "#22C55E", "#F97316"] },
              ],
            }}
          />
        </div>
      </div>

      {/* AI INSIGHT */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl">
        <h3 className="text-2xl font-bold mb-3">AI Insight</h3>
        <p className="text-lg">
          {avgCalories < 1800
            ? "You may need more daily calories to support your activity level."
            : "Great balance! Your calorie intake supports a healthy lifestyle."}
        </p>
      </div>
    </div>
  );
}
