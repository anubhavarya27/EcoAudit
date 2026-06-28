import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import WasteForm from "../components/log/WasteForm";

export default function LogWaste() {
  return (
    <div className="flex h-screen bg-[#0D1117] text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">

        <Header />

        <main className="flex-1 p-10">
          <h1 className="text-4xl font-bold">
            Log Waste
          </h1>

          <p className="mt-2 text-gray-400">
            Report waste collected in your community.
          </p>

          <div className="mt-10">
            <WasteForm />
          </div>

        </main>

      </div>

    </div>
  );
}  