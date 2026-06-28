import {
  Trash2,
  Leaf,
  Cpu,
} from "lucide-react";

const logs = [
  {
    icon: Trash2,
    title: "Plastic Waste",
    weight: "2.4 kg",
    time: "2 mins ago",
  },
  {
    icon: Leaf,
    title: "Organic Waste",
    weight: "4.1 kg",
    time: "8 mins ago",
  },
  {
    icon: Cpu,
    title: "E-Waste",
    weight: "1.2 kg",
    time: "15 mins ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {logs.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[#21262D] p-3">
                  <Icon size={18} />
                </div>

                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-400">
                    {item.weight}
                  </p>
                </div>
              </div>

              <span className="text-sm text-gray-500">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}