import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "gold" | "purple" | "blue" | "green" | "default";
  className?: string;
}

const colorMap = {
  gold: "text-[#FFD700]",
  purple: "text-[#BF40FF]",
  blue: "text-[#4078FF]",
  green: "text-[#22C55E]",
  default: "text-white",
};

export function StatCard({ label, value, icon, trend, trendValue, color = "default", className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-[rgba(16,16,28,0.95)] border border-white/8 rounded-xl p-4",
      "hover:border-white/15 transition-colors duration-200",
      className
    )}>
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className={cn("font-display text-2xl font-bold mb-0.5", colorMap[color])}>{value}</div>
      <div className="text-white/50 text-xs font-medium uppercase tracking-widest">{label}</div>
      {trend && trendValue && (
        <div className={cn("text-xs mt-1.5 font-medium", trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-white/40")}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"} {trendValue}
        </div>
      )}
    </div>
  );
}
