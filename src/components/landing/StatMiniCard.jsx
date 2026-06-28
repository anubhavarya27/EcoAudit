import {
  Leaf,
  MapPin,
  Activity,
  TrendingUp,
} from "lucide-react";

const icons = {
  leaf: Leaf,
  map: MapPin,
  activity: Activity,
  chart: TrendingUp,
};

export default function StatMiniCard({
  title,
  value,
  icon,
  color,
}) {
  const Icon = icons[icon];

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.04] p-6 transition hover:scale-[1.03] hover:bg-white/[0.07]">

      <Icon className={`${color} mb-5`} />

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="mt-2 text-5xl font-bold">
        {value}
      </h2>

    </div>
  );
}