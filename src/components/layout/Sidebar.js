"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Cpu, BarChart, ShieldCheck, FileText, Mail } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onToggle = () => setOpen((v) => !v);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    window.addEventListener("sidebar:toggle", onToggle);
    window.addEventListener("sidebar:open", onOpen);
    window.addEventListener("sidebar:close", onClose);
    return () => {
      window.removeEventListener("sidebar:toggle", onToggle);
      window.removeEventListener("sidebar:open", onOpen);
      window.removeEventListener("sidebar:close", onClose);
    };
  }, []);

  const links = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Food Log", href: "/dashboard/food-log", icon: Activity },
    { name: "Exercise Log", href: "/dashboard/exercise-log", icon: Cpu },
    { name: "AI Predictions", href: "/dashboard/ai-prediction", icon: BarChart },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Privacy", href: "/privacy", icon: ShieldCheck },
    { name: "Terms", href: "/terms", icon: FileText },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 ${open ? "block" : "hidden"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 w-72 md:w-80 h-full bg-purple-900/80 backdrop-blur-md text-white shadow-2xl flex flex-col z-50
        transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
      <div className="px-6 py-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-yellow-300 text-center">AI Health Dashboard</h2>
        <button
          className="self-end px-3 py-1 rounded bg-yellow-400 text-purple-900 font-bold"
          onClick={() => setOpen(false)}
        >
          Close
        </button>

        <nav className="flex flex-col gap-3">
          {links.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all transform 
                  hover:bg-purple-700 hover:scale-105
                  ${isActive ? "bg-yellow-400 text-purple-900 font-bold" : "text-white"}
                `}
                onClick={() => setOpen(false)}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-purple-900" : "text-yellow-300"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Branding */}
      <div className="mt-auto px-6 py-6 text-center text-sm text-yellow-200">
        © {new Date().getFullYear()} AI Health. <br /> All rights reserved.
      </div>
      </aside>
    </>
  );
}
