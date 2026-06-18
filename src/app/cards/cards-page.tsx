import { fetchCards } from "@/lib/clash-api";
import { CARDS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ElixirPip } from "@/components/ui/elixir-pip";
import { Search } from "lucide-react";
import Image from "next/image";
import type { Rarity } from "@/types";

function normalizeRarity(r: string): Rarity {
  if (r === "legendary") return "Legendary";
  if (r === "epic") return "Epic";
  if (r === "rare") return "Rare";
  if (r === "champion") return "Champion";
  return "Common";
}

export default async function CardsPage() {
  let apiCards: Awaited<ReturnType<typeof fetchCards>> = [];
  try {
    apiCards = await fetchCards();
  } catch (e) {
    console.error("Failed to fetch cards from API:", e);
  }

  const cards = CARDS.map(localCard => {
    const apiMatch = apiCards.find(
      a => a.name.toLowerCase() === localCard.name.toLowerCase()
    );
    return {
      ...localCard,
      imageUrl: apiMatch?.iconUrls?.medium ?? null,
      rarity: apiMatch ? normalizeRarity(apiMatch.rarity) : localCard.rarity,
      elixirCost: apiMatch?.elixirCost ?? localCard.elixirCost,
    };
  });

  const sorted = [...cards].sort((a, b) => (b.usageRate || 0) - (a.usageRate || 0));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Card Library</h1>
          <p className="text-white/40 text-sm mt-1">All cards with meta statistics</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            placeholder="Search cards..."
            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[rgba(124,77,255,0.5)] transition-colors w-48"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "Champion", "Legendary", "Epic", "Rare", "Common"].map(r => (
          <button
            key={r}
            className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold border transition-all ${
              r === "All"
                ? "bg-[rgba(124,77,255,0.2)] text-[#9B6FFF] border-[rgba(124,77,255,0.4)]"
                : "bg-white/4 text-white/50 border-white/8 hover:bg-white/8"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {sorted.map(card => (
          <div
            key={card.id}
            className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-4 hover:border-white/18 transition-all duration-200 card-hover cursor-pointer group"
          >
            <div className="relative mb-3">
              <div
                className={`w-full aspect-square rounded-xl flex items-center justify-center mb-1 overflow-hidden transition-transform duration-200 group-hover:scale-105
                  ${card.rarity === "Legendary"
                    ? "bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                    : card.rarity === "Champion"
                    ? "bg-[rgba(255,107,53,0.08)] border border-[rgba(255,107,53,0.2)] shadow-[0_0_20px_rgba(255,107,53,0.1)]"
                    : card.rarity === "Epic"
                    ? "bg-[rgba(191,64,255,0.08)] border border-[rgba(191,64,255,0.2)]"
                    : "bg-white/4 border border-white/8"}`}
              >
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-contain p-1"
                    unoptimized
                  />
                ) : (
                  <span className="text-5xl">{card.emoji}</span>
                )}
              </div>
              <ElixirPip cost={card.elixirCost} size="sm" className="absolute -top-2 -right-2" />
            </div>

            <div className="text-sm font-display font-bold text-white/90 mb-1.5 leading-tight">
              {card.name}
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="rarity" rarity={card.rarity as Rarity} className="text-[9px]">
                {card.rarity}
              </Badge>
              <span className="text-[10px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded">
                {card.type}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-white/35">Win Rate</span>
                <span className="text-emerald-400 font-semibold">{card.winRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/35">Usage</span>
                <span className="text-[#4A90E2] font-semibold">{card.usageRate}%</span>
              </div>
              <div className="h-1 rounded-full bg-white/8 mt-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#4A90E2] to-[#BF40FF]"
                  style={{ width: `${Math.min(100, (card.usageRate || 0) * 4)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
