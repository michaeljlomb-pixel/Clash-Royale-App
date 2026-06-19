"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Globe, Users, Trophy, Search, Swords, Star } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const WORKER = "https://clash-royale-proxy.michaeljlomb.workers.dev";

const TOP_COUNTRIES = [
  { id: "57000249", name: "🇺🇸 United States" },
  { id: "57000248", name: "🇬🇧 United Kingdom" },
  { id: "57000087", name: "🇫🇷 France" },
  { id: "57000094", name: "🇩🇪 Germany" },
  { id: "57000038", name: "🇧🇷 Brazil" },
  { id: "57000218", name: "🇪🇸 Spain" },
  { id: "57000153", name: "🇲🇽 Mexico" },
  { id: "57000120", name: "🇮🇹 Italy" },
  { id: "57000239", name: "🇹🇷 Turkey" },
  { id: "57000122", name: "🇯🇵 Japan" },
  { id: "57000216", name: "🇰🇷 South Korea" },
  { id: "57000113", name: "🇮🇳 India" },
  { id: "57000193", name: "🇷🇺 Russia" },
  { id: "57000047", name: "🇨🇦 Canada" },
  { id: "57000055", name: "🇨🇱 Chile" },
  { id: "57000017", name: "🇦🇷 Argentina" },
  { id: "57000059", name: "🇨🇴 Colombia" },
  { id: "57000184", name: "🇵🇪 Peru" },
  { id: "57000204", name: "🇸🇦 Saudi Arabia" },
  { id: "57000077", name: "🇪🇬 Egypt" },
];

type Tab = "clanscore" | "clanwars" | "clanrating" | "players";

interface ClanEntry {
  rank: number;
  previousRank: number;
  tag: string;
  name: string;
  clanScore?: number;
  clanWarTrophies?: number;
  clanRating?: number;
  members: number;
  location: { name: string; countryCode?: string };
}

interface PlayerEntry {
  rank: number;
  previousRank: number;
  tag: string;
  name: string;
  trophies: number;
  clan?: { name: string };
}

const TAB_CONFIG: Record<Tab, { label: string; icon: React.ReactNode; endpoint: string; scoreKey: string; scoreLabel: string; description: string }> = {
  clanscore: {
    label: "Clan Score",
    icon: <Trophy className="w-4 h-4" />,
    endpoint: "/leaderboard/clans",
    scoreKey: "clanScore",
    scoreLabel: "Clan Score",
    description: "Ranked by weighted trophy score of all members",
  },
  clanwars: {
    label: "Clan Wars",
    icon: <Swords className="w-4 h-4" />,
    endpoint: "/leaderboard/clanwars",
    scoreKey: "clanWarTrophies",
    scoreLabel: "War Trophies",
    description: "Ranked by Clan Wars medal count",
  },
  clanrating: {
    label: "Clan Rating",
    icon: <Star className="w-4 h-4" />,
    endpoint: "/leaderboard/clanrating",
    scoreKey: "clanRating",
    scoreLabel: "Rating",
    description: "Ranked by combined Ultimate Champion rating",
  },
  players: {
    label: "Players",
    icon: <Users className="w-4 h-4" />,
    endpoint: "",
    scoreKey: "trophies",
    scoreLabel: "Trophies",
    description: "Top players by trophy count per country",
  },
};

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("clanscore");
  const [selectedCountry, setSelectedCountry] = useState(TOP_COUNTRIES[0]);
  const [data, setData] = useState<(ClanEntry | PlayerEntry)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData([]);

    const url = tab === "players"
      ? `${WORKER}/leaderboard/players/${selectedCountry.id}`
      : `${WORKER}${TAB_CONFIG[tab].endpoint}`;

    fetch(url)
      .then(r => r.json())
      .then(d => {
        if (d.error) {
          setError("This leaderboard isn't available from the official API yet.");
        } else {
          setData(d.items || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load leaderboard.");
        setLoading(false);
      });
  }, [tab, selectedCountry]);

  const filtered = data.filter((e: any) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const getScore = (entry: any) => {
    if (tab === "players") return entry.trophies;
    if (tab === "clanscore") return entry.clanScore;
    if (tab === "clanwars") return entry.clanWarTrophies;
    if (tab === "clanrating") return entry.clanRating;
    return 0;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-black";
    if (rank === 2) return "bg-gradient-to-br from-[#C0C0D2] to-[#808090] text-black";
    if (rank === 3) return "bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white";
    return "bg-white/8 text-white/50";
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-[#FFD700]";
    if (rank === 2) return "text-[#C0C0D2]";
    if (rank === 3) return "text-[#CD7F32]";
    return "text-white/30";
  };

  const RankChange = ({ curr, prev }: { curr: number; prev: number }) => {
    const diff = prev - curr;
    if (diff > 0) return <span className="flex items-center gap-0.5 text-emerald-400 text-[10px]"><TrendingUp className="w-2.5 h-2.5" />{diff}</span>;
    if (diff < 0) return <span className="flex items-center gap-0.5 text-red-400 text-[10px]"><TrendingDown className="w-2.5 h-2.5" />{Math.abs(diff)}</span>;
    return <span className="text-white/20 text-[10px]"><Minus className="w-2.5 h-2.5" /></span>;
  };

  const top3 = filtered.slice(0, 3);
  const podiumOrder = [1, 0, 2]; // silver, gold, bronze

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Leaderboard</h1>
          <p className="text-white/40 text-sm mt-1">{TAB_CONFIG[tab].description}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[rgba(124,77,255,0.5)] transition-colors w-44"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(TAB_CONFIG) as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-semibold border transition-all ${tab === t ? "bg-[rgba(124,77,255,0.2)] text-[#9B6FFF] border-[rgba(124,77,255,0.4)]" : "bg-white/4 text-white/50 border-white/8 hover:bg-white/8"}`}
          >
            {TAB_CONFIG[t].icon}
            {TAB_CONFIG[t].label}
          </button>
        ))}
      </div>

      {/* Country selector */}
      {tab === "players" && (
        <div className="flex gap-2 flex-wrap">
          {TOP_COUNTRIES.map(country => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold border transition-all ${selectedCountry.id === country.id ? "bg-[rgba(124,77,255,0.2)] text-[#9B6FFF] border-[rgba(124,77,255,0.4)]" : "bg-white/4 text-white/50 border-white/8 hover:bg-white/8"}`}
            >
              {country.name}
            </button>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-[rgba(239,68,68,0.08)] border border-red-500/20 rounded-xl p-6 text-center">
          <div className="text-red-400 font-display font-bold mb-1">Not Available</div>
          <div className="text-white/40 text-sm">{error}</div>
        </div>
      )}

      {/* Podium */}
      {!loading && !error && top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-3">
          {podiumOrder.map(idx => {
            const entry = top3[idx] as any;
            if (!entry) return null;
            const rank = entry.rank;
            return (
              <div key={rank} className={`rounded-2xl border p-4 text-center card-hover cursor-pointer transition-all ${rank === 1 ? "bg-[rgba(255,215,0,0.06)] border-[rgba(255,215,0,0.2)] glow-gold" : "bg-[rgba(16,16,28,0.95)] border-white/8"}`}>
                {rank === 1 && <Trophy className="w-5 h-5 text-[#FFD700] mx-auto mb-1" />}
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center font-display font-bold text-lg mb-2 ${getRankBg(rank)}`}>
                  {rank}
                </div>
                <div className="font-display font-bold text-white text-sm truncate">{entry.name}</div>
                {entry.location && <div className="text-white/40 text-[10px] mb-1">{entry.location.name}</div>}
                {entry.tag && !entry.location && <div className="text-white/40 text-[10px] mb-1">{entry.tag}</div>}
                <div className="font-display font-bold text-lg text-white">{formatNumber(getScore(entry) || 0)}</div>
                <div className="text-white/30 text-[10px]">{TAB_CONFIG[tab].scoreLabel}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table */}
      <div className="bg-[rgba(16,16,28,0.95)] border border-white/7 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[48px_1fr_auto_auto] gap-4 px-5 py-3 border-b border-white/6 text-[10px] font-display font-bold uppercase tracking-widest text-white/25">
          <div>#</div>
          <div>{tab === "players" ? "Player" : "Clan"}</div>
          <div className="hidden sm:block text-right">{tab === "players" ? "Clan" : "Location"}</div>
          <div className="text-right">{TAB_CONFIG[tab].scoreLabel}</div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-white/40 text-sm">Loading leaderboard...</div>
        ) : error ? (
          <div className="p-8 text-center text-white/25 text-sm">No data available</div>
        ) : (
          <div>
            {filtered.slice(0, 200).map((entry: any) => (
              <div key={entry.tag} className="grid grid-cols-[48px_1fr_auto_auto] gap-4 px-5 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors cursor-pointer items-center last:border-0">
                <div className={`font-display font-bold text-sm ${getRankColor(entry.rank)}`}>
                  {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : entry.rank}
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0 ${getRankBg(entry.rank)}`}>
                    {entry.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white/90 text-sm truncate">{entry.name}</div>
                    <div className="text-[10px] text-white/30 truncate">{entry.tag}</div>
                  </div>
                </div>
                <div className="hidden sm:block text-right text-[10px] text-white/40 truncate max-w-[100px]">
                  {entry.location?.name || entry.clan?.name || "—"}
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-white/90 text-sm">{formatNumber(getScore(entry) || 0)}</div>
                  <RankChange curr={entry.rank} prev={entry.previousRank} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
