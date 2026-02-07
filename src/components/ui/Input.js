"use client";

export default function Input({ type = "text", placeholder, value, onChange, className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-xl focus:outline-none transition ${className}`}
      {...props}
    />
  );
}
