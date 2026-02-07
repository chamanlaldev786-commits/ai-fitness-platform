"use client";
import { useState } from "react";

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initial
  );

  const update = (val) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, update];
}
