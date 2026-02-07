"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TypewriterText from "@/components/animations/TypewriterText";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  const inc = () => setCount((c) => c + 1);
  const dec = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-teal-200 to-blue-200 p-4">
      <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md animate-fadeIn text-center">
        <TypewriterText
          text="Simple Counter"
          className="text-3xl font-bold mb-6 text-white"
        />

        <div className="text-white text-6xl font-extrabold mb-8">
          {count}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={dec} className="bg-red-500 hover:bg-red-600">
            -1
          </Button>
          <Button onClick={reset} className="bg-gray-500 hover:bg-gray-600">
            Reset
          </Button>
          <Button onClick={inc} className="bg-green-500 hover:bg-green-600">
            +1
          </Button>
        </div>

        <p className="mt-6 text-white/90 text-sm">
          Route: <code className="bg-white/20 px-2 py-1 rounded">/counter</code>
        </p>
      </div>
    </div>
  );
}

