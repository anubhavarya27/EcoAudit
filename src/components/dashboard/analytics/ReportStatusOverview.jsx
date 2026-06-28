import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#EAB308", // Pending
  "#22C55E", // Verified
  "#EF4444", // Rejected
];

export default function ReportStatusOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "wasteReports"),
      (snapshot) => {
        let pending = 0;
        let verified = 0;
        let rejected = 0;

        snapshot.forEach((doc) => {
          const status = doc.data().status || "Pending";

          if (status === "Pending") pending++;
          else if (status === "Verified") verified++;
          else if (status === "Rejected") rejected++;
        });

        setData([
          { name: "Pending", value: pending },
          { name: "Verified", value: verified },
          { name: "Rejected", value: rejected },
        ]);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-[360px]">

      <h2 className="text-xl font-semibold">
        Report Status
      </h2>

      <p className="mb-4 text-sm text-gray-400">
        Current report verification status
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}