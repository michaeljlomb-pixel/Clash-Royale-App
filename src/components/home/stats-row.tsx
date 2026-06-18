import { StatCard } from "@/components/ui/stat-card";

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Active Players" value="312.4K" icon="👥" color="blue" trend="up" trendValue="8.2% this season" />
      <StatCard label="Decks Tracked" value="1.8M" icon="📊" color="purple" trend="up" trendValue="14K today" />
      <StatCard label="Cards in Meta" value="109" icon="🃏" color="gold" />
      <StatCard label="Battles Today" value="9.4M" icon="⚔️" color="default" trend="up" trendValue="vs yesterday" />
    </div>
  );
}
