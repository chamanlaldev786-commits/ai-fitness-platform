"use client";

export default function Card({ title, value, children }) {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
      {title && <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>}
      {value && <p className="text-2xl font-bold text-gray-900">{value}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
