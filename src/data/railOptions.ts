export interface RailOption {
  id: string;
  traveler: string;
  route: string;
  operator: string;
  class: "Standard" | "Flexible" | "First Class" | string;
  time: string;
  marketPrice: number;
  bundlePrice: number;
  points: number;
}

export const RAIL_OPTIONS: RailOption[] = [
  { id: "m1a", traveler: "Marcus", route: "London → Paris", operator: "Eurostar", class: "Standard", time: "2h 16m", marketPrice: 89, bundlePrice: 72, points: 36 },
  { id: "m1b", traveler: "Marcus", route: "London → Paris", operator: "Eurostar", class: "Flexible", time: "2h 16m", marketPrice: 129, bundlePrice: 89, points: 54 },
  { id: "m1c", traveler: "Marcus", route: "London → Paris", operator: "Eurostar", class: "First Class", time: "2h 16m", marketPrice: 245, bundlePrice: 179, points: 108 },
  { id: "m2a", traveler: "Marcus", route: "Paris → Zürich", operator: "TGV Lyria", class: "Standard", time: "4h 03m", marketPrice: 68, bundlePrice: 52, points: 26 },
  { id: "m2b", traveler: "Marcus", route: "Paris → Zürich", operator: "TGV Lyria", class: "Flexible", time: "4h 03m", marketPrice: 98, bundlePrice: 72, points: 44 },
  { id: "m2c", traveler: "Marcus", route: "Paris → Zürich", operator: "TGV Lyria", class: "First Class", time: "4h 03m", marketPrice: 158, bundlePrice: 115, points: 68 },
  { id: "a1a", traveler: "Anika", route: "Berlin → Zürich", operator: "DB ICE", class: "Standard", time: "7h 45m", marketPrice: 79, bundlePrice: 59, points: 30 },
  { id: "a1b", traveler: "Anika", route: "Berlin → Zürich", operator: "DB ICE", class: "Flexible", time: "7h 45m", marketPrice: 112, bundlePrice: 79, points: 48 },
  { id: "a1c", traveler: "Anika", route: "Berlin → Zürich", operator: "DB-ÖBB Nightjet", class: "First Class", time: "10h 20m", marketPrice: 175, bundlePrice: 128, points: 72 },
];
