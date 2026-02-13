/**
 * SEGMENT DOMAIN MODEL
 * Represents individual components of a journey (rail, flight, hotel, ancillary).
 */

export type SegmentType = "Rail" | "Flight" | "Hotel" | "Ancillary";

export interface PriceBreakdown {
  market: number;
  bundle: number;
  savings: number;
  savingsPct: number;
}

export interface SegmentBase {
  id: string;
  type: SegmentType;
  selected: boolean;
  pricing: PriceBreakdown;
}

export interface RailSegment extends SegmentBase {
  type: "Rail";
  traveler: string;
  origin: string;
  destination: string;
  operator: string;
  class: string;
  duration: string;
  points: number;
}

export interface FlightSegment extends SegmentBase {
  type: "Flight";
  airline: string;
  origin: string;
  destination: string;
  duration: string;
  miles: number;
  points: number;
  passengerCount: number;
}

export interface HotelSegment extends SegmentBase {
  type: "Hotel";
  name: string;
  stars: number;
  nights: number;
  hotelPoints: number;
  isExclusive: boolean;
}

export interface AncillarySegment extends SegmentBase {
  type: "Ancillary";
  category: "Lounge" | "Transfer" | "Dining" | "Extras";
  name: string;
  points: number;
  isFree: boolean;
}

export type JourneySegment = RailSegment | FlightSegment | HotelSegment | AncillarySegment;
