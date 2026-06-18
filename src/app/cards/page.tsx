"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ElixirPip } from "@/components/ui/elixir-pip";
import { Search } from "lucide-react";
import Image from "next/image";
import type { Rarity } from "@/types";

interface ApiCard {
  id: number;
  name: string;
  elixirCost: number;
  iconUrls: { medium: string };
  rarity: string;
}

function normalizeRarity(r: string): Rarity {
  if (r === "legendary") return "Legendary";
  if (r === "epic") return "Epic";
  if (r === "rare") return "Rare";
  if (r === "champion") return "Champion";
  return "Common";
}

function getRarityStyles(rarity: Rarity) {
  if (rarity === "Legendary") return "bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.2)] shadow-[0_0_20px_rgba(255,215,0,0.1)]";
  if (rarity === "Champion") return "bg-[rgba(255,107,53,0.08)] border border-[rgba(255,107,53,0.2)] shadow-[0_0_20px_rgba(255,107,53,0.1)]";
  if (rarity === "Epic") return "bg-[rgba(191,64,255,0.08)] border border-[rgba(191,64,255,0.2)]";
  return "bg-white/4 border border-white/8";
}

export default function CardsPage() {
  const [cards, setCards] = useState<ApiCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");

  useEffect(() => {
    fetch("https://clash-royale-proxy.michaeljlomb.workers.dev/")
      .then(r => r.json())
      .then(data => {
        setCards(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
    const rarity = normalizeRarity(card.rarity);
    const matchesRarity = rarityFilter === "All" || rarity === rarityFilter;
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Card Library</h1>
          <p className="text-white/40 text-sm mt-1">
            {loading ? "Loading cards..." : `${cards.length} cards with meta statistics`}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            placeholder="Search cards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[rgba(124,77,255,0.5)] transition-colors w-48"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "Champion", "Legendary", "Epic", "Rare", "Common"].map(r => (
          <button
            key={r}
            onClick={() => setRarityFilter(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold border transition-all ${
              rarityFilter === r
                ? "bg-[rgba(124,77,255,0.2)] text-[#9B6FFF] border-[rgba(124,77,255,0.4)]"
                : "bg-white/4 text-white/50 border-white/8 hover:bg-white/8"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-4 animate-pulse">
              <div className="w-full aspect-square rounded-xl bg-white/5 mb-3" />
              <div className="h-3 bg-white/5 rounded mb-2" />
              <div className="h-2 bg-white/5 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(card => {
            const rarity = normalizeRarity(card.rarity);
            return (
              <div
                key={card.id}
                className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-4 hover:border-white/18 transition-all duration-200 card-hover cursor-pointer group"
              >
                <div className="relative mb-3">
                  <div className={`w-full aspect-square rounded-xl flex items-center justify-center mb-1 overflow-hidden transition-transform duration-200 group-hover:scale-105 ${getRarityStyles(rarity)}`}>
                    <Image
                      src={card.iconUrls.medium}
                      alt={card.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain p-1"
                      unoptimized
                    />
                  </div>
                  {card.elixirCost && (
                    <ElixirPip cost={card.elixirCost} size="sm" className="absolute -top-2 -right-2" />
                  )}
                </div>

                <div className="text-sm font-display font-bold text-white/90 mb-1.5 leading-tight">
                  {card.name}
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge variant="rarity" rarity={rarity} className="text-[9px]">
                    {rarity}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
