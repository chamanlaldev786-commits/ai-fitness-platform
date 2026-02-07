"use client";
import { useState } from "react";
import { save, load } from "../utils/localStorage";

export default function useAuth() {
  const [user, setUser] = useState(load("user"));

  const login = (data) => {
    save("user", data);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, login, logout };
}
