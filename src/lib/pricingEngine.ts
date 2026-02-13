/* ══════════════════════════════════════════════════════
   PRICING ENGINE — All calculation logic lives here.
   UI components NEVER do inline arithmetic.
   ══════════════════════════════════════════════════════ */

import { RAIL_OPTIONS, type RailOption } from "@/data/railOptions";
import { FLIGHT_OPTIONS, type FlightOption } from "@/data/flightOptions";
import { HOTEL_OPTIONS, type HotelOption } from "@/data/hotelOptions";
import { ANCILLARY_OPTIONS, type AncillaryOption } from "@/data/ancillaryOptions";
import { TIERS, getTier, getNextTier, type TierDef, type TierName } from "@/data/tiers";
import {
  OPTIMIZE_DISCOUNT_FACTOR,
  OPTIMIZE_BONUS_POINTS,
  ADULT_PASSENGERS_DEFAULT,
  AIRLINE_MILES_TO_POINTS_RATIO,
  BONUS_MILES_OPTIMIZATION_FACTOR,
} from "@/config/businessModel";

// ─── Re-export Data Types ───────────────────────────────
export type { RailOption, FlightOption, HotelOption, AncillaryOption, TierDef, TierName };

// ─── Persona Type ───────────────────────────────────────
export type Persona = "Family" | "Student" | "Business";

// ─── Rail Groupings ─────────────────────────────────────
export interface RailGroup {
  key: string;
  label: string;
  options: RailOption[];
}

export function getRailGroups(): RailGroup[] {
  const groups: Record<string, RailOption[]> = {};
  for (const r of RAIL_OPTIONS) {
    const key = `${r.traveler}-${r.route}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }
  return Object.entries(groups).map(([key, options]) => ({
    key,
    label: `${options[0].traveler} — ${options[0].route}`,
    options,
  }));
}

// ─── Selections State Shape ─────────────────────────────
export interface JourneySelections {
  persona: Persona;
  railSelections: Record<string, string>; // groupKey → optionId
  flightId: string;
  hotelId: string;
  ancillaryIds: string[];
  optimized: boolean;
}

// ─── Computed Results ───────────────────────────────────
export interface SegmentBreakdown {
  market: number;
  bundle: number;
  savings: number;
  savingsPct: number;
  points: number;
}

export interface ComputedJourney {
  rail: SegmentBreakdown & { route: string };
  flight: SegmentBreakdown & { airline: string; miles: number; tierBoost: number; route: string; time: string };
  hotel: SegmentBreakdown & { hotelPoints: number; tierBoost: number; name: string };
  ancillaries: SegmentBreakdown & { count: number; totalAvailable: number; selected: AncillaryOption[] };

  totalMarket: number;
  totalBundle: number;
  totalSavings: number;
  savingsPct: number;

  trainlinePoints: number;
  airlineMiles: number;
  hotelPoints: number;
  totalLoyaltyPoints: number;

  tierPoints: number;
  tier: TierDef;
  nextTier: TierDef | null;
  tierProgress: number; // 0-100

  // For revenue model
  revenueBySegment: { rail: number; airline: number; hotel: number; ancillary: number };
  hotelPartners: { bookingCom: number; agoda: number };
  selectedFlight: FlightOption;
  selectedHotel: HotelOption;
}

// ─── Helper Functions (Eliminates UI Arithmetic) ────────

/**
 * Calculate savings percentage between two prices.
 * Used throughout UI to display savings without inline arithmetic.
 */
export function calculateSavingsPercentage(marketPrice: number, bundlePrice: number): number {
  if (marketPrice === 0) return 0;
  return Math.round(((marketPrice - bundlePrice) / marketPrice) * 100);
}

/**
 * Apply passenger multiplier to flight prices.
 */
export function applyPassengerMultiplier(price: number, passengers: number = ADULT_PASSENGERS_DEFAULT): number {
  return price * passengers;
}

/**
 * Calculate optimized price with discount factor.
 */
export function applyOptimizeDiscount(price: number): number {
  return Math.round(price * OPTIMIZE_DISCOUNT_FACTOR);
}

/**
 * Calculate bonus miles from optimization.
 */
export function calculateBonusMiles(airlineMiles: number): number {
  return Math.round(airlineMiles * BONUS_MILES_OPTIMIZATION_FACTOR);
}

/**
 * Convert airline miles to Trainline points.
 */
export function convertMilesToPoints(miles: number): number {
  return Math.round(miles * AIRLINE_MILES_TO_POINTS_RATIO);
}

/**
 * Calculate best public hotel price.
 */
export function getBestPublicHotelPrice(hotel: HotelOption): number {
  return Math.min(hotel.bookingPrice, hotel.agodaPrice);
}

/**
 * Check if ancillary is free at current tier.
 */
export function isAncillaryFree(anc: AncillaryOption, currentTier: TierDef): boolean {
  if (!anc.freeAtTier) return false;
  const tierIndex = TIERS.findIndex(t => t.name === currentTier.name);
  const freeIndex = TIERS.findIndex(t => t.name === anc.freeAtTier);
  return tierIndex >= freeIndex;
}

// ─── Core Computation ───────────────────────────────────

export function computeJourney(selections: JourneySelections): ComputedJourney {
  const discount = selections.optimized ? OPTIMIZE_DISCOUNT_FACTOR : 1;

  // Rail
  const selectedRails = Object.values(selections.railSelections)
    .map(id => RAIL_OPTIONS.find(r => r.id === id))
    .filter(Boolean) as RailOption[];
  const railMarket = selectedRails.reduce((s, r) => s + r.marketPrice, 0);
  const railBundle = Math.round(selectedRails.reduce((s, r) => s + r.bundlePrice, 0) * discount);
  const railPoints = selectedRails.reduce((s, r) => s + r.points, 0);

  // Flight (×2 adults)
  const flight = FLIGHT_OPTIONS.find(f => f.id === selections.flightId) ?? FLIGHT_OPTIONS[0];
  const flightMarket = applyPassengerMultiplier(flight.marketPrice);
  const flightBundle = Math.round(applyPassengerMultiplier(flight.bundlePrice) * discount);
  const flightMiles = flight.airlineMiles;

  // Hotel
  const hotel = HOTEL_OPTIONS.find(h => h.id === selections.hotelId) ?? HOTEL_OPTIONS[0];
  const hotelMarket = hotel.bookingPrice; // public reference
  const hotelBundle = Math.round(hotel.trainlineExclusivePrice * discount);

  // Preliminary tier for free-ancillary check
  const prelimPoints = railPoints + hotel.hotelPoints + convertMilesToPoints(flightMiles) + (selections.optimized ? OPTIMIZE_BONUS_POINTS : 0);
  const prelimTier = getTier(prelimPoints);

  // Ancillaries
  const selectedAncs = selections.ancillaryIds
    .map(id => ANCILLARY_OPTIONS.find(a => a.id === id))
    .filter(Boolean) as AncillaryOption[];
  const ancMarket = selectedAncs.reduce((s, a) => s + a.marketPrice, 0);
  const ancBundle = Math.round(
    selectedAncs.reduce((s, a) => s + (isAncillaryFree(a, prelimTier) ? 0 : a.bundlePrice), 0) * discount
  );
  const ancPoints = selectedAncs.reduce((s, a) => s + a.points, 0);

  // Totals
  const totalMarket = railMarket + flightMarket + hotelMarket + ancMarket;
  const totalBundle = railBundle + flightBundle + hotelBundle + ancBundle;
  const totalSavings = totalMarket - totalBundle;
  const savingsPct = calculateSavingsPercentage(totalMarket, totalBundle);

  // Loyalty
  const trainlinePoints = railPoints + ancPoints;
  const airlineMiles = flightMiles;
  const hotelPoints = hotel.hotelPoints;
  const totalLoyaltyPoints = trainlinePoints + hotelPoints + convertMilesToPoints(airlineMiles);

  // Tier
  const tierPoints = totalLoyaltyPoints + (selections.optimized ? OPTIMIZE_BONUS_POINTS : 0);
  const tier = getTier(tierPoints);
  const nextTier = getNextTier(tierPoints);
  const tierProgress = nextTier ? Math.min(100, Math.round((tierPoints / nextTier.min) * 100)) : 100;

  return {
    rail: {
      market: railMarket,
      bundle: railBundle,
      savings: railMarket - railBundle,
      savingsPct: calculateSavingsPercentage(railMarket, railBundle),
      points: railPoints,
      route: selectedRails.map(r => r.route).join(', ') || ''
    },
    flight: {
      market: flightMarket,
      bundle: flightBundle,
      savings: flightMarket - flightBundle,
      savingsPct: calculateSavingsPercentage(flightMarket, flightBundle),
      points: convertMilesToPoints(flightMiles),
      airline: flight.airline,
      miles: flightMiles,
      tierBoost: flight.tierBoost,
      route: flight.route,
      time: flight.time
    },
    hotel: {
      market: hotelMarket,
      bundle: hotelBundle,
      savings: hotelMarket - hotelBundle,
      savingsPct: calculateSavingsPercentage(hotelMarket, hotelBundle),
      points: hotelPoints,
      hotelPoints,
      tierBoost: hotel.tierBoost,
      name: hotel.name
    },
    ancillaries: {
      market: ancMarket,
      bundle: ancBundle,
      savings: ancMarket - ancBundle,
      savingsPct: calculateSavingsPercentage(ancMarket, ancBundle),
      points: ancPoints,
      count: selectedAncs.length,
      totalAvailable: ANCILLARY_OPTIONS.length,
      selected: selectedAncs
    },

    totalMarket,
    totalBundle,
    totalSavings,
    savingsPct,

    trainlinePoints,
    airlineMiles,
    hotelPoints,
    totalLoyaltyPoints,

    tierPoints,
    tier,
    nextTier,
    tierProgress,

    revenueBySegment: {
      rail: railBundle,
      airline: flightBundle,
      hotel: hotelBundle,
      ancillary: ancBundle,
    },
    hotelPartners: {
      bookingCom: Math.round(hotelBundle * 0.5), // 50% to Booking.com
      agoda: Math.round(hotelBundle * 0.5), // 50% to Agoda
    },
    selectedFlight: flight,
    selectedHotel: hotel,
  };
}

// ─── Optimizer ──────────────────────────────────────────

export function optimizeSelections(current: JourneySelections): JourneySelections {
  const groups = getRailGroups();
  const newRail = { ...current.railSelections };

  // Upgrade each rail group to Flexible if on Standard
  for (const g of groups) {
    const currentId = newRail[g.key];
    const currentOpt = g.options.find(o => o.id === currentId);
    if (currentOpt && currentOpt.class === "Standard") {
      const flex = g.options.find(o => o.class === "Flexible");
      if (flex) newRail[g.key] = flex.id;
    }
  }

  // Add high-value ancillaries if not already selected
  const newAnc = [...current.ancillaryIds];
  for (const a of ANCILLARY_OPTIONS) {
    if (!newAnc.includes(a.id) && a.points >= 12) {
      newAnc.push(a.id);
    }
  }

  return {
    ...current,
    railSelections: newRail,
    ancillaryIds: newAnc,
    optimized: true,
  };
}

// ─── Data Access (for UI) ───────────────────────────────
export { RAIL_OPTIONS, FLIGHT_OPTIONS, HOTEL_OPTIONS, ANCILLARY_OPTIONS, TIERS };
