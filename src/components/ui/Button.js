"use client";

export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ${className}`}
    >
      {children}
    </button>
  );
}
