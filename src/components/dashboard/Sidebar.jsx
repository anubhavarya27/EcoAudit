import {
  LayoutDashboard,
  PlusCircle,
  ChartColumn,
  Map,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const items = [
  {
    icon: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: PlusCircle,
    name: "Log Waste",
    path: "/log",
  },
  {
    icon: ChartColumn,
    name: "Analytics",
    path: "/analytics",
  },
  {
    icon: Map,
    name: "Community Map",
    path: "/map",
  },
  
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-[#30363D] bg-[#161B22] px-6 py-8">

      {/* Logo */}
      <h1 className="mb-12 text-3xl font-black tracking-tight">
        <span className="text-white">Eco</span>
        <span className="text-green-400">Audit</span>
      </h1>

      {/* Navigation */}
      <nav className="space-y-3">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex w-full items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg shadow-green-500/20"
                    : "text-gray-400 hover:bg-[#21262D] hover:text-white hover:translate-x-1"
                }`
              }
            >
              <Icon
                size={20}
                className="transition group-hover:scale-110"
              />

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>
    </aside>
  );
}