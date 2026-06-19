import Image from "next/image";
import { cn } from "@/lib/utils";
import { ElixirPip } from "./elixir-pip";
import type { Card } from "@/types";

interface CardChipProps {
  card: Card;
  showElixir?: boolean;
  size?: "sm" | "md";
  className?: string;
}

const rarityBorder: Record<string, string> = {
  Common: "border-[rgba(168,168,184,0.4)]",
  Rare: "border-[rgba(74,144,226,0.5)]",
  Epic: "border-[rgba(191,64,255,0.5)]",
  Legendary: "border-[rgba(255,215,0,0.5)]",
  Champion: "border-[rgba(255,107,53,0.5)]",
};

const rarityGlow: Record<string, string> = {
  Common: "",
  Rare: "shadow-[0_0_10px_rgba(74,144,226,0.2)]",
  Epic: "shadow-[0_0_10px_rgba(191,64,255,0.2)]",
  Legendary: "shadow-[0_0_12px_rgba(255,215,0,0.25)]",
  Champion: "shadow-[0_0_12px_rgba(255,107,53,0.25)]",
};

export function CardChip({ card, showElixir = true, size = "md", className }: CardChipProps) {
  const isSmall = size === "sm";
  return (
    <div className={cn(
      "relative group rounded-lg border bg-[rgba(255,255,255,0.04)] flex flex-col items-center justify-center overflow-hidden",
      "hover:bg-white/8 transition-all duration-200 cursor-pointer",
      rarityBorder[card.rarity],
      rarityGlow[card.rarity],
      isSmall ? "w-12 h-14" : "w-16 h-[76px]",
      className
    )}>
      {card.imageUrl ? (
        <Image
          src={card.imageUrl}
          alt={card.name}
          width={isSmall ? 48 : 64}
          height={isSmall ? 56 : 76}
          className="w-full h-full object-contain p-1"
          unoptimized
        />
      ) : (
        <span className={isSmall ? "text-xl" : "text-3xl"}>{card.emoji}</span>
      )}
      {showElixir && (
        <ElixirPip cost={card.elixirCost} size="sm" className="absolute -bottom-2 -right-2 w-5 h-5 text-[10px]" />
      )}
    </div>
  );
}
