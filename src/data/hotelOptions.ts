export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  bookingPrice: number;
  agodaPrice: number;
  trainlineExclusivePrice: number;
  hotelPoints: number;
  tierBoost: number;
}

export const HOTEL_OPTIONS: HotelOption[] = [
  { id: "h1", name: "Jumeirah Al Naseem", stars: 5, bookingPrice: 420, agodaPrice: 405, trainlineExclusivePrice: 368, hotelPoints: 120, tierBoost: 15 },
  { id: "h2", name: "Atlantis The Royal", stars: 5, bookingPrice: 520, agodaPrice: 498, trainlineExclusivePrice: 445, hotelPoints: 160, tierBoost: 18 },
  { id: "h3", name: "Hilton Dubai Creek", stars: 4, bookingPrice: 280, agodaPrice: 265, trainlineExclusivePrice: 228, hotelPoints: 85, tierBoost: 8 },
];
