/**
 * LOYALTY TIER DOMAIN MODEL
 * Represents tier progression and benefits.
 */

export type TierLevel = "Silver" | "Gold" | "Platinum";

export interface TierBenefits {
  freeAncillaries: string[];
  pointsMultiplier: number;
  prioritySupport: boolean;
  loungeAccess: boolean;
  upgradeEligibility: boolean;
}

export interface LoyaltyTier {
  level: TierLevel;
  name: string;
  minPoints: number;
  color: string;
  benefits: TierBenefits;
}

export interface TierProgress {
  currentTier: LoyaltyTier;
  nextTier: LoyaltyTier | null;
  currentPoints: number;
  pointsToNext: number;
  progressPercentage: number;
}

export const TIER_BENEFITS: Record<TierLevel, TierBenefits> = {
  Silver: {
    freeAncillaries: [],
    pointsMultiplier: 1.0,
    prioritySupport: false,
    loungeAccess: false,
    upgradeEligibility: false,
  },
  Gold: {
    freeAncillaries: ["Swiss First Lounge — Zürich"],
    pointsMultiplier: 1.25,
    prioritySupport: true,
    loungeAccess: true,
    upgradeEligibility: false,
  },
  Platinum: {
    freeAncillaries: ["Swiss First Lounge — Zürich"],
    pointsMultiplier: 1.5,
    prioritySupport: true,
    loungeAccess: true,
    upgradeEligibility: true,
  },
};

export function calculateTierProgress(currentPoints: number, currentTier: LoyaltyTier, nextTier: LoyaltyTier | null): TierProgress {
  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      currentPoints,
      pointsToNext: 0,
      progressPercentage: 100,
    };
  }

  const pointsToNext = nextTier.minPoints - currentPoints;
  const progressPercentage = Math.min(100, Math.round((currentPoints / nextTier.minPoints) * 100));

  return {
    currentTier,
    nextTier,
    currentPoints,
    pointsToNext,
    progressPercentage,
  };
}
