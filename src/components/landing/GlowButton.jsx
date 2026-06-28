import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function GlowButton() {
  return (
    <Link
      to="/dashboard"
      className="group relative overflow-hidden rounded-2xl bg-emerald-400 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105"
    >
      <span className="relative z-10 flex items-center gap-2">
        Enter EcoAudit
        <ArrowRight
          size={18}
          className="transition group-hover:translate-x-1"
        />
      </span>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-green-500 opacity-0 transition duration-300 group-hover:opacity-100" />
    </Link>
  );
}