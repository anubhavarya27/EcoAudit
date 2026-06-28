import { motion } from "motion/react";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">

      {/* Stars */}

      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Aurora */}

      <div
        className="aurora"
        style={{
          top: "-250px",
          left: "20%",
        }}
      />

      <div
        className="aurora"
        style={{
          right: "-300px",
          bottom: "-250px",
        }}
      />

      {/* Grid */}

      <div
        className="absolute bottom-0 w-full h-[45vh]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          transform: "perspective(900px) rotateX(70deg)",
          transformOrigin: "bottom",
          opacity: .18,
        }}
      />
    </div>
  );
}