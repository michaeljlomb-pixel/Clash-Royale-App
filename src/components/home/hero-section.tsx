import Link from "next/link";
import { ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-[rgba(11,11,20,0.95)]">
      {/* Bg glow */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Animated orbs */}
      <div className="absolute top-8 right-12 w-64 h-64 rounded-full bg-[rgba(124,77,255,0.08)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-[rgba(255,215,0,0.06)] blur-3xl pointer-events-none" />

      <div className="relative px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(124,77,255,0.15)] border border-[rgba(124,77,255,0.3)] mb-6">
            <Zap className="w-3 h-3 text-[#BF40FF]" />
            <span className="text-xs font-display font-semibold tracking-widest text-[#BF40FF] uppercase">Season 57 Live</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4 text-white">
            Master the<br />
            <span className="text-gradient-gold">Arena.</span>{" "}
            <span className="text-gradient-purple">Dominate</span><br />
            the Ladder.
          </h1>

          <p className="text-white/50 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
            Real-time Clash Royale analytics, meta deck breakdowns, and player stats. 
            Find what&apos;s winning and climb to Ultimate Champion.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/decks" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C4DFF] to-[#BF40FF] text-white font-display font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_24px_rgba(124,77,255,0.4)]">
              Browse Meta Decks <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/profile" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 border border-white/12 text-white/80 font-display font-semibold text-sm hover:bg-white/12 transition-colors">
              Search Player
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { icon: TrendingUp, text: "Live win rates" },
              { icon: Shield, text: "Deck counters" },
              { icon: Zap, text: "Fast & free" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-white/40">
                <Icon className="w-3.5 h-3.5 text-white/30" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Floating card display */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 items-end">
          {[
            { emoji: "👑", name: "Little Prince", rarity: "Champion", elixir: 3 },
            { emoji: "🐦‍🔥", name: "Phoenix", rarity: "Legendary", elixir: 4 },
            { emoji: "🐗", name: "Hog Rider", rarity: "Rare", elixir: 4 },
          ].map((card, i) => (
            <div key={card.name} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border bg-[rgba(255,255,255,0.04)] backdrop-blur-sm transition-transform duration-500 ${i === 1 ? "translate-x-0" : i === 0 ? "translate-x-4" : "translate-x-4"}`}
              style={{ borderColor: card.rarity === "Champion" ? "rgba(255,107,53,0.4)" : card.rarity === "Legendary" ? "rgba(255,215,0,0.4)" : "rgba(74,144,226,0.3)" }}>
              <span className="text-2xl">{card.emoji}</span>
              <div>
                <div className="text-xs font-semibold text-white/80">{card.name}</div>
                <div className="text-[10px]" style={{ color: card.rarity === "Champion" ? "#FF6B35" : card.rarity === "Legendary" ? "#FFD700" : "#4A90E2" }}>{card.rarity}</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BF40FF] to-[#7C4DFF] flex items-center justify-center text-[10px] font-bold">
                {card.elixir}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
