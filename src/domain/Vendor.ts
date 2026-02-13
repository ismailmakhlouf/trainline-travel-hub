/**
 * VENDOR DOMAIN MODEL
 * Represents external service providers (rail operators, airlines, hotels).
 */

export type VendorType = "RailOperator" | "Airline" | "Hotel" | "AncillaryProvider";

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  logo?: string;
}

export interface VendorRevenue {
  vendor: Vendor;
  perJourneyRevenue: number;
  percentageOfTotal: number;
  monthlyProjection: number;
  annualProjection: number;
}

// Common rail operators
export const RAIL_OPERATORS = {
  EUROSTAR: { id: "eurostar", name: "Eurostar", type: "RailOperator" as VendorType },
  TGV: { id: "tgv", name: "TGV Lyria", type: "RailOperator" as VendorType },
  DB_ICE: { id: "db-ice", name: "DB ICE", type: "RailOperator" as VendorType },
  NIGHTJET: { id: "nightjet", name: "DB-ÖBB Nightjet", type: "RailOperator" as VendorType },
};

// Common airlines
export const AIRLINES = {
  EMIRATES: { id: "emirates", name: "Emirates", type: "Airline" as VendorType },
  BA: { id: "ba", name: "British Airways", type: "Airline" as VendorType },
  SWISS: { id: "swiss", name: "Swiss", type: "Airline" as VendorType },
  LUFTHANSA: { id: "lufthansa", name: "Lufthansa", type: "Airline" as VendorType },
};
