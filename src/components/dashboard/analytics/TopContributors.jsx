import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default function TopContributors() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const totals = {};

        snapshot.forEach((doc) => {
          const data = doc.data();

          const user = data.userName || "Unknown";

          if (!totals[user]) {
            totals[user] = 0;
          }

          totals[user] += Number(data.weight || 0);
        });

        const ranked = Object.entries(totals)
          .map(([name, weight]) => ({
            name,
            weight,
          }))
          .sort((a, b) => b.weight - a.weight)
          .slice(0, 5);

        setContributors(ranked);
      }
    );

    return () => unsubscribe();
  }, []);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-400 text-lg">
            🥇
          </div>
        );

      case 1:
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-300 text-lg">
            🥈
          </div>
        );

      case 2:
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-400 text-lg">
            🥉
          </div>
        );

      default:
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 font-bold text-black">
            {index + 1}
          </div>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-[420px]">
      <h2 className="text-xl font-semibold">
        Top Contributors
      </h2>

      <p className="mb-5 text-sm text-gray-400">
        Ranked by total waste submitted
      </p>

      {/* Scrollable List */}
      <div className="h-[310px] space-y-4 overflow-y-auto pr-2">
        {contributors.map((user, index) => (
          <div
            key={user.name}
            className="flex items-center justify-between rounded-xl bg-[#0D1117] p-4 transition-all duration-300 hover:bg-[#1B212B]"
          >
            <div className="flex items-center gap-4">
              {getRankBadge(index)}

              <div>
                <p className="text-lg font-semibold">
                  {user.name}
                </p>

                <p className="text-sm text-gray-400">
                  Rank #{index + 1}
                </p>
              </div>
            </div>

            <span className="text-xl font-bold text-green-400">
              {user.weight} kg
            </span>
          </div>
        ))}

        {contributors.length === 0 && (
          <div className="flex h-full items-center justify-center text-gray-400">
            No contributors yet.
          </div>
        )}
      </div>
    </div>
  );
}