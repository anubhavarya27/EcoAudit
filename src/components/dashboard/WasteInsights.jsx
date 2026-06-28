import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import {
  Recycle,
  Building2,
  Scale,
  Trophy,
} from "lucide-react";

export default function WasteInsights() {
  const [insights, setInsights] = useState({
    commonWaste: "-",
    topCommunity: "-",
    averageWeight: 0,
    topContributor: "-",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const categoryCount = {};
        const communityCount = {};
        const contributorCount = {};

        let totalWeight = 0;

        snapshot.forEach((doc) => {
  const report = doc.data();

  const weight = Number(report.weight || 0);

  totalWeight += weight;

  // Total waste by category
  categoryCount[report.category] =
    (categoryCount[report.category] || 0) + weight;

  // Total waste by community
  communityCount[report.community] =
    (communityCount[report.community] || 0) + weight;

  // Total waste contributed by each user
  contributorCount[report.username] =
    (contributorCount[report.username] || 0) + weight;
});

        const findTop = (obj) => {
  const entries = Object.entries(obj);

  if (entries.length === 0) return "-";

  entries.sort((a, b) => b[1] - a[1]);

  return entries[0][0];
};

        setInsights({
          commonWaste: findTop(categoryCount),
          topCommunity: findTop(communityCount),
          averageWeight:
            snapshot.size === 0
              ? 0
              : (totalWeight / snapshot.size).toFixed(1),
          topContributor: findTop(contributorCount),
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Waste Insights
      </h2>

      <div className="space-y-5">

        <Insight
          icon={<Recycle size={22} />}
          title="Most Common Waste"
          value={insights.commonWaste}
        />

        <Insight
          icon={<Building2 size={22} />}
          title="Top Community"
          value={insights.topCommunity}
        />

        <Insight
          icon={<Scale size={22} />}
          title="Average Weight"
          value={`${insights.averageWeight} kg`}
        />

        <Insight
          icon={<Trophy size={22} />}
          title="Top Contributor"
          value={insights.topContributor}
        />

      </div>

    </div>
  );
}

function Insight({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-[#0D1117] p-4">

      <div className="rounded-lg bg-green-500/20 p-3 text-green-400">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-400">
          {title}
        </p>

        <h3 className="text-lg font-semibold">
          {value}
        </h3>
      </div>

    </div>
  );
}