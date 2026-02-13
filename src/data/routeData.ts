/**
 * ROUTE DATA MODEL
 * Comprehensive route definitions with realistic travel options
 * Based on real train times, airlines, and hotels
 */

export interface RouteData {
  id: string;
  from: string;
  to: string;
  country: string;
  region: string;

  // Rail options
  rail: {
    operator: string;
    duration: string;
    classes: RailClass[];
  };

  // Flight options
  flights?: {
    airlines: AirlineOption[];
    duration: string;
  };

  // Hotel destination
  hotelDestination?: {
    city: string;
    hotels: HotelOption[];
  };
}

export interface RailClass {
  name: "Standard" | "Plus" | "Premier" | "First Class" | "Standard Premier";
  price: number;
  points: number;
  features: string[];
}

export interface AirlineOption {
  id: string;
  airline: string;
  duration: string;
  economyPrice: number;
  businessPrice: number;
  firstPrice?: number;
  airlineMiles: number;
  loyaltyProgram: string;
  tierBoost: number;
}

export interface HotelOption {
  id: string;
  name: string;
  stars: number;
  bookingPrice: number;
  agodaPrice: number;
  trainlinePrice: number;
  hotelPoints: number;
  tierBoost: number;
}

/**
 * PRIMARY ROUTES - Based on real Eurostar, TGV Lyria, and airline data
 */
export const ROUTE_DATA: Record<string, RouteData> = {
  // London to Paris - Eurostar + Flights
  "london-paris": {
    id: "london-paris",
    from: "London St Pancras International",
    to: "Paris Gare du Nord",
    country: "France",
    region: "Western Europe",
    rail: {
      operator: "Eurostar",
      duration: "2h 16m",
      classes: [
        {
          name: "Standard",
          price: 89,
          points: 45,
          features: ["Free WiFi", "Power sockets", "Comfortable seating"]
        },
        {
          name: "Plus",
          price: 165,
          points: 85,
          features: ["Light meal included", "Spacious seating", "Fast track security"]
        },
        {
          name: "Premier",
          price: 245,
          points: 125,
          features: ["3-course meal", "Lounge access", "Fully flexible", "Fast track", "Champagne service"]
        }
      ]
    },
    flights: {
      airlines: [
        {
          id: "ba-paris",
          airline: "British Airways",
          duration: "1h 15m",
          economyPrice: 95,
          businessPrice: 285,
          airlineMiles: 210,
          loyaltyProgram: "Executive Club",
          tierBoost: 8
        },
        {
          id: "af-paris",
          airline: "Air France",
          duration: "1h 20m",
          economyPrice: 105,
          businessPrice: 295,
          airlineMiles: 195,
          loyaltyProgram: "Flying Blue",
          tierBoost: 9
        },
        {
          id: "ez-paris",
          airline: "easyJet",
          duration: "1h 25m",
          economyPrice: 65,
          businessPrice: 165,
          airlineMiles: 140,
          loyaltyProgram: "easyJet Plus",
          tierBoost: 5
        }
      ],
      duration: "1h 15m"
    },
    hotelDestination: {
      city: "Paris",
      hotels: [
        {
          id: "paris-h1",
          name: "Hôtel Plaza Athénée",
          stars: 5,
          bookingPrice: 890,
          agodaPrice: 865,
          trainlinePrice: 785,
          hotelPoints: 180,
          tierBoost: 20
        },
        {
          id: "paris-h2",
          name: "Le Bristol Paris",
          stars: 5,
          bookingPrice: 950,
          agodaPrice: 920,
          trainlinePrice: 835,
          hotelPoints: 195,
          tierBoost: 22
        },
        {
          id: "paris-h3",
          name: "Pullman Paris Tour Eiffel",
          stars: 4,
          bookingPrice: 385,
          agodaPrice: 365,
          trainlinePrice: 325,
          hotelPoints: 95,
          tierBoost: 10
        }
      ]
    }
  },

  // Paris to Zurich - TGV Lyria
  "paris-zurich": {
    id: "paris-zurich",
    from: "Paris Gare de Lyon",
    to: "Zürich HB",
    country: "Switzerland",
    region: "Central Europe",
    rail: {
      operator: "TGV Lyria",
      duration: "4h 4m",
      classes: [
        {
          name: "Standard",
          price: 69,
          points: 35,
          features: ["Free WiFi", "Power sockets", "Reclining seats"]
        },
        {
          name: "First Class",
          price: 135,
          points: 70,
          features: ["Spacious seating", "Meal service", "Quieter carriage"]
        },
        {
          name: "Standard Premier",
          price: 215,
          points: 110,
          features: ["Signature service", "Gourmet meal", "Welcome drink", "Priority boarding"]
        }
      ]
    },
    hotelDestination: {
      city: "Zürich",
      hotels: [
        {
          id: "zurich-h1",
          name: "Baur au Lac",
          stars: 5,
          bookingPrice: 785,
          agodaPrice: 765,
          trainlinePrice: 695,
          hotelPoints: 165,
          tierBoost: 18
        },
        {
          id: "zurich-h2",
          name: "The Dolder Grand",
          stars: 5,
          bookingPrice: 695,
          agodaPrice: 680,
          trainlinePrice: 615,
          hotelPoints: 145,
          tierBoost: 16
        },
        {
          id: "zurich-h3",
          name: "Hotel Schweizerhof Zürich",
          stars: 4,
          bookingPrice: 345,
          agodaPrice: 335,
          trainlinePrice: 295,
          hotelPoints: 85,
          tierBoost: 9
        }
      ]
    }
  },

  // London to Dubai - Flights
  "london-dubai": {
    id: "london-dubai",
    from: "London Heathrow",
    to: "Dubai International",
    country: "United Arab Emirates",
    region: "Middle East",
    rail: {
      operator: "Heathrow Express + Emirates",
      duration: "15m + 6h 50m",
      classes: [
        {
          name: "Standard",
          price: 25,
          points: 15,
          features: ["To Heathrow T3"]
        }
      ]
    },
    flights: {
      airlines: [
        {
          id: "ek-dubai",
          airline: "Emirates",
          duration: "6h 50m",
          economyPrice: 485,
          businessPrice: 2850,
          firstPrice: 5200,
          airlineMiles: 3400,
          loyaltyProgram: "Emirates Skywards",
          tierBoost: 25
        },
        {
          id: "ba-dubai",
          airline: "British Airways",
          duration: "7h 5m",
          economyPrice: 465,
          businessPrice: 2650,
          firstPrice: 4900,
          airlineMiles: 3400,
          loyaltyProgram: "Executive Club",
          tierBoost: 22
        },
        {
          id: "vs-dubai",
          airline: "Virgin Atlantic",
          duration: "6h 55m",
          economyPrice: 475,
          businessPrice: 2750,
          airlineMiles: 3400,
          loyaltyProgram: "Flying Club",
          tierBoost: 23
        }
      ],
      duration: "6h 50m - 7h 5m"
    },
    hotelDestination: {
      city: "Dubai",
      hotels: [
        {
          id: "dubai-h1",
          name: "Burj Al Arab Jumeirah",
          stars: 5,
          bookingPrice: 1975,
          agodaPrice: 1895,
          trainlinePrice: 1695,
          hotelPoints: 350,
          tierBoost: 35
        },
        {
          id: "dubai-h2",
          name: "Atlantis The Royal",
          stars: 5,
          bookingPrice: 1445,
          agodaPrice: 1385,
          trainlinePrice: 1245,
          hotelPoints: 280,
          tierBoost: 28
        },
        {
          id: "dubai-h3",
          name: "Atlantis The Palm",
          stars: 5,
          bookingPrice: 860,
          agodaPrice: 825,
          trainlinePrice: 745,
          hotelPoints: 165,
          tierBoost: 18
        },
        {
          id: "dubai-h4",
          name: "Jumeirah Beach Hotel",
          stars: 5,
          bookingPrice: 585,
          agodaPrice: 565,
          trainlinePrice: 515,
          hotelPoints: 125,
          tierBoost: 14
        }
      ]
    }
  },

  // Berlin to Zurich - DB + SBB
  "berlin-zurich": {
    id: "berlin-zurich",
    from: "Berlin Hauptbahnhof",
    to: "Zürich HB",
    country: "Switzerland",
    region: "Central Europe",
    rail: {
      operator: "Deutsche Bahn / SBB",
      duration: "8h 30m",
      classes: [
        {
          name: "Standard",
          price: 79,
          points: 40,
          features: ["Free WiFi", "Power sockets"]
        },
        {
          name: "First Class",
          price: 145,
          points: 75,
          features: ["Spacious seating", "Complimentary snacks", "Quiet zone"]
        }
      ]
    },
    hotelDestination: {
      city: "Zürich",
      hotels: [
        {
          id: "zurich-h1",
          name: "Baur au Lac",
          stars: 5,
          bookingPrice: 785,
          agodaPrice: 765,
          trainlinePrice: 695,
          hotelPoints: 165,
          tierBoost: 18
        },
        {
          id: "zurich-h2",
          name: "The Dolder Grand",
          stars: 5,
          bookingPrice: 695,
          agodaPrice: 680,
          trainlinePrice: 615,
          hotelPoints: 145,
          tierBoost: 16
        },
        {
          id: "zurich-h3",
          name: "Hotel Schweizerhof Zürich",
          stars: 4,
          bookingPrice: 345,
          agodaPrice: 335,
          trainlinePrice: 295,
          hotelPoints: 85,
          tierBoost: 9
        }
      ]
    }
  },

  // London to Mumbai - Flights
  "london-mumbai": {
    id: "london-mumbai",
    from: "London Heathrow",
    to: "Mumbai Chhatrapati Shivaji International",
    country: "India",
    region: "South Asia",
    rail: {
      operator: "Heathrow Express + Airlines",
      duration: "15m + 9h 30m",
      classes: [
        {
          name: "Standard",
          price: 25,
          points: 15,
          features: ["To Heathrow T2/T5"]
        }
      ]
    },
    flights: {
      airlines: [
        {
          id: "ba-mumbai",
          airline: "British Airways",
          duration: "9h 30m",
          economyPrice: 425,
          businessPrice: 2450,
          firstPrice: 4500,
          airlineMiles: 4480,
          loyaltyProgram: "Executive Club",
          tierBoost: 28
        },
        {
          id: "ai-mumbai",
          airline: "Air India",
          duration: "9h 20m",
          economyPrice: 395,
          businessPrice: 2150,
          airlineMiles: 4480,
          loyaltyProgram: "Flying Returns",
          tierBoost: 26
        },
        {
          id: "vs-mumbai",
          airline: "Virgin Atlantic",
          duration: "9h 35m",
          economyPrice: 445,
          businessPrice: 2550,
          airlineMiles: 4480,
          loyaltyProgram: "Flying Club",
          tierBoost: 27
        }
      ],
      duration: "9h 20m - 9h 35m"
    },
    hotelDestination: {
      city: "Mumbai",
      hotels: [
        {
          id: "mumbai-h1",
          name: "The Taj Mahal Palace",
          stars: 5,
          bookingPrice: 345,
          agodaPrice: 325,
          trainlinePrice: 285,
          hotelPoints: 95,
          tierBoost: 12
        },
        {
          id: "mumbai-h2",
          name: "The Oberoi Mumbai",
          stars: 5,
          bookingPrice: 425,
          agodaPrice: 405,
          trainlinePrice: 365,
          hotelPoints: 115,
          tierBoost: 14
        },
        {
          id: "mumbai-h3",
          name: "ITC Grand Central",
          stars: 5,
          bookingPrice: 265,
          agodaPrice: 255,
          trainlinePrice: 225,
          hotelPoints: 75,
          tierBoost: 10
        },
        {
          id: "mumbai-h4",
          name: "Trident Bandra Kurla",
          stars: 5,
          bookingPrice: 195,
          agodaPrice: 185,
          trainlinePrice: 165,
          hotelPoints: 55,
          tierBoost: 8
        }
      ]
    }
  },

  // Manchester to Paris - Multi-leg via London (presented as bundled)
  "manchester-paris": {
    id: "manchester-paris",
    from: "Manchester Piccadilly",
    to: "Paris Gare du Nord",
    country: "France",
    region: "Western Europe",
    rail: {
      operator: "Avanti West Coast + Eurostar",
      duration: "5h 45m",
      classes: [
        {
          name: "Standard",
          price: 125,
          points: 60,
          features: ["Manchester → London → Paris", "Free WiFi", "Power sockets"]
        },
        {
          name: "Plus",
          price: 195,
          points: 95,
          features: ["Manchester → London → Paris", "Light meal", "Spacious seating", "Fast track"]
        },
        {
          name: "Premier",
          price: 285,
          points: 140,
          features: ["Manchester → London → Paris", "3-course meal", "Lounge access", "Fully flexible"]
        }
      ]
    },
    hotelDestination: {
      city: "Paris",
      hotels: [
        {
          id: "paris-h1",
          name: "Hôtel Plaza Athénée",
          stars: 5,
          bookingPrice: 890,
          agodaPrice: 865,
          trainlinePrice: 785,
          hotelPoints: 180,
          tierBoost: 20
        },
        {
          id: "paris-h2",
          name: "Le Bristol Paris",
          stars: 5,
          bookingPrice: 950,
          agodaPrice: 920,
          trainlinePrice: 835,
          hotelPoints: 195,
          tierBoost: 22
        },
        {
          id: "paris-h3",
          name: "Pullman Paris Tour Eiffel",
          stars: 4,
          bookingPrice: 385,
          agodaPrice: 365,
          trainlinePrice: 325,
          hotelPoints: 95,
          tierBoost: 10
        }
      ]
    }
  },

  // Manchester to Mumbai - Rail to airport + Flights
  "manchester-mumbai": {
    id: "manchester-mumbai",
    from: "Manchester Airport",
    to: "Mumbai Chhatrapati Shivaji International",
    country: "India",
    region: "South Asia",
    rail: {
      operator: "TransPennine Express + Airlines",
      duration: "25m + 9h 45m",
      classes: [
        {
          name: "Standard",
          price: 15,
          points: 10,
          features: ["To Manchester Airport T1/T2"]
        }
      ]
    },
    flights: {
      airlines: [
        {
          id: "ba-mcr-mumbai",
          airline: "British Airways",
          duration: "9h 45m",
          economyPrice: 445,
          businessPrice: 2550,
          firstPrice: 4700,
          airlineMiles: 4480,
          loyaltyProgram: "Executive Club",
          tierBoost: 28
        },
        {
          id: "ai-mcr-mumbai",
          airline: "Air India",
          duration: "9h 30m",
          economyPrice: 415,
          businessPrice: 2250,
          airlineMiles: 4480,
          loyaltyProgram: "Flying Returns",
          tierBoost: 26
        },
        {
          id: "vs-mcr-mumbai",
          airline: "Virgin Atlantic",
          duration: "9h 50m",
          economyPrice: 465,
          businessPrice: 2650,
          airlineMiles: 4480,
          loyaltyProgram: "Flying Club",
          tierBoost: 27
        }
      ],
      duration: "9h 30m - 9h 50m"
    },
    hotelDestination: {
      city: "Mumbai",
      hotels: [
        {
          id: "mumbai-h1",
          name: "The Taj Mahal Palace",
          stars: 5,
          bookingPrice: 345,
          agodaPrice: 325,
          trainlinePrice: 285,
          hotelPoints: 95,
          tierBoost: 12
        },
        {
          id: "mumbai-h2",
          name: "The Oberoi Mumbai",
          stars: 5,
          bookingPrice: 425,
          agodaPrice: 405,
          trainlinePrice: 365,
          hotelPoints: 115,
          tierBoost: 14
        },
        {
          id: "mumbai-h3",
          name: "ITC Grand Central",
          stars: 5,
          bookingPrice: 265,
          agodaPrice: 255,
          trainlinePrice: 225,
          hotelPoints: 75,
          tierBoost: 10
        },
        {
          id: "mumbai-h4",
          name: "Trident Bandra Kurla",
          stars: 5,
          bookingPrice: 195,
          agodaPrice: 185,
          trainlinePrice: 165,
          hotelPoints: 55,
          tierBoost: 8
        }
      ]
    }
  }
};

/**
 * Helper function to get route data by city names
 */
export function getRouteData(from: string, to: string): RouteData | null {
  // Normalize city names to route IDs
  const fromCity = from.toLowerCase().split(' ')[0];
  const toCity = to.toLowerCase().split(' ')[0];
  const routeId = `${fromCity}-${toCity}`;

  return ROUTE_DATA[routeId] || null;
}

/**
 * Get all available departure cities
 */
export function getDepartureCities(): string[] {
  return Array.from(new Set(Object.values(ROUTE_DATA).map(r => r.from)));
}

/**
 * Get destination cities for a given departure
 */
export function getDestinationCities(from: string): string[] {
  return Object.values(ROUTE_DATA)
    .filter(r => r.from === from)
    .map(r => r.to);
}
