/**
 * PERSONA DOMAIN MODEL
 * Represents different traveler personas with their characteristics.
 */

export type PersonaType = "Family" | "Student" | "Business";

export interface PersonaConfig {
  id: PersonaType;
  displayName: string;
  description: string;

  // Default assumptions
  defaultAdults: number;
  defaultChildren: number;

  // Journey preferences
  preferredRailClass: "Standard" | "Flexible" | "First Class";
  ancillaryPriority: "Budget" | "Balanced" | "Premium";

  // Revenue characteristics
  avgJourneyValue: number;
  ancillaryAttachRate: number;
  yoyGrowth: string;
}

export const PERSONA_CONFIGS: Record<PersonaType, PersonaConfig> = {
  Family: {
    id: "Family",
    displayName: "Family (3+ kids)",
    description: "Multi-generational travel with focus on value and convenience",
    defaultAdults: 2,
    defaultChildren: 3,
    preferredRailClass: "Flexible",
    ancillaryPriority: "Balanced",
    avgJourneyValue: 420,
    ancillaryAttachRate: 68,
    yoyGrowth: "+34%",
  },
  Student: {
    id: "Student",
    displayName: "Student / Budget",
    description: "Cost-conscious travelers seeking maximum value",
    defaultAdults: 1,
    defaultChildren: 0,
    preferredRailClass: "Standard",
    ancillaryPriority: "Budget",
    avgJourneyValue: 185,
    ancillaryAttachRate: 62,
    yoyGrowth: "+52%",
  },
  Business: {
    id: "Business",
    displayName: "Business Solo",
    description: "Professional travelers prioritizing speed and flexibility",
    defaultAdults: 1,
    defaultChildren: 0,
    preferredRailClass: "First Class",
    ancillaryPriority: "Premium",
    avgJourneyValue: 340,
    ancillaryAttachRate: 45,
    yoyGrowth: "+18%",
  },
};

export function getPersonaConfig(persona: PersonaType): PersonaConfig {
  return PERSONA_CONFIGS[persona];
}
