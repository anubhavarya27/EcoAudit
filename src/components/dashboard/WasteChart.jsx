import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const categories = [
  "Plastic",
  "Paper",
  "Metal",
  "Glass",
  "Organic",
  "E-Waste",
  "Other",
];

export default function WasteChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const totals = {};

        categories.forEach((cat) => {
          totals[cat] = 0;
        });

        snapshot.forEach((doc) => {
          const report = doc.data();
          const category = report.category || "Other";

          totals[category] += Number(report.weight || 0);
        });

        const chartData = categories.map((category) => ({
          category,
          waste: totals[category],
        }));

        setData(chartData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Waste by Category
        </h2>

        <p className="text-sm text-gray-400">
          Live category-wise waste collected
        </p>
      </div>

      {/* Chart */}
      <div className="flex-1">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >

            <CartesianGrid
              stroke="#30363D"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="category"
              stroke="#8B949E"
              tick={{ fill: "#8B949E", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#8B949E"
              tick={{ fill: "#8B949E", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "#1F2937" }}
              contentStyle={{
                backgroundColor: "#161B22",
                border: "1px solid #30363D",
                borderRadius: "12px",
                color: "white",
              }}
              formatter={(value) => [`${value} kg`, "Waste"]}
            />

            <Bar
              dataKey="waste"
              fill="#22C55E"
              radius={[8, 8, 0, 0]}
              barSize={70}
              animationDuration={900}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}