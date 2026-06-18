export interface ApiCard {
  id: number;
  name: string;
  maxLevel: number;
  elixirCost: number;
  iconUrls: {
    medium: string;
  };
  rarity: string;
}

export interface ApiCardsResponse {
  items: ApiCard[];
}

export async function fetchCards(): Promise<ApiCard[]> {
  const res = await fetch("https://clash-royale-proxy.michaeljlomb.workers.dev/", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Worker error: ${res.status} ${res.statusText}`);
  }

  const data: ApiCardsResponse = await res.json();
  return data.items;
}
