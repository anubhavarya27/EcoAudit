import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  Leaf,
  MapPin,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { calculateEnvironmentScore } from "../../utils/environmentScore";

export default function FloatingDashboard() {
  const [stats, setStats] = useState({
    totalWaste: 0,
    reports: 0,
    verified: 0,
    environmentScore: 100,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        let totalWaste = 0;
        let verified = 0;

        snapshot.forEach((doc) => {
          const report = doc.data();

          totalWaste += Number(report.weight || 0);

          if (report.status === "Verified") {
            verified++;
          }
        });

        // Shared Environment Score
        const environmentScore = calculateEnvironmentScore(
          totalWaste,
          verified
        );

        setStats({
          totalWaste,
          reports: snapshot.size,
          verified,
          environmentScore,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [0, 0.3, 0, -0.3, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative w-full max-w-lg"
    >
      <div className="absolute -inset-10 -z-10 rounded-full bg-emerald-400/10 blur-[120px]" />

      <div className="rounded-[32px] border border-emerald-400/20 bg-white/[0.045] backdrop-blur-3xl p-6 shadow-[0_20px_100px_rgba(34,197,94,.18),0_0_180px_rgba(34,197,94,.12)]">

        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            Mission Control
          </h3>

          <div className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-green-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            <span className="text-sm">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4 transition hover:border-green-400/40">
            <Leaf className="mb-2 text-green-400" />
            <p className="text-sm text-gray-400">Total Waste</p>
            <h2 className="text-3xl font-bold text-white">
              {stats.totalWaste} kg
            </h2>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4 transition hover:border-sky-400/40">
            <MapPin className="mb-2 text-sky-400" />
            <p className="text-sm text-gray-400">Verified Reports</p>
            <h2 className="text-3xl font-bold text-white">
              {stats.verified}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4 transition hover:border-yellow-400/40">
            <Activity className="mb-2 text-yellow-400" />
            <p className="text-sm text-gray-400">Waste Reports</p>
            <h2 className="text-3xl font-bold text-white">
              {stats.reports}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.04] p-4 transition hover:border-violet-400/40">
            <ShieldCheck className="mb-2 text-violet-400" />
            <p className="text-sm text-gray-400">
              Environment Score
            </p>
            <h2 className="text-3xl font-bold text-white">
              {stats.environmentScore}%
            </h2>
          </div>

        </div>

        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.04] backdrop-blur-xl p-5">

          <div className="mb-5 flex items-center justify-between">
            <span className="text-gray-400">
              Live Activity
            </span>

            <BarChart3 className="text-green-400" />
          </div>

          <div className="flex h-36 items-end justify-between gap-3">

            {[28, 55, 42, 78, 60, 92, 72].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{
                  height: [height, height + 10, height],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.2,
                }}
                className="flex-1 rounded-full bg-gradient-to-t from-green-600 via-green-500 to-green-300 shadow-[0_0_25px_rgba(34,197,94,0.35)]"
              />
            ))}

          </div>

        </div>

      </div>
    </motion.div>
  );
}