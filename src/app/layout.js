// Remove "use client"

import "./globals.css";
import "../styles/components.css";
import "../styles/animations.css";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";

export const metadata = {
  title: "AI Health & Fitness Dashboard",
  description: "Track your diet, workouts, and health stats with AI-powered predictions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans flex min-h-screen relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 px-4 py-6 overflow-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
