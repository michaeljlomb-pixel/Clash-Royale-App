import { DECKS } from "@/lib/data";
import { CardChip } from "@/components/ui/card-chip";
import { ElixirPip } from "@/components/ui/elixir-pip";
import { formatNumber } from "@/lib/utils";
import { ThumbsUp, Filter, TrendingUp } from "lucide-react";

const archetypeColors: Record<string, string> = {
  Cycle: "text-[#4A90E2] bg-[rgba(74,144,226,0.12)] border-[rgba(74,144,226,0.25)]",
  Beatdown: "text-[#FF6B35] bg-[rgba(255,107,53,0.12)] border-[rgba(255,107,53,0.25)]",
  Control: "text-[#22C55E] bg-[rgba(34,197,94,0.12)] border-[rgba(34,197,94,0.25)]",
  Bait: "text-[#FFD700] bg-[rgba(255,215,0,0.12)] border-[rgba(255,215,0,0.25)]",
  "Bridge Spam": "text-[#BF40FF] bg-[rgba(191,64,255,0.12)] border-[rgba(191,64,255,0.25)]",
  Siege: "text-[#F59E0B] bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.25)]",
};

export default function DecksPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Meta Decks</h1>
          <p className="text-white/40 text-sm mt-1">Season 57 · Updated every hour from top 1% battles</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/6 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#BF40FF] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            <TrendingUp className="w-4 h-4" /> Top Rated
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Cycle", "Beatdown", "Control", "Bait", "Bridge Spam", "Siege"].map(f => (
          <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold border transition-all ${f === "All" ? "bg-[rgba(124,77,255,0.2)] text-[#9B6FFF] border-[rgba(124,77,255,0.4)]" : "bg-white/4 text-white/50 border-white/8 hover:bg-white/8 hover:text-white/80"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Decks grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {DECKS.map((deck, i) => (
          <div key={deck.id} className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-5 hover:border-white/15 transition-all duration-200 card-hover group cursor-pointer">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-display font-bold ${i === 0 ? "bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-black" : "bg-white/8 text-white/50"}`}>
                    {i + 1}
                  </span>
                  <h3 className="font-display font-bold text-white/90 group-hover:text-white transition-colors">{deck.name}</h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-display font-semibold px-2 py-0.5 rounded border ${archetypeColors[deck.archetype]}`}>
                    {deck.archetype}
                  </span>
                  <span className="text-xs text-white/30">by {deck.author}</span>
                  <span className="text-xs text-white/30">·</span>
                  <span className="text-xs text-white/30">{deck.trophyRange} 🏆</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-xl text-emerald-400">{deck.winRate}%</div>
                <div className="text-[10px] text-white/30">win rate</div>
              </div>
            </div>

            {/* Cards */}
            <div className="flex items-center gap-1.5 mb-4 flex-wrap">
              {deck.cards.map(card => (
                <CardChip key={card.id} card={card} size="sm" />
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 text-xs pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <ElixirPip cost={deck.avgElixir} size="sm" />
                <span className="text-white/40">avg elixir</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{formatNumber(deck.votes)}</span>
              </div>
              <button className="ml-auto px-3 py-1 rounded-lg bg-white/6 text-white/50 hover:bg-[rgba(124,77,255,0.15)] hover:text-[#9B6FFF] transition-colors text-xs font-medium border border-white/8">
                Copy Deck
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
