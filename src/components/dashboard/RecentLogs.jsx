import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function RecentLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "wasteReports"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLogs(reports);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Recent Logs
        </h2>

        <button className="text-sm text-green-500 hover:text-green-400">
          View All
        </button>
      </div>

      <table className="w-full">

        <thead className="border-b border-[#30363D] text-left text-gray-400">
          <tr>
            <th className="pb-3">ID</th>
            <th className="pb-3">Reported By</th>
<th className="pb-3">Category</th>
            <th className="pb-3">Weight</th>
            <th className="pb-3">Community</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>

        <tbody>

          {logs.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="py-8 text-center text-gray-400"
              >
                No waste reports found.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log.id}
                className="border-b border-[#21262D] hover:bg-[#1C2128]"
              >
                <td className="py-4">
                  {log.id.slice(0, 6)}
                </td>

                <td>{log.username}</td>
<td>{log.category}</td>

                <td>{log.weight} kg</td>

                <td>{log.community}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      log.status === "Verified"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}