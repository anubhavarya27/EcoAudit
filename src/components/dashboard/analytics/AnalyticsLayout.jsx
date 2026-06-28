import Sidebar from "../Sidebar";
import Header from "../Header";

import CommunityPerformance from "./CommunityPerformance";
import TopContributors from "./TopContributors";
import MonthlyTrend from "./MonthlyTrend";
import ReportStatusOverview from "./ReportStatusOverview";
import EnvironmentScore from "./EnvironmentScore";
import SmartInsights from "./SmartInsights";

export default function AnalyticsLayout() {
  return (
    <div className="flex min-h-screen bg-[#0D1117] text-white">

      <Sidebar />

      <main className="flex-1 overflow-auto">

        <Header />

        <div className="p-8">

          {/* Heading */}

          <div className="mb-10">
            <h1 className="text-4xl font-bold">
              Analytics Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
              Analyze community waste trends and environmental performance.
            </p>
          </div>

          {/* Row 1 */}

          <div className="grid gap-6 lg:grid-cols-2">

            <CommunityPerformance />

            <TopContributors />

          </div>

          {/* Row 2 */}

          <div className="mt-8">

            <MonthlyTrend />

          </div>

          {/* Row 3 */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <ReportStatusOverview />

            <EnvironmentScore />

          </div>

          {/* Row 4 */}

          <div className="mt-8">

            <SmartInsights />

          </div>

        </div>

      </main>

    </div>
  );
}