import { LEADERBOARD } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Crown, Globe } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Global Leaderboard</h1>
          <p className="text-white/40 text-sm mt-1">Top players by trophy count · Season 57</p>
        </div>
        <div className="flex items-center gap-2">
          {["Global", "Regional", "Clan"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold border transition-all ${i === 0 ? "bg-[rgba(124,77,255,0.2)] text-[#9B6FFF] border-[rgba(124,77,255,0.4)]" : "bg-white/4 text-white/50 border-white/8"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 0, 2].map((idx) => {
          const entry = LEADERBOARD[idx];
          const pos = idx + 1;
          return (
            <div key={entry.rank} className={`relative rounded-2xl border p-4 sm:p-6 text-center transition-all duration-200 card-hover cursor-pointer ${pos === 1 ? "bg-[rgba(255,215,0,0.06)] border-[rgba(255,215,0,0.2)] glow-gold order-2 sm:order-none" : pos === 2 ? "bg-[rgba(192,192,210,0.04)] border-[rgba(192,192,210,0.15)] order-1 sm:order-none mt-4" : "bg-[rgba(205,127,50,0.04)] border-[rgba(205,127,50,0.15)] order-3 sm:order-none mt-4"}`}>
              {pos === 1 && <Crown className="w-5 h-5 text-[#FFD700] mx-auto mb-2 animate-pulse-slow" />}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto flex items-center justify-center font-display font-bold text-lg sm:text-xl mb-2 sm:mb-3
                ${pos === 1 ? "bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-black shadow-[0_0_24px_rgba(255,215,0,0.4)]" :
                  pos === 2 ? "bg-gradient-to-br from-[#C0C0D2] to-[#808090] text-black" :
                  "bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white"}`}>
                {entry.player.name.slice(0, 2).toUpperCase()}
              </div>
              <div className={`text-xs font-display font-bold mb-0.5 ${pos === 1 ? "text-[#FFD700]" : pos === 2 ? "text-[#C0C0D2]" : "text-[#CD7F32]"}`}>
                #{pos}
              </div>
              <div className="font-display font-bold text-white text-sm sm:text-base truncate">{entry.player.name}</div>
              <div className="text-white/40 text-[10px] sm:text-xs mb-2">{entry.player.tag}</div>
              <div className="font-display font-bold text-lg sm:text-xl text-white">{formatNumber(entry.player.trophies)}</div>
              <div className="text-white/30 text-[10px]">trophies</div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/6 text-[10px] font-display font-bold uppercase tracking-widest text-white/25">
          <div>#</div>
          <div>Player</div>
          <div className="hidden sm:block text-right">W/L</div>
          <div className="hidden sm:block text-right">Level</div>
          <div className="text-right">Trophies</div>
        </div>
        {LEADERBOARD.map((entry) => {
          const rankChange = entry.previousRank != null ? entry.previousRank - entry.rank : 0;
          return (
            <div key={entry.rank} className="grid grid-cols-[40px_1fr_auto_auto_auto] gap-4 px-5 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer items-center last:border-0">
              <div className={`font-display font-bold text-sm ${entry.rank === 1 ? "text-[#FFD700]" : entry.rank === 2 ? "text-[#C0C0D2]" : entry.rank === 3 ? "text-[#CD7F32]" : "text-white/30"}`}>
                {entry.rank}
              </div>
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${entry.rank <= 3 ? "bg-gradient-to-br from-[#7C4DFF] to-[#4078FF]" : "bg-white/8"}`}>
                  {entry.player.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white/90 text-sm truncate">{entry.player.name}</div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-2.5 h-2.5 text-white/20" />
                    <span className="text-[10px] text-white/30 truncate">{entry.player.tag}</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <div className="text-xs text-white/50">{formatNumber(entry.player.wins)}W</div>
                <div className="text-[10px] text-white/25">{formatNumber(entry.player.losses)}L</div>
              </div>
              <div className="hidden sm:flex items-center justify-end">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#7C4DFF] to-[#BF40FF] flex items-center justify-center text-xs font-bold">
                  {entry.player.level}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-white/90">{formatNumber(entry.player.trophies)}</div>
                <div className="flex items-center justify-end gap-0.5 text-[10px]">
                  {rankChange > 0 ? <TrendingUp className="w-3 h-3 text-emerald-400" /> : rankChange < 0 ? <TrendingDown className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3 text-white/20" />}
                  <span className={rankChange > 0 ? "text-emerald-400" : rankChange < 0 ? "text-red-400" : "text-white/20"}>
                    {rankChange === 0 ? "–" : Math.abs(rankChange)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
