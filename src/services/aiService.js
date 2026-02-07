export async function fetchAIPredictions() {
  const images = [
    "https://images.unsplash.com/photo-1588776814546-4dbd2b0ff6c7",
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    "https://images.unsplash.com/photo-1612197521424-1f567e1e2f49",
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Heart Health Prediction",
          description: "Based on your activity and diet, your heart health score is 85%. Keep exercising!",
          chartData: [
            { day: "Mon", score: 80 },
            { day: "Tue", score: 82 },
            { day: "Wed", score: 85 },
            { day: "Thu", score: 84 },
            { day: "Fri", score: 85 },
          ],
          youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          image: images[Math.floor(Math.random() * images.length)],
        },
        {
          title: "Sleep Quality Prediction",
          description: "Your AI suggests improving sleep routine. Predicted sleep quality: 78%",
          chartData: [
            { day: "Mon", score: 75 },
            { day: "Tue", score: 77 },
            { day: "Wed", score: 78 },
            { day: "Thu", score: 76 },
            { day: "Fri", score: 78 },
          ],
          youtubeLink: "https://www.youtube.com/watch?v=9bZkp7q19f0",
          image: images[Math.floor(Math.random() * images.length)],
        },
      ]);
    }, 1000);
  });
}
