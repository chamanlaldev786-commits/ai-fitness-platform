"use client";

import { useEffect, useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TypewriterText from "@/components/animations/TypewriterText";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import { motion } from "framer-motion";
import Image from "next/image";

import { getFoodLogs } from "@/services/foodService";
import { getExercises } from "@/services/exerciseService";
import { fetchAIPredictions } from "@/services/aiService";

// ✅ Animation Wrappers
export const FadeIn = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

export default function SmartAIPredictionPage() {
  const [predictions, setPredictions] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [insights, setInsights] = useState([]);
  const [dynamicImage, setDynamicImage] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    async function loadAll() {
      const [food, exercise, ai] = await Promise.all([
        getFoodLogs(),
        getExercises(),
        fetchAIPredictions(),
      ]);

      setFoodData(food || []);
      setExerciseData(exercise || []);
      setPredictions(ai || []);

      // 🔥 Hero Image
      const images = [
        "https://source.unsplash.com/1000x420/?healthy-food",
        "https://source.unsplash.com/1000x420/?workout",
        "https://source.unsplash.com/1000x420/?fitness",
        "https://source.unsplash.com/1000x420/?gym",
      ];
      setDynamicImage(images[new Date().getDate() % images.length]);

      // 🧠 Smart AI Logic
      const totalCalories = food.reduce((sum, f) => sum + Number(f.calories || 0), 0);
      const totalExercise = exercise.reduce((sum, e) => sum + Number(e.duration || 0), 0);
      const tips = [];

      if (totalCalories > totalExercise * 50) tips.push("High calorie intake detected. Light cardio is recommended.");
      else tips.push("Great balance between calories and workouts. Keep it up!");

      if (exercise.length === 0) tips.push("No workouts logged. Even a 15–20 min walk helps.");
      if (food.some((f) => Number(f.protein) < 20)) tips.push("Protein intake seems low. Add eggs, lentils, or yogurt.");

      setInsights(tips);

      // 🔊 Voice AI
      if (audioEnabled && tips.length > 0) {
        const speech = new SpeechSynthesisUtterance(tips.join(". "));
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
        audioRef.current = speech;
      }
    }

    loadAll();
    return () => window.speechSynthesis.cancel();
  }, [audioEnabled]);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 p-6">
      {/* Floating Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-300/30 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-pink-300/20 rounded-full blur-3xl -bottom-40 right-0 animate-bounce" />
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          <TypewriterText text="Smart AI Health Dashboard" speed={70} />
        </h1>
        <p className="mt-3 text-lg text-gray-700">AI-powered insights from your food & workouts</p>
      </div>

      {dynamicImage && (
        <SlideUp>
          <div className="mx-auto mb-12 w-full max-w-6xl">
            <Image
              src={dynamicImage}
              alt="AI Health"
              width={1200}
              height={420}
              className="w-full rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </SlideUp>
      )}

      {/* Smart Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {insights.map((tip, i) => (
          <FadeIn key={i}>
            <Card title={`AI Insight ${i + 1}`}>
              <p className="text-gray-700 leading-relaxed">{tip}</p>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* AI Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {predictions.map((p, i) => (
          <FadeIn key={i}>
            <Card title={p.title}>
              <p className="text-gray-700">{p.description}</p>
              {p.youtubeLink && (
                <a
                  href={p.youtubeLink}
                  target="_blank"
                  className="mt-3 inline-block text-blue-600 font-medium hover:underline"
                >
                  Watch video →
                </a>
              )}
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        <FadeIn>
          <Card title="Calories vs Exercise">
            <BarChart
              labels={foodData.map((f) => f.name)}
              dataCalories={foodData.map((f) => Number(f.calories))}
              dataExercise={exerciseData.map((e) => Number(e.duration))}
            />
          </Card>
        </FadeIn>

        <FadeIn>
          <Card title="Workout Trend">
            <LineChart
              labels={exerciseData.map((e) => e.date)}
              data={exerciseData.map((e) => Number(e.duration))}
            />
          </Card>
        </FadeIn>
      </div>

      <FadeIn>
        <Card title="Macro Distribution">
          <PieChart
            labels={foodData.map((f) => f.name)}
            data={foodData.map((f) => Number(f.protein) + Number(f.carbs) + Number(f.fats))}
          />
        </Card>
      </FadeIn>

      {/* Actions */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <Button onClick={() => window.location.reload()}>Refresh Dashboard</Button>
        <Button onClick={() => setAudioEnabled((v) => !v)}>
          {audioEnabled ? "Mute AI Voice" : "Enable AI Voice"}
        </Button>
      </div>
    </div>
  );
}
