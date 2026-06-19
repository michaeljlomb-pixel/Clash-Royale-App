"use client";

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

export function CardChip({ card, showElixir = true, size = "md", className }: CardChipProps) {
  const isSmall = size === "sm";

  const borderClass =
    card.rarity === "Legendary"
      ? "legendary-border"
      : card.rarity === "Champion"
      ? "border-[rgba(255,215,0,0.6)] shadow-[0_0_12px_rgba(255,215,0,0.3)]"
      : card.rarity === "Epic"
      ? "border-[rgba(191,64,255,0.5)] shadow-[0_0_10px_rgba(191,64,255,0.2)]"
      : card.rarity === "Rare"
      ? "border-[rgba(255,140,30,0.6)] shadow-[0_0_10px_rgba(255,140,30,0.2)]"
      : "border-[rgba(64,144,255,0.5)] shadow-[0_0_8px_rgba(64,144,255,0.15)]";

  return (
    <div className={cn(
      "relative group rounded-lg border bg-[rgba(255,255,255,0.04)] flex flex-col items-center justify-center overflow-hidden",
      "hover:bg-white/8 transition-all duration-200 cursor-pointer",
      borderClass,
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
