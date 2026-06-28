export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/[0.05]
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(0,255,140,.08)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}