/**
 * TRAVELER DOMAIN MODEL
 * Represents individuals on a journey.
 */

export type TravelerType = "Adult" | "Child" | "Infant";

export interface Traveler {
  id: string;
  name: string;
  type: TravelerType;
  age?: number;
}

export interface TravelerGroup {
  adults: Traveler[];
  children: Traveler[];
  infants: Traveler[];
}

export function getTotalPassengers(group: TravelerGroup): number {
  return group.adults.length + group.children.length + group.infants.length;
}

export function getAdultCount(group: TravelerGroup): number {
  return group.adults.length;
}

export function getChildCount(group: TravelerGroup): number {
  return group.children.length;
}
