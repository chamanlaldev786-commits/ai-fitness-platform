"use client";
import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, Activity } from "lucide-react"; // icons for logo & notification

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Activity className="w-8 h-8 text-yellow-300 animate-spin-slow" />
          <h1 className="text-2xl font-extrabold tracking-wider hover:text-yellow-300 transition">
            AI Health
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/auth/login" className="hover:text-yellow-300 transition">
            Login
          </Link>
          <Link href="/auth/signup" className="hover:text-yellow-300 transition">
            Sign Up
          </Link>
          <Link href="/counter" className="hover:text-yellow-300 transition">
            Counter
          </Link>
          <button className="relative">
            <Bell className="w-6 h-6 text-yellow-300 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-white hover:text-blue-600 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-500 to-purple-600 px-4 py-4 flex flex-col gap-3 animate-fadeIn">
          <Link href="/auth/login" className="hover:text-yellow-300 transition">
            Login
          </Link>
          <Link href="/auth/signup" className="hover:text-yellow-300 transition">
            Sign Up
          </Link>
          <Link href="/dashboard" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>
          <Link href="/dashboard/food-log" className="hover:text-yellow-300 transition">
            Food Log
          </Link>
          <Link href="/dashboard/exercise-log" className="hover:text-yellow-300 transition">
            Exercise Log
          </Link>
          <Link href="/dashboard/ai-prediction" className="hover:text-yellow-300 transition">
            AI Predictions
          </Link>
          <Link href="/counter" className="hover:text-yellow-300 transition">
            Counter
          </Link>
        </div>
      )}
    </header>
  );
}
