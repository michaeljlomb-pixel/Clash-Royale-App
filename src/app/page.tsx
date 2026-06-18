import { HeroSection } from "@/components/home/hero-section";
import { StatsRow } from "@/components/home/stats-row";
import { TopDecksSection } from "@/components/home/top-decks-section";
import { MetaCardsSection } from "@/components/home/meta-cards-section";
import { TopPlayersSection } from "@/components/home/top-players-section";

export default function HomePage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <HeroSection />
      <StatsRow />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TopDecksSection />
        </div>
        <div>
          <TopPlayersSection />
        </div>
      </div>
      <MetaCardsSection />
    </div>
  );
}
