import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default function EnvironmentScore() {
  const [score, setScore] = useState(100);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        let totalWaste = 0;
        let reports = snapshot.size;

        snapshot.forEach((doc) => {
          totalWaste += Number(doc.data().weight || 0);
        });

        // Simple scoring algorithm
        let calculatedScore = 100;

        calculatedScore -= totalWaste * 2; // Reduce score based on waste
        calculatedScore += reports * 3;    // Reward active reporting

        calculatedScore = Math.max(0, Math.min(100, Math.round(calculatedScore)));

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