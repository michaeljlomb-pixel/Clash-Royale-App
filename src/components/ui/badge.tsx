import { cn } from "@/lib/utils";
import type { Rarity } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "rarity" | "archetype" | "outline";
  rarity?: Rarity;
  className?: string;
}

const rarityStyles: Record<Rarity, string> = {
  Common: "bg-[rgba(168,168,184,0.15)] text-[#A8A8B8] border border-[rgba(168,168,184,0.3)]",
  Rare: "bg-[rgba(74,144,226,0.15)] text-[#4A90E2] border border-[rgba(74,144,226,0.3)]",
  Epic: "bg-[rgba(191,64,255,0.15)] text-[#BF40FF] border border-[rgba(191,64,255,0.3)]",
  Legendary: "bg-[rgba(255,215,0,0.15)] text-[#FFD700] border border-[rgba(255,215,0,0.3)]",
  Champion: "bg-[rgba(255,107,53,0.15)] text-[#FF6B35] border border-[rgba(255,107,53,0.3)]",
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
