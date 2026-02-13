import type { TierName } from "./tiers";
import type { PersonaType } from "@/domain/Persona";

export interface RoamingComparison {
  carrierName: string;
  roamingPackPrice: number;
  roamingPackDuration: string;
}

export interface AncillaryOption {
  id: string;
  category: "Lounge" | "Transfer" | "Dining" | "Extras" | "Connectivity";
  name: string;
  marketPrice: number;
  bundlePrice: number;
  points: number;
  freeAtTier?: TierName;
  freeLabel?: string;
  freeForPersonas?: PersonaType[];
  roamingComparison?: RoamingComparison;
  partnerName?: string;
  revenueShare?: number;
}

export const ANCILLARY_OPTIONS: AncillaryOption[] = [
  // Lounge Access
  { id: "anc1", category: "Lounge", name: "Aspire Lounge — St Pancras", marketPrice: 45, bundlePrice: 32, points: 15, partnerName: "Aspire Lounges", revenueShare: 12 },
  { id: "anc2", category: "Lounge", name: "Swiss First Lounge — Zürich", marketPrice: 55, bundlePrice: 38, points: 20, freeAtTier: "Gold", freeLabel: "Free at Gold+", partnerName: "Swiss International", revenueShare: 15 },

  // Transfers
  { id: "anc3", category: "Transfer", name: "Uber — Dubai Airport", marketPrice: 35, bundlePrice: 28, points: 8, partnerName: "Uber", revenueShare: 8 },
  { id: "anc4", category: "Transfer", name: "Private MPV (child seats)", marketPrice: 65, bundlePrice: 42, points: 15, partnerName: "Uber", revenueShare: 12 },

  // Dining
  { id: "anc5", category: "Dining", name: "Pret Meal Bundle × 2", marketPrice: 18, bundlePrice: 12, points: 6, partnerName: "Pret A Manger", revenueShare: 4 },
  { id: "anc6", category: "Dining", name: "Restaurant Partner Voucher — Dubai", marketPrice: 40, bundlePrice: 25, points: 12, partnerName: "Deliveroo", revenueShare: 8 },

  // Extras
  { id: "anc7", category: "Extras", name: "Extra Luggage (4 bags)", marketPrice: 40, bundlePrice: 15, points: 5, partnerName: "Airlines (various)", revenueShare: 8 },
  { id: "anc8", category: "Extras", name: "Fast Track — Dubai Immigration", marketPrice: 24, bundlePrice: 12, points: 8, partnerName: "Dubai Airports", revenueShare: 6 },
  { id: "anc9", category: "Extras", name: "Children Rail Fares (×3)", marketPrice: 180, bundlePrice: 95, points: 30, partnerName: "Rail Operators", revenueShare: 35 },

  // Connectivity (eSIM)
  {
    id: "anc10",
    category: "Connectivity",
    name: "UAE eSIM — 10GB / 14 days",
    marketPrice: 45,
    bundlePrice: 18,
    points: 12,
    freeForPersonas: ["Family"],
    freeLabel: "Free for high-value users",
    partnerName: "Airalo",
    revenueShare: 9,
    roamingComparison: {
      carrierName: "Vodafone UK",
      roamingPackPrice: 45,
      roamingPackDuration: "7 days"
    }
  },
  {
    id: "anc11",
    category: "Connectivity",
    name: "Europe eSIM — 20GB / 30 days",
    marketPrice: 35,
    bundlePrice: 22,
    points: 10,
    partnerName: "Airalo",
    revenueShare: 11,
    roamingComparison: {
      carrierName: "EE UK",
      roamingPackPrice: 35,
      roamingPackDuration: "30 days"
    }
  },
  {
    id: "anc12",
    category: "Connectivity",
    name: "India eSIM — 15GB / 30 days",
    marketPrice: 28,
    bundlePrice: 16,
    points: 9,
    freeForPersonas: ["Student"],
    freeLabel: "Free for students",
    partnerName: "Airalo",
    revenueShare: 8,
    roamingComparison: {
      carrierName: "Vodafone UK",
      roamingPackPrice: 40,
      roamingPackDuration: "7 days"
    }
  },
];
