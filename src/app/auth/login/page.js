"use client";

import { useState } from "react";
import { mockLogin } from "@/utils/mockApi";
import toast from "@/components/notifications/Toast";
import { useRouter } from "next/navigation";
import TypewriterText from "@/components/animations/TypewriterText";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await mockLogin(email, password);
      if (res.success) {
        toast("Login successful!", "success");
        router.push("/dashboard");
      } else {
        toast(res.message, "error");
      }
    } catch (err) {
      toast("Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-teal-200 to-blue-200 p-4">
      <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        <TypewriterText
          text="Welcome Back!"
          className="text-3xl font-bold mb-6 text-white text-center"
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:scale-105 transition-transform duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-white text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/auth/signup" className="underline hover:text-green-300">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
