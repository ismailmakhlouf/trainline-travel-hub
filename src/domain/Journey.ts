/**
 * JOURNEY DOMAIN MODEL
 * Represents a complete multi-modal journey with all segments.
 */

import type { PersonaType } from "./Persona";
import type { JourneySegment } from "./Segment";
import type { TravelerGroup } from "./Traveler";
import type { LoyaltyTier, TierProgress } from "./LoyaltyTier";

export interface JourneyMetadata {
  id: string;
  createdAt: Date;
  persona: PersonaType;
  travelers: TravelerGroup;
  optimized: boolean;
}

export interface JourneyPricing {
  totalMarket: number;
  totalBundle: number;
  totalSavings: number;
  savingsPercentage: number;
}

export interface LoyaltyEarnings {
  trainlinePoints: number;
  airlineMiles: number;
  hotelPoints: number;
  totalPoints: number;
}

export interface Journey {
  metadata: JourneyMetadata;
  segments: JourneySegment[];
  pricing: JourneyPricing;
  loyalty: LoyaltyEarnings;
  tierProgress: TierProgress;
}

export interface JourneyValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateJourney(journey: Journey): JourneyValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (journey.segments.length === 0) {
    errors.push("Journey must have at least one segment");
  }

  if (journey.pricing.totalBundle === 0) {
    warnings.push("Journey has no selected options");
  }

  const hasRail = journey.segments.some(s => s.type === "Rail" && s.selected);
  const hasFlight = journey.segments.some(s => s.type === "Flight" && s.selected);
  const hasHotel = journey.segments.some(s => s.type === "Hotel" && s.selected);

  if (!hasRail && !hasFlight && !hasHotel) {
    errors.push("Journey must have at least one transport or accommodation segment");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
