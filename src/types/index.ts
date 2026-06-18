export type Rarity = "Common" | "Rare" | "Epic" | "Legendary" | "Champion";
export type Arena = string;

export interface Card {
  id: string;
  name: string;
  rarity: Rarity;
  elixirCost: number;
  type: "Troop" | "Spell" | "Building" | "Champion";
  description: string;
  emoji: string;
  winRate?: number;
  usageRate?: number;
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  avgElixir: number;
  winRate: number;
  archetype: "Beatdown" | "Control" | "Cycle" | "Siege" | "Bridge Spam" | "Bait";
  author: string;
  trophyRange: string;
  votes: number;
}

export interface Player {
  tag: string;
  name: string;
  trophies: number;
  bestTrophies: number;
  arena: string;
  clan?: string;
  role?: string;
  wins: number;
  losses: number;
  level: number;
  starPoints: number;
  rank?: number;
  cards: Card[];
  favoriteCard?: Card;
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  previousRank?: number;
}
