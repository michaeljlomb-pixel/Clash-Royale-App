import { cn } from "@/lib/utils";
import type { Rarity } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "rarity" | "archetype" | "outline";
  rarity?: Rarity;
  className?: string;
}

const rarityStyles: Record<Rarity, string> = {
  Common: "bg-[rgba(64,144,255,0.15)] text-[#4090FF] border border-[rgba(64,144,255,0.3)]",
  Rare: "bg-[rgba(255,140,30,0.15)] text-[#FF8C1E] border border-[rgba(255,140,30,0.3)]",
  Epic: "bg-[rgba(191,64,255,0.15)] text-[#BF40FF] border border-[rgba(191,64,255,0.3)]",
  Legendary: "bg-[rgba(80,220,140,0.12)] text-[#50DC8C] border border-[rgba(180,130,255,0.4)]",
  Champion: "bg-[rgba(255,215,0,0.15)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]",
};

export function Badge({ children, variant = "default", rarity, className }: BadgeProps) {
  const base = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium font-display tracking-wide";
  
  if (variant === "rarity" && rarity) {
    return <span className={cn(base, rarityStyles[rarity], className)}>{children}</span>;
  }
  
  return (
    <span className={cn(base, "bg-white/10 text-white/70 border border-white/10", className)}>
      {children}
    </span>
  );
}
