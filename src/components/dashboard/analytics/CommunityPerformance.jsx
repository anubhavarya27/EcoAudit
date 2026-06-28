import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

export default function CommunityPerformance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const communities = {};

        snapshot.forEach((doc) => {
          const report = doc.data();

          const community = report.community || "Other";

          if (!communities[community]) {
            communities[community] = 0;
          }

          communities[community] += Number(report.weight || 0);
        });

        const chartData = Object.keys(communities).map((community) => ({
          community,
          waste: communities[community],
        }));

        chartData.sort((a, b) => b.waste - a.waste);

        setData(chartData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-[360px]">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Community Performance
        </h2>

        <p className="text-sm text-gray-400">
          Waste collected by community
        </p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid stroke="#30363D" strokeDasharray="3 3" />

          <XAxis
            dataKey="community"
            stroke="#8B949E"
          />

          <YAxis stroke="#8B949E" />

          <Tooltip
            formatter={(value) => [`${value} kg`, "Waste"]}
            contentStyle={{
              background: "#161B22",
              border: "1px solid #30363D",
            }}
          />

          <Bar
            dataKey="waste"
            fill="#22c55e"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}