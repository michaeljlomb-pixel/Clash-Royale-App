import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CARDS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import type { Rarity } from "@/types";

export function MetaCardsSection() {
  const topCards = [...CARDS].sort((a, b) => (b.winRate || 0) - (a.winRate || 0)).slice(0, 8);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Meta Cards</h2>
          <p className="text-white/40 text-xs mt-0.5">Highest win-rate cards this season</p>
        </div>
        <Link href="/cards" className="flex items-center gap-1 text-xs text-[#7C4DFF] hover:text-[#BF40FF] transition-colors font-medium">
          View all cards <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {topCards.map(card => (
          <Link key={card.id} href="/cards" className="group">
            <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-3 hover:border-white/18 transition-all duration-200 card-hover text-center">
              <div className="text-3xl mb-2">{card.emoji}</div>
              <div className="text-xs font-semibold text-white/80 mb-1.5 leading-tight truncate">{card.name}</div>
              <Badge variant="rarity" rarity={card.rarity as Rarity} className="text-[9px] px-1.5 py-0.5">
                {card.rarity}
              </Badge>
              <div className="mt-2 text-[11px] font-display font-bold text-emerald-400">{card.winRate}%</div>
              <div className="text-[9px] text-white/25">win rate</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
