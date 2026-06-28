import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthlyTrend() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        const totals = Array(12).fill(0);

        snapshot.forEach((doc) => {
          const report = doc.data();

          if (!report.createdAt) return;

          const date = report.createdAt.toDate();
          const month = date.getMonth();

          totals[month] += Number(report.weight || 0);
        });

        setData(
          months.map((month, index) => ({
            month,
            waste: totals[index],
          }))
        );
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-[420px]">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Monthly Waste Trend
        </h2>

        <p className="text-sm text-gray-400">
          Waste collected each month
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid
            stroke="#30363D"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="month"
            stroke="#8B949E"
          />

          <YAxis
            stroke="#8B949E"
          />

          <Tooltip
            formatter={(value) => [`${value} kg`, "Waste"]}
            contentStyle={{
              background: "#161B22",
              border: "1px solid #30363D",
            }}
          />

          <Line
            type="monotone"
            dataKey="waste"
            stroke="#22c55e"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}