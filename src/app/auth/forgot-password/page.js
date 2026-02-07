"use client";

import { useState } from "react";
import  Toast  from "@/components/notifications/Toast";
import TypewriterText from "@/components/animations/TypewriterText";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      Toast("Password reset link sent to your email!", "success");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-teal-200 to-blue-200 p-4">
      <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        <TypewriterText
          text="Forgot Your Password?"
          className="text-3xl font-bold mb-6 text-white text-center"
        />
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:scale-105 transition-transform duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="mt-4 text-white text-center text-sm">
          Back to{" "}
          <a href="/auth/login" className="underline hover:text-green-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
