import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LEADERBOARD } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export function TopPlayersSection() {
  const top5 = LEADERBOARD.slice(0, 5);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Top Players</h2>
          <p className="text-white/40 text-xs mt-0.5">Global leaderboard</p>
        </div>
        <Link href="/leaderboard" className="flex items-center gap-1 text-xs text-[#7C4DFF] hover:text-[#BF40FF] transition-colors font-medium">
          Full list <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl divide-y divide-white/5 overflow-hidden">
        {top5.map((entry, i) => {
          const rankChange = entry.previousRank != null ? entry.previousRank - entry.rank : 0;
          return (
            <Link key={entry.rank} href="/leaderboard" className="flex items-center gap-3 px-4 py-3 hover:bg-white/4 transition-colors group">
              {/* Rank */}
              <div className={`w-6 text-center font-display font-bold text-sm flex-shrink-0 ${i === 0 ? "text-[#FFD700]" : i === 1 ? "text-[#C0C0D2]" : i === 2 ? "text-[#CD7F32]" : "text-white/30"}`}>
                {i === 0 ? "👑" : entry.rank}
              </div>

              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${i === 0 ? "bg-gradient-to-br from-[#FFD700] to-[#FF8C00]" : "bg-gradient-to-br from-[#7C4DFF] to-[#4078FF]"}`}
                style={{ color: i === 0 ? "#000" : "#fff" }}>
                {entry.player.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white/90 text-sm truncate group-hover:text-white transition-colors">{entry.player.name}</div>
                <div className="text-[10px] text-white/30 truncate">{entry.player.tag}</div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="font-display font-bold text-sm text-white/90">{formatNumber(entry.player.trophies)}</div>
                <div className="flex items-center justify-end gap-0.5 text-[10px]">
                  {rankChange > 0 ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : rankChange < 0 ? <TrendingDown className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3 text-white/20" />}
                  <span className={rankChange > 0 ? "text-emerald-400" : rankChange < 0 ? "text-red-400" : "text-white/20"}>
                    {rankChange === 0 ? "–" : Math.abs(rankChange)}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
