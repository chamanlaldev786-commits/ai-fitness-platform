"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Activity, Cpu, BarChart, ShieldCheck, FileText, Mail } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

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
    <aside className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-purple-800 to-indigo-900 text-white shadow-xl flex flex-col">
      <div className="px-6 py-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-yellow-300 text-center">AI Health Dashboard</h2>

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
  );
}
