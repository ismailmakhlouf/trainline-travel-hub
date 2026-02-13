/**
 * FLIGHT STEP — Stateless flight selection component.
 * No arithmetic. All calculations via pricingEngine.
 */

import { Plane, Award, TrendingUp, Luggage, Wifi } from "lucide-react";
import { calculateSavingsPercentage, applyPassengerMultiplier, type FlightOption } from "@/lib/pricingEngine";
import { ANCILLARY_OPTIONS } from "@/data/ancillaryOptions";
import type { RouteData } from "@/data/routeData";

interface FlightStepProps {
  selectedFlightId: string;
  onSelectFlight: (id: string) => void;
  flightOptions?: FlightOption[];
  routeSummary?: string;
  passengerCount?: number;
  selectedAncillaryIds?: string[];
  onToggleAncillary?: (id: string) => void;
  selectedRoute?: RouteData | null;
}

export function FlightStep({ selectedFlightId, onSelectFlight, flightOptions, routeSummary, passengerCount = 2, selectedAncillaryIds = [], onToggleAncillary, selectedRoute }: FlightStepProps) {
  // Only use provided flight options - don't fall back to hardcoded defaults
  const flights = flightOptions || [];

  // Get relevant ancillaries for flights
  const extraLuggage = ANCILLARY_OPTIONS.find(a => a.id === "anc7");
  const fastTrack = ANCILLARY_OPTIONS.find(a => a.id === "anc8");

  // Get destination-specific eSIM
  let destinationESIM = null;
  if (selectedRoute) {
    if (selectedRoute.to.includes("Dubai")) {
      destinationESIM = ANCILLARY_OPTIONS.find(a => a.id === "anc10"); // UAE eSIM
    } else if (selectedRoute.to.includes("Mumbai")) {
      destinationESIM = ANCILLARY_OPTIONS.find(a => a.id === "anc12"); // India eSIM
    } else if (selectedRoute.to.includes("Paris") || selectedRoute.to.includes("Zürich") || selectedRoute.to.includes("Zurich")) {
      destinationESIM = ANCILLARY_OPTIONS.find(a => a.id === "anc11"); // Europe eSIM
    }
  }
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Choose Your <span className="text-gradient-teal">Flight</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {routeSummary || `Zürich → Dubai · ${passengerCount} adults + 3 children`}
        </p>
      </div>

      {flights.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Plane className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No flights available for this route</p>
          <p className="text-xs mt-1">This route may be rail-only</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {flights.map(opt => {
          const selected = selectedFlightId === opt.id;
          const savingsPct = calculateSavingsPercentage(opt.marketPrice, opt.bundlePrice);
          const marketTotal = applyPassengerMultiplier(opt.marketPrice, passengerCount);
          const bundleTotal = applyPassengerMultiplier(opt.bundlePrice, passengerCount);

          return (
            <button
              key={opt.id}
              onClick={() => onSelectFlight(opt.id)}
              className={`w-full text-left p-5 rounded-xl border transition-all ${
                selected
                  ? "border-primary/50 bg-primary/5 shadow-teal-glow"
                  : "border-border/30 bg-card-gradient hover:border-border/60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selected ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <Plane className={`w-5 h-5 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{opt.airline}</p>
                    <p className="text-xs text-muted-foreground">{opt.route} · {opt.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground line-through">£{marketTotal}</p>
                  <p className="text-lg font-bold text-foreground">£{bundleTotal}</p>
                  <p className="text-[10px] font-semibold text-trainline-success">Save {savingsPct}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3" />{opt.airlineMiles} miles
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />+{opt.tierBoost}% tier boost
                </span>
                <span className="text-[10px] text-muted-foreground/60">Skyscanner ref</span>
              </div>
            </button>
          );
        })}
        </div>
      )}

      {/* Contextual Add-ons */}
      {selectedFlightId && onToggleAncillary && (
        <div className="mt-8 space-y-4">
          <div className="border-t border-border/30 pt-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Enhance your flight</h2>
            <div className="space-y-3">
              {/* Extra Luggage */}
              {extraLuggage && (
                <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAncillaryIds.includes(extraLuggage.id)}
                    onChange={() => onToggleAncillary(extraLuggage.id)}
                    className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Luggage className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{extraLuggage.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{extraLuggage.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{extraLuggage.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{extraLuggage.points} pts · Save £{extraLuggage.marketPrice - extraLuggage.bundlePrice}
                    </p>
                  </div>
                </label>
              )}

              {/* Fast Track */}
              {fastTrack && selectedRoute?.to.includes("Dubai") && (
                <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAncillaryIds.includes(fastTrack.id)}
                    onChange={() => onToggleAncillary(fastTrack.id)}
                    className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{fastTrack.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{fastTrack.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{fastTrack.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{fastTrack.points} pts · Save £{fastTrack.marketPrice - fastTrack.bundlePrice}
                    </p>
                  </div>
                </label>
              )}

              {/* Destination eSIM */}
              {destinationESIM && (
                <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAncillaryIds.includes(destinationESIM.id)}
                    onChange={() => onToggleAncillary(destinationESIM.id)}
                    className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{destinationESIM.name}</span>
                        {destinationESIM.freeLabel && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-trainline-success/20 text-trainline-success font-semibold uppercase tracking-wider">
                            {destinationESIM.freeLabel}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{destinationESIM.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{destinationESIM.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{destinationESIM.points} pts{destinationESIM.roamingComparison ? ` · vs ${destinationESIM.roamingComparison.carrierName} £${destinationESIM.roamingComparison.roamingPackPrice} (${destinationESIM.roamingComparison.roamingPackDuration})` : ''}
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
