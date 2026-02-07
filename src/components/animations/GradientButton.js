// components/ui/GradientButton.js
"use client";

export default function GradientButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-full font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white shadow-xl transform transition-transform hover:scale-105 hover:shadow-2xl"
    >
      {text}
    </button>
  );
}
