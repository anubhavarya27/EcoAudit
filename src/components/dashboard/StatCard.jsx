import CountUp from "react-countup";
import { motion } from "motion/react";

export default function StatCard({
  title,
  value,
  unit,
  trend,
  icon: Icon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-[#30363D] bg-[#161B22] p-6 transition-all duration-300 hover:border-[#2EA043]"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
  {value}
  {unit}
</h2>

          <p className="mt-4 text-sm text-green-500">
            ↑ {trend}
          </p>
        </div>

        <div className="rounded-xl bg-[#21262D] p-3 group-hover:bg-[#2EA043]/20 transition">
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}