export interface FlightOption {
  id: string;
  airline: string;
  route: string;
  time: string;
  marketPrice: number;
  bundlePrice: number;
  airlineMiles: number;
  tierBoost: number;
}

export const FLIGHT_OPTIONS: FlightOption[] = [
  { id: "f1", airline: "Emirates", route: "Zürich → Dubai", time: "6h 10m", marketPrice: 410, bundlePrice: 285, airlineMiles: 285, tierBoost: 12 },
  { id: "f2", airline: "British Airways", route: "Zürich → Dubai", time: "7h 45m", marketPrice: 385, bundlePrice: 268, airlineMiles: 210, tierBoost: 8 },
  { id: "f3", airline: "Swiss", route: "Zürich → Dubai", time: "5h 55m", marketPrice: 445, bundlePrice: 310, airlineMiles: 195, tierBoost: 10 },
  { id: "f4", airline: "Lufthansa", route: "Zürich → Dubai", time: "8h 20m", marketPrice: 365, bundlePrice: 255, airlineMiles: 180, tierBoost: 7 },
];
