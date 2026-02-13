/**
 * VENDOR SERVICE — Abstraction layer for vendor data.
 * Currently wraps static data, designed for future API integration.
 * Ready for Maps API, Flight API, Hotel API replacement.
 */

import {
  RAIL_OPTIONS,
  FLIGHT_OPTIONS,
  HOTEL_OPTIONS,
  ANCILLARY_OPTIONS,
  type RailOption,
  type FlightOption,
  type HotelOption,
  type AncillaryOption,
} from "@/data";

// ─── Service Response Types ─────────────────────────────

export interface ServiceResponse<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

// ─── Vendor Service Interface ───────────────────────────

export interface IVendorService {
  getRailOptions(): Promise<RailOption[]>;
  getFlightOptions(origin: string, destination: string): Promise<FlightOption[]>;
  getHotelOptions(location: string): Promise<HotelOption[]>;
  getAncillaryOptions(): Promise<AncillaryOption[]>;
}

// ─── Static Data Service Implementation ─────────────────

class StaticVendorService implements IVendorService {
  private simulateDelay(): Promise<void> {
    // Simulate network delay for realistic behavior
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  async getRailOptions(): Promise<RailOption[]> {
    await this.simulateDelay();
    return [...RAIL_OPTIONS];
  }

  async getFlightOptions(origin: string, destination: string): Promise<FlightOption[]> {
    await this.simulateDelay();
    // Future: call flight API with origin/destination
    return [...FLIGHT_OPTIONS];
  }

  async getHotelOptions(location: string): Promise<HotelOption[]> {
    await this.simulateDelay();
    // Future: call hotel API with location
    return [...HOTEL_OPTIONS];
  }

  async getAncillaryOptions(): Promise<AncillaryOption[]> {
    await this.simulateDelay();
    return [...ANCILLARY_OPTIONS];
  }
}

// ─── Service Factory ────────────────────────────────────

let vendorServiceInstance: IVendorService;

export function getVendorService(): IVendorService {
  if (!vendorServiceInstance) {
    // In the future, this can switch between static and API-based implementations
    // based on environment variables or feature flags
    vendorServiceInstance = new StaticVendorService();
  }
  return vendorServiceInstance;
}

// ─── React Hook for Vendor Data ─────────────────────────

export function useVendorData() {
  // Future: implement proper loading states and error handling
  // For now, return static data directly to maintain compatibility
  return {
    railOptions: RAIL_OPTIONS,
    flightOptions: FLIGHT_OPTIONS,
    hotelOptions: HOTEL_OPTIONS,
    ancillaryOptions: ANCILLARY_OPTIONS,
    loading: false,
    error: null,
  };
}

/**
 * INTEGRATION NOTES:
 *
 * To integrate external APIs:
 * 1. Create ApiVendorService implementing IVendorService
 * 2. Update getVendorService() factory to return ApiVendorService
 * 3. Update useVendorData() to call service methods
 * 4. Add proper error handling and retry logic
 * 5. Implement caching strategy (React Query recommended)
 *
 * Example API integration:
 *
 * class ApiVendorService implements IVendorService {
 *   async getFlightOptions(origin: string, destination: string) {
 *     const response = await fetch(`/api/flights?from=${origin}&to=${destination}`);
 *     return response.json();
 *   }
 * }
 */
