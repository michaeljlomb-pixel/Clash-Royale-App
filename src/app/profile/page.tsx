import { SAMPLE_PLAYER, DECKS } from "@/lib/data";
import { StatCard } from "@/components/ui/stat-card";
import { CardChip } from "@/components/ui/card-chip";
import { ElixirPip } from "@/components/ui/elixir-pip";
import { formatNumber } from "@/lib/utils";
import { Shield, Trophy, Swords, Star, Users, Copy } from "lucide-react";

export default function ProfilePage() {
  const player = SAMPLE_PLAYER;
  const winRate = ((player.wins / (player.wins + player.losses)) * 100).toFixed(1);
  const topDeck = DECKS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile hero */}
      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[rgba(11,11,20,0.95)]">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#7C4DFF] to-[#BF40FF] flex items-center justify-center font-display font-bold text-3xl sm:text-4xl shadow-[0_0_30px_rgba(124,77,255,0.5)]">
                {player.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FF8C00] flex items-center justify-center text-black font-display font-bold text-xs shadow-[0_0_12px_rgba(255,215,0,0.4)]">
                {player.level}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-3 mb-1">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{player.name}</h1>
                {player.rank && (
                  <span className="px-2.5 py-1 rounded-lg bg-[rgba(255,215,0,0.12)] border border-[rgba(255,215,0,0.25)] text-[#FFD700] text-xs font-display font-bold">
                    🏆 Rank #{formatNumber(player.rank)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                <button className="text-sm text-white/40 hover:text-white/70 transition-colors font-mono flex items-center gap-1.5 group">
                  {player.tag}
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              {player.clan && (
                <div className="flex items-center gap-1.5 text-sm text-white/50">
                  <Users className="w-4 h-4 text-white/30" />
                  <span>{player.clan}</span>
                  {player.role && <span className="text-white/25">· {player.role}</span>}
                </div>
              )}
            </div>

            {/* Arena badge */}
            <div className="flex-shrink-0 text-center px-4 py-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">🏟️</div>
              <div className="text-xs font-display font-bold text-white/80">{player.arena}</div>
              <div className="text-[10px] text-white/30 mt-0.5">Current Arena</div>
            </div>
          </div>

          {/* Trophy bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
              <div className="font-display text-2xl font-bold text-[#FFD700]">{formatNumber(player.trophies)}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest">Current Trophies</div>
              <div className="text-xs text-white/25">Best: {formatNumber(player.bestTrophies)}</div>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
              <div className="font-display text-2xl font-bold text-emerald-400">{winRate}%</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest">Win Rate</div>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
              <div className="font-display text-2xl font-bold text-white/90">{formatNumber(player.wins)}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest">Battles Won</div>
            </div>
            <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/4 border border-white/8">
              <div className="font-display text-2xl font-bold text-[#BF40FF]">{formatNumber(player.starPoints)}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest">Star Points</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cards collection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-5">
            <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#7C4DFF]" /> Card Collection
            </h2>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {player.cards.map(card => (
                <CardChip key={card.id} card={card} size="sm" />
              ))}
              {/* Placeholder locked cards */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`locked-${i}`} className="w-12 h-14 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-white/15 text-lg">
                  🔒
                </div>
              ))}
            </div>
          </div>

          {/* Recent battles */}
          <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-5">
            <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Swords className="w-4 h-4 text-[#4078FF]" /> Recent Battles
            </h2>
            <div className="space-y-2">
              {[
                { result: "W", crown: "3-0", opp: "IceCrown", trophies: "+28", deck: topDeck },
                { result: "W", crown: "3-1", opp: "ShadowBlade", trophies: "+26", deck: DECKS[1] },
                { result: "L", crown: "1-3", opp: "ElixirGod", trophies: "-27", deck: DECKS[2] },
                { result: "W", crown: "3-2", opp: "NightFury", trophies: "+29", deck: topDeck },
                { result: "W", crown: "3-0", opp: "VortexKing", trophies: "+25", deck: DECKS[1] },
              ].map((battle, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-colors">
                  <div className={`w-8 h-8 rounded-lg font-display font-bold text-sm flex items-center justify-center flex-shrink-0 ${battle.result === "W" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                    {battle.result}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/60">vs</span>
                      <span className="text-xs font-semibold text-white/80">{battle.opp}</span>
                      <span className="text-xs text-white/40">{battle.crown}</span>
                    </div>
                    <div className="flex gap-0.5 mt-1">
                      {battle.deck.cards.slice(0, 4).map(c => (
                        <span key={c.id} className="text-xs">{c.emoji}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`text-sm font-display font-bold flex-shrink-0 ${battle.result === "W" ? "text-emerald-400" : "text-red-400"}`}>
                    {battle.trophies}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Favorite card */}
          {player.favoriteCard && (
            <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-5">
              <h2 className="font-display text-base font-bold text-white mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFD700]" /> Favourite Card
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[rgba(74,144,226,0.1)] border border-[rgba(74,144,226,0.25)] flex items-center justify-center text-4xl">
                  {player.favoriteCard.emoji}
                </div>
                <div>
                  <div className="font-display font-bold text-white">{player.favoriteCard.name}</div>
                  <div className="text-[#4A90E2] text-xs">{player.favoriteCard.rarity}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <ElixirPip cost={player.favoriteCard.elixirCost} size="sm" />
                    <span className="text-xs text-white/40">elixir</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick stats */}
          <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFD700]" /> Achievements
            </h2>
            {[
              { icon: "🏆", label: "Reached Ultimate Champion", sub: "Season 54" },
              { icon: "⚔️", label: "15,000 Wins", sub: "Veteran milestone" },
              { icon: "🃏", label: "Max Level Cards", sub: "72 / 109 cards" },
              { icon: "👑", label: "Top 1,000 Global", sub: "Season 56" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="text-sm text-white/80 font-medium">{a.label}</div>
                  <div className="text-xs text-white/35">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
