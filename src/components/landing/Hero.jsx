import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingDashboard from "./FloatingDashboard";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-8 pt-16">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-24 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Badge */}
          

          {/* Heading */}
          <h1 className="text-6xl font-black leading-tight lg:text-8xl">
            Measure.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,197,94,.7)]">
              Verify.
            </span>
            <br />
            Improve.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-xl leading-8 text-gray-400">
            EcoAudit helps campuses and smart communities monitor waste,
            visualize environmental impact, and encourage sustainable action
            using modern technology and real-time analytics.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">

            {/* Primary Button */}
            <Link
              to="/dashboard"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_45px_rgba(34,197,94,.55)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter EcoAudit
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </Link>

            {/* Secondary Button */}
            <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white backdrop-blur-xl transition-all duration-300 hover:border-green-400/40 hover:bg-white/10">
              <Play size={18} />
              Watch Demo
            </button>

          </div>

        </motion.div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center justify-center">
          <FloatingDashboard />
        </div>

      </div>
    </section>
  );
}