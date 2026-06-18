import Link from "next/link";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { DECKS } from "@/lib/data";
import { CardChip } from "@/components/ui/card-chip";
import { ElixirPip } from "@/components/ui/elixir-pip";
import { formatNumber } from "@/lib/utils";

const archetypeColor: Record<string, string> = {
  Cycle: "text-[#4A90E2] bg-[rgba(74,144,226,0.12)] border-[rgba(74,144,226,0.25)]",
  Beatdown: "text-[#FF6B35] bg-[rgba(255,107,53,0.12)] border-[rgba(255,107,53,0.25)]",
  Control: "text-[#22C55E] bg-[rgba(34,197,94,0.12)] border-[rgba(34,197,94,0.25)]",
  Bait: "text-[#FFD700] bg-[rgba(255,215,0,0.12)] border-[rgba(255,215,0,0.25)]",
  "Bridge Spam": "text-[#BF40FF] bg-[rgba(191,64,255,0.12)] border-[rgba(191,64,255,0.25)]",
  Siege: "text-[#F59E0B] bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.25)]",
};

export function TopDecksSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Top Meta Decks</h2>
          <p className="text-white/40 text-xs mt-0.5">Updated every hour · Season 57</p>
        </div>
        <Link href="/decks" className="flex items-center gap-1 text-xs text-[#7C4DFF] hover:text-[#BF40FF] transition-colors font-medium">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {DECKS.slice(0, 4).map((deck, i) => (
          <Link key={deck.id} href={`/decks`} className="block group">
            <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-4 hover:border-white/15 transition-all duration-200 card-hover">
              <div className="flex items-start gap-3">
                {/* Rank */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${i === 0 ? "bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-black" : i === 1 ? "bg-white/10 text-white/70" : "bg-white/6 text-white/40"}`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-display font-semibold text-white/90 text-sm">{deck.name}</span>
                    <span className={`text-[10px] font-display font-semibold px-1.5 py-0.5 rounded border ${archetypeColor[deck.archetype]}`}>
                      {deck.archetype}
                    </span>
                  </div>
                  {/* Cards row */}
                  <div className="flex items-center gap-1 mb-3 flex-wrap">
                    {deck.cards.map(card => (
                      <CardChip key={card.id} card={card} size="sm" showElixir={false} />
                    ))}
                  </div>
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <ElixirPip cost={deck.avgElixir} size="sm" />
                      <span className="text-white/40">avg elixir</span>
                    </div>
                    <div>
                      <span className="text-emerald-400 font-semibold">{deck.winRate}%</span>
                      <span className="text-white/30 ml-1">win rate</span>
                    </div>
                    <div className="text-white/30">{deck.trophyRange} 🏆</div>
                    <div className="flex items-center gap-1 text-white/30">
                      <ThumbsUp className="w-3 h-3" />
                      {formatNumber(deck.votes)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
