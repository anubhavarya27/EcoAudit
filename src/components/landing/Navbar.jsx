import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 z-50 w-full"
    >
      <div className="mx-auto mt-4 flex w-[90%] max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-[#08120F]/80 px-8 py-4 backdrop-blur-2xl">

        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 text-2xl font-bold text-white"
        >
          <Leaf
            size={30}
            className="text-green-400"
          />

          EcoAudit
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-12 md:flex">

          <a
            href="#features"
            className="font-medium text-gray-300 transition-all duration-300 hover:text-green-400"
          >
            Features
          </a>

          <a
            href="#about"
            className="font-medium text-gray-300 transition-all duration-300 hover:text-green-400"
          >
            About
          </a>

          <Link
            to="/dashboard"
            className="font-medium text-gray-300 transition-all duration-300 hover:text-green-400"
          >
            Dashboard
          </Link>

        </div>

        {/* CTA Button */}
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]"
        >
          Enter EcoAudit

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

      </div>
    </motion.nav>
  );
}