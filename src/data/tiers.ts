export type TierName = "Silver" | "Gold" | "Platinum";

export interface TierDef {
  name: TierName;
  min: number;
  color: string;
}

export const TIERS: TierDef[] = [
  { name: "Silver", min: 0, color: "hsl(210 10% 60%)" },
  { name: "Gold", min: 500, color: "hsl(40 90% 55%)" },
  { name: "Platinum", min: 1200, color: "hsl(270 30% 65%)" },
];

export function getTier(points: number): TierDef {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (points >= TIERS[i].min) return TIERS[i];
  }
  return TIERS[0];
}

export function getNextTier(points: number): TierDef | null {
  for (const t of TIERS) {
    if (points < t.min) return t;
  }
  return null;
}
