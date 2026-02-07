export async function fetchAnalyticsData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Weekly Calorie Intake",
          description: "Your calorie intake trend for the week.",
          type: "bar",
          data: [
            { day: "Mon", value: 2100 },
            { day: "Tue", value: 2000 },
            { day: "Wed", value: 2150 },
            { day: "Thu", value: 1900 },
            { day: "Fri", value: 2200 },
          ],
        },
        {
          title: "Workout Types Distribution",
          description: "Distribution of your workouts by type.",
          type: "pie",
          data: [
            { name: "Cardio", value: 60 },
            { name: "Strength", value: 30 },
            { name: "Flexibility", value: 10 },
          ],
        },
      ]);
    }, 800);
  });
}
