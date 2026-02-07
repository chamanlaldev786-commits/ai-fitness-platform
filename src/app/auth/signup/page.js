"use client";

import { useState } from "react";
import toast from "@/components/notifications/Toast";
import { useRouter } from "next/navigation";
import { mockSignup } from "@/utils/mockApi";
import TypewriterText from "@/components/animations/TypewriterText";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast("Passwords do not match", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await mockSignup(form);
      if (res.success) {
        toast("Signup successful!", "success");
        router.push("/auth/login");
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
          text="Create Your Account"
          className="text-3xl font-bold mb-6 text-white text-center"
        />
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Username"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Confirm Password"
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:scale-105 transition-transform duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-white text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="underline hover:text-green-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
