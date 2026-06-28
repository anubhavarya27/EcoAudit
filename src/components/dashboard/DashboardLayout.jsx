import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import WasteChart from "./WasteChart";
import WasteInsights from "./WasteInsights";
import RecentLogs from "./RecentLogs";

import {
  Trash2,
  MapPinned,
  Activity,
  Users,
} from "lucide-react";

export default function DashboardLayout() {
  const [stats, setStats] = useState({
  totalWaste: 0,
  totalReports: 0,
  verifiedReports: 0,
  registeredUsers: 0,
});

  useEffect(() => {
  let registeredUsers = 0;

  // Listen to users collection
  const unsubscribeUsers = onSnapshot(
    collection(db, "users"),
    (usersSnapshot) => {
      registeredUsers = usersSnapshot.size;

      setStats((prev) => ({
        ...prev,
        registeredUsers,
      }));
    }
  );

  // Listen to waste reports collection
  const unsubscribeReports = onSnapshot(
    collection(db, "wasteReports"),
    (snapshot) => {
      let totalWaste = 0;
      let verifiedReports = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();

        totalWaste += Number(data.weight || 0);

        if (data.status === "Verified") {
          verifiedReports++;
        }
      });

      setStats((prev) => ({
        ...prev,
        totalWaste,
        totalReports: snapshot.size,
        verifiedReports,
      }));
    },
    (error) => {
      console.error(error);
    }
  );

  return () => {
    unsubscribeUsers();
    unsubscribeReports();
  };
}, []);

  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header />

        <div className="p-8">

          {/* Page Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">
              Community Waste Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Monitor waste collection and environmental impact in real time.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total Waste"
              value={stats.totalWaste}
              unit=" kg"
              trend="Live from Firestore"
              icon={Trash2}
            />

            <StatCard
              title="Waste Reports"
              value={stats.totalReports}
              unit=""
              trend="Real-time"
              icon={Activity}
            />

            <StatCard
  title="Verified Reports"
  value={stats.verifiedReports}
  unit=""
  trend="Approved Reports"
  icon={MapPinned}
/>

            <StatCard
  title="Registered Users"
  value={stats.registeredUsers}
  unit=""
  trend="EcoAudit Members"
  icon={Users}
/>

          </div>

          {/* Chart + Activity */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            <div className="lg:col-span-2">
              <WasteChart />
            </div>

            <div>
  <WasteInsights />
</div>

          </div>

          {/* Recent Logs */}
          <div className="mt-8">
            <RecentLogs />
          </div>

        </div>
      </main>
    </div>
  );
}