const API_BASE = "https://api.clashroyale.com/v1";

export interface ApiCard {
  id: number;
  name: string;
  maxLevel: number;
  maxEvolutionLevel?: number;
  elixirCost: number;
  iconUrls: {
    medium: string;
    evolutionMedium?: string;
  };
  rarity: string;
}

export interface ApiCardsResponse {
  items: ApiCard[];
}

export async function fetchCards(): Promise<ApiCard[]> {
  const res = await fetch(`${API_BASE}/cards`, {
    headers: {
      Authorization: `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Clash Royale API error: ${res.status} ${res.statusText}`);
  }

  const data: ApiCardsResponse = await res.json();
  return data.items;
}
