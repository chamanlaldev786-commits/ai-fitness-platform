"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TypewriterText from "@/components/animations/TypewriterText";
import { fetchAIPredictions } from "@/services/aiService";
import { getFoodLogs } from "@/services/foodService";
import { getExercises } from "@/services/exerciseService";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";

const backgroundImages = [
  "https://source.unsplash.com/1600x900/?fitness,health",
  "https://source.unsplash.com/1600x900/?exercise,workout",
  "https://source.unsplash.com/1600x900/?nutrition,food",
];

export default function DashboardPage() {
  const [currentImage] = useState(() => {
    const dayIndex = new Date().getDate() % backgroundImages.length;
    return backgroundImages[dayIndex];
  });
  const [predictions, setPredictions] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    // Load AI data, food, exercise
    async function loadData() {
      const aiData = await fetchAIPredictions();
      const food = await getFoodLogs();
      const exercise = await getExercises();

      setPredictions(aiData);
      setFoodData(food);
      setExerciseData(exercise);
    }

    loadData();
  }, []);

  // Pie chart example: proportion of calories vs exercise
  const pieData = {
    labels: ["Calories Consumed", "Calories Burned"],
    datasets: [
      {
        data: [
          foodData.reduce((sum, f) => sum + parseInt(f.calories || 0), 0),
          exerciseData.reduce((sum, e) => sum + parseInt(e.duration || 0), 0),
        ],
        backgroundColor: ["#6366F1", "#10B981"],
      },
    ],
  };

  return (
    <div
      className="relative w-full min-h-screen text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-pink-700 to-yellow-600 opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl p-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            <TypewriterText
              text="Welcome to Your Ultimate AI Health Dashboard"
              speed={80}
            />
          </h1>
          <p className="text-lg md:text-2xl text-white/90">
            Track your fitness, monitor your health, and get AI-powered insights daily.
          </p>
        </div>

        {/* AI Prediction Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {predictions.map((item, idx) => (
            <Card key={idx} title={item.title}>
              <p className="text-gray-700">{item.description}</p>
              {item.youtubeLink && (
                <a
                  href={item.youtubeLink}
                  target="_blank"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Watch related video
                </a>
              )}
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <Card title="Calories Intake vs Exercise Burn">
            <BarChart
              labels={foodData.map((f) => f.name)}
              dataCalories={foodData.map((f) => parseInt(f.calories || 0))}
              dataExercise={exerciseData.map((e) => parseInt(e.duration || 0))}
            />
          </Card>

          <Card title="Weekly Progress Trend">
            <LineChart
              labels={foodData.map((f) => f.date)}
              data={exerciseData.map((e) => e.duration)}
            />
          </Card>

          <Card title="Calories vs Exercise Proportion">
            <PieChart data={pieData} />
          </Card>
        </div>

        {/* YouTube Video */}
        <div className="mb-10">
          <iframe
            width="100%"
            height="360"
            src="https://www.youtube.com/embed/dRl3Z4hfp5Y"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>

        {/* Call to action */}
        <div className="text-center mb-10">
          <Button
            onClick={() => alert("AI Analysis refreshed!")}
            className="px-8 py-3 text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-xl rounded-lg hover:scale-105 transform transition duration-300"
          >
            Refresh Predictions
          </Button>
        </div>
      </div>

      {/* Animated floating circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-pink-400 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500 rounded-full opacity-60 animate-spin"></div>

      {/* Background audio */}
      <audio autoPlay hidden>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
