import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import {
  Trophy,
  Recycle,
  Building2,
  Scale,
  ClipboardList,
} from "lucide-react";

export default function SmartInsights() {
  const [insights, setInsights] = useState({
    topCommunity: "-",
    topContributor: "-",
    mostCommonWaste: "-",
    averageWeight: 0,
    totalReports: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const communities = {};
        const users = {};
        const categories = {};

        let totalWeight = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();

          totalWeight += Number(data.weight || 0);

          // Community
          communities[data.community] =
            (communities[data.community] || 0) +
            Number(data.weight || 0);

          // User
          users[data.userName] =
            (users[data.userName] || 0) +
            Number(data.weight || 0);

          // Category
          categories[data.category] =
            (categories[data.category] || 0) +
            Number(data.weight || 0);
        });

        const topCommunity =
          Object.entries(communities).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "-";

        const topContributor =
          Object.entries(users).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "-";

        const mostCommonWaste =
          Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] ||
          "-";

        setInsights({
          topCommunity,
          topContributor,
          mostCommonWaste,
          averageWeight:
            snapshot.size === 0
              ? 0
              : (totalWeight / snapshot.size).toFixed(1),
          totalReports: snapshot.size,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const Card = ({ icon: Icon, title, value }) => (
    <div className="flex items-center gap-4 rounded-xl bg-[#0D1117] p-5">
      <div className="rounded-xl bg-green-500/15 p-3">
        <Icon className="text-green-400" size={24} />
      </div>

      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <h2 className="text-2xl font-bold">
        Smart Insights
      </h2>

      <p className="mb-6 text-gray-400">
        Live insights from community waste reports
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        <Card
          icon={Recycle}
          title="Most Common Waste"
          value={insights.mostCommonWaste}
        />

        <Card
          icon={Building2}
          title="Top Community"
          value={insights.topCommunity}
        />

        <Card
          icon={Scale}
          title="Average Weight"
          value={`${insights.averageWeight} kg`}
        />

        <Card
          icon={Trophy}
          title="Top Contributor"
          value={insights.topContributor}
        />

        <Card
          icon={ClipboardList}
          title="Total Reports"
          value={insights.totalReports}
        />

      </div>

    </div>
  );
}
