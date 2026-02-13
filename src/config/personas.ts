/**
 * PERSONA CONFIGURATION
 * Unified persona system with smart defaults.
 * Eliminates StudentDemo and BusinessDemo duplication.
 */

import type { PersonaType } from "@/domain/Persona";
import type { JourneySelections } from "@/lib/pricingEngine";
import { RAIL_OPTIONS, FLIGHT_OPTIONS, HOTEL_OPTIONS, ANCILLARY_OPTIONS } from "@/data";

export interface PersonaDefaults {
  railClass: "Standard" | "Flexible" | "First Class";
  defaultRailSelections: Record<string, string>;
  defaultFlightId: string;
  defaultHotelId: string;
  defaultAncillaryIds: string[];
  adoptionRateDefault: number;
}

/**
 * Smart defaults per persona.
 * Ensures non-zero initial state for better UX.
 */
export const PERSONA_DEFAULTS: Record<PersonaType, PersonaDefaults> = {
  Family: {
    railClass: "Flexible",
    defaultRailSelections: {
      "Marcus-London → Paris": "m1b", // Flexible
      "Marcus-Paris → Zürich": "m2b", // Flexible
      "Anika-Berlin → Zürich": "a1b", // Flexible
    },
    defaultFlightId: "f1", // Emirates
    defaultHotelId: "h1", // Jumeirah Al Naseem
    defaultAncillaryIds: ["anc10", "anc4", "anc5", "anc7", "anc9"], // eSIM (free for Marcus) + family extras
    adoptionRateDefault: 0.18,
  },
  Student: {
    railClass: "Standard",
    defaultRailSelections: {
      "Marcus-London → Paris": "m1a", // Standard
      "Marcus-Paris → Zürich": "m2a", // Standard
      "Anika-Berlin → Zürich": "a1a", // Standard
    },
    defaultFlightId: "f4", // Lufthansa (cheapest)
    defaultHotelId: "h3", // Hilton (budget)
    defaultAncillaryIds: ["anc5"], // Minimal extras
    adoptionRateDefault: 0.22,
  },
  Business: {
    railClass: "First Class",
    defaultRailSelections: {
      "Marcus-London → Paris": "m1c", // First Class
      "Marcus-Paris → Zürich": "m2c", // First Class
      "Anika-Berlin → Zürich": "a1c", // First Class
    },
    defaultFlightId: "f1", // Emirates (premium)
    defaultHotelId: "h2", // Atlantis (luxury)
    defaultAncillaryIds: ["anc1", "anc2", "anc3", "anc8"], // Premium extras
    adoptionRateDefault: 0.15,
  },
};

/**
 * Generate smart default selections based on persona.
 */
export function getDefaultSelections(persona: PersonaType): JourneySelections {
  const defaults = PERSONA_DEFAULTS[persona];

  return {
    persona,
    railSelections: defaults.defaultRailSelections,
    flightId: defaults.defaultFlightId,
    hotelId: defaults.defaultHotelId,
    ancillaryIds: defaults.defaultAncillaryIds,
    optimized: false,
  };
}

/**
 * Get default adoption rate for persona.
 */
export function getDefaultAdoptionRate(persona: PersonaType): number {
  return PERSONA_DEFAULTS[persona].adoptionRateDefault;
}
