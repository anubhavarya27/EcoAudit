import { Sparkles } from "lucide-react";

export default function Badge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-5 py-2 backdrop-blur-xl">

      <Sparkles
        size={16}
        className="text-emerald-400"
      />

      <span className="text-sm font-medium text-emerald-300">
        AI Powered Environmental Intelligence
      </span>

    </div>
  );
}