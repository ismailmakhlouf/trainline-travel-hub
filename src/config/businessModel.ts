/**
 * BUSINESS MODEL CONFIGURATION
 * All business constants and assumptions centralized here.
 * No magic numbers should exist outside this file.
 */

// ─── Fleet Assumptions ──────────────────────────────────

export const MONTHLY_JOURNEYS = 285_000;
export const LEGACY_REV_PER_JOURNEY = 87; // Rail-only capture

// ─── Pricing & Optimization ─────────────────────────────

export const OPTIMIZE_DISCOUNT_FACTOR = 0.92; // 8% additional discount when optimized
export const OPTIMIZE_BONUS_POINTS = 80; // Bonus points for AI optimization

// ─── Passenger Multipliers ──────────────────────────────

export const ADULT_PASSENGERS_DEFAULT = 2;
export const CHILD_PASSENGERS_DEFAULT = 3;

// ─── Loyalty Conversions ────────────────────────────────

export const AIRLINE_MILES_TO_POINTS_RATIO = 0.4; // Airline miles → Trainline points
export const BONUS_MILES_OPTIMIZATION_FACTOR = 0.15; // Additional miles on optimization

// ─── Margin Assumptions ─────────────────────────────────

export const MARGIN_UPLIFT_THRESHOLD = 500; // Points threshold for higher margin
export const MARGIN_STANDARD = 31; // Standard margin %
export const MARGIN_OPTIMIZED = 36; // Optimized margin %

// ─── Default Adoption Rates ─────────────────────────────

export const DEFAULT_ADOPTION_RATE = 0.18;
export const ADOPTION_RATE_SCENARIOS = [0.08, 0.12, 0.18, 0.25, 0.35];
