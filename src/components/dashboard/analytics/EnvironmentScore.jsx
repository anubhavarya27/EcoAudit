import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { calculateEnvironmentScore } from "../../../utils/environmentScore";

export default function EnvironmentScore() {
  const [score, setScore] = useState(100);

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

        // Use the shared calculation
        const calculatedScore = calculateEnvironmentScore(
          totalWaste,
          verified
        );

        setScore(calculatedScore);
      }
    );

    return () => unsubscribe();
  }, []);

  const getColor = () => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatus = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Improvement";
    return "Critical";
  };

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-[360px]">
      <h2 className="text-xl font-semibold">
        Environment Score
      </h2>

      <p className="mb-8 text-sm text-gray-400">
        Overall sustainability performance
      </p>

      <div className="flex h-[220px] flex-col items-center justify-center">
        <div className={`text-7xl font-bold ${getColor()}`}>
          {score}
        </div>

        <div className="mt-3 text-xl font-semibold">
          /100
        </div>

        <div className={`mt-6 text-lg font-semibold ${getColor()}`}>
          {getStatus()}
        </div>
      </div>
    </div>
  );
}