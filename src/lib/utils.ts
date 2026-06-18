import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    Common: "#A8A8B8",
    Rare: "#4A90E2",
    Epic: "#BF40FF",
    Legendary: "#FFD700",
    Champion: "#FF6B35",
  };
  return colors[rarity] || "#A8A8B8";
}
