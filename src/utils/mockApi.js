export const mockLogin = (email, password) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "123456") {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "Invalid email or password" });
      }
    }, 1000);
  });

// Existing mockLogin function above

export const mockSignup = (form) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (form.email && form.password && form.username) {
        resolve({ success: true });
      } else {
        resolve({ success: false, message: "All fields are required" });
      }
    }, 1000);
  });
export const mockFetchDashboard = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Calories Consumed", value: "2,150 kcal" },
        { title: "Steps Today", value: "7,820" },
        { title: "Workouts Completed", value: "3" },
      ]);
    }, 800);
  });
export const mockFetchFoodLog = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Apple", calories: 95 },
        { name: "Banana", calories: 105 },
        { name: "Salad", calories: 150 },
      ]);
    }, 500);
  });

export const mockFetchExerciseLog = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Running", duration: 30 },
        { name: "Cycling", duration: 45 },
        { name: "Yoga", duration: 20 },
      ]);
    }, 500);
  });

export const mockFetchAIPredictions = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { metric: "Heart Rate", value: "72 bpm" },
        { metric: "BMI", value: "22.5" },
        { metric: "Sleep Quality", value: "85%" },
      ]);
    }, 500);
  });

export const mockFetchCharts = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { day: "Mon", calories: 2000, steps: 8000 },
        { day: "Tue", calories: 1800, steps: 7000 },
        { day: "Wed", calories: 2200, steps: 9000 },
        { day: "Thu", calories: 2100, steps: 8500 },
        { day: "Fri", calories: 1900, steps: 7500 },
        { day: "Sat", calories: 2300, steps: 9500 },
        { day: "Sun", calories: 2000, steps: 8000 },
      ]);
    }, 500);
  });
export function fakeApi(data, delay = 800) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}
