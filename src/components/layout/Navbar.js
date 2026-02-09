"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, Activity } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="px-4 md:px-6 py-3 flex justify-between items-center">
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

        <button
          onClick={() => {
            window.dispatchEvent(new Event("sidebar:toggle"));
            setMenuOpen(false);
          }}
          className="p-2 rounded-md hover:bg-white hover:text-blue-600 transition"
          aria-label="Toggle navigation"
          title="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile dropdown removed; sidebar handles navigation */}
    </header>
  );
}
