/**
 * TRANSPORT STEP — Combined rail and flight selection
 * Shows both options on same page as they're mutually exclusive for the same journey leg
 */

import { Train, Plane, Users, Clock, Award, TrendingUp, Luggage, Wifi, Coffee } from "lucide-react";
import type { RailGroup, FlightOption } from "@/lib/pricingEngine";
import { calculateSavingsPercentage, applyPassengerMultiplier } from "@/lib/pricingEngine";
import { ANCILLARY_OPTIONS } from "@/data/ancillaryOptions";
import type { RouteData } from "@/data/routeData";

interface TransportStepProps {
  railGroups: RailGroup[];
  selectedRails: Record<string, string>;
  onSelectRail: (groupKey: string, optionId: string) => void;
  flightOptions?: FlightOption[];
  selectedFlightId?: string;
  onSelectFlight?: (id: string) => void;
  routeSummary?: string;
  passengerCount?: number;
  selectedAncillaryIds?: string[];
  onToggleAncillary?: (id: string) => void;
  selectedRoute?: RouteData | null;
}

export function TransportStep({
  railGroups,
  selectedRails,
  onSelectRail,
  flightOptions = [],
  selectedFlightId,
  onSelectFlight,
  routeSummary,
  passengerCount = 1,
  selectedAncillaryIds = [],
  onToggleAncillary,
  selectedRoute
}: TransportStepProps) {
  const hasRail = railGroups.length > 0;
  const hasFlights = flightOptions.length > 0;
  const hasAnyRailSelected = Object.keys(selectedRails).length > 0;
  const hasFlightSelected = !!selectedFlightId;

  // Get relevant ancillaries
  const extraLuggage = ANCILLARY_OPTIONS.find(a => a.id === "anc7");
  const fastTrack = ANCILLARY_OPTIONS.find(a => a.id === "anc8");
  const stPancrasLounge = ANCILLARY_OPTIONS.find(a => a.id === "anc1");
  const zurichLounge = ANCILLARY_OPTIONS.find(a => a.id === "anc2");
  const pret = ANCILLARY_OPTIONS.find(a => a.id === "anc5");

  // Get destination-specific eSIM
  let destinationESIM = null;
  if (selectedRoute) {
    if (selectedRoute.to.includes("Dubai")) {
      destinationESIM = ANCILLARY_OPTIONS.find(a => a.id === "anc10");
    } else if (selectedRoute.to.includes("Mumbai")) {
      destinationESIM = ANCILLARY_OPTIONS.find(a => a.id === "anc12");
    } else if (selectedRoute.to.includes("Paris") || selectedRoute.to.includes("Zürich") || selectedRoute.to.includes("Zurich")) {
      destinationESIM = ANCILLARY_OPTIONS.find(a => a.id === "anc11");
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Choose <span className="text-gradient-teal">Transport</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {routeSummary || `Select your preferred mode of transport · ${passengerCount} traveler${passengerCount > 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Rail Options */}
      {hasRail && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/30 pb-2">
            <Train className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Rail</h2>
          </div>

          {railGroups.map(group => (
            <div key={group.key} className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Users className="w-3 h-3" /> {group.label}
              </h3>
              <div className="grid gap-2">
                {group.options.map(opt => {
                  const selected = selectedRails[group.key] === opt.id;
                  const savingsPct = calculateSavingsPercentage(opt.marketPrice, opt.bundlePrice);

                  return (
                    <button
                      key={opt.id}
                      onClick={() => onSelectRail(group.key, opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selected
                          ? "border-primary/50 bg-primary/5 shadow-teal-glow"
                          : "border-border/30 bg-card-gradient hover:border-border/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selected ? "bg-primary/20" : "bg-secondary"
                          }`}>
                            <Train className={`w-4 h-4 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {opt.operator} · {opt.class}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />{opt.time} · {opt.points} pts
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground line-through">
                              £{Math.round(opt.marketPrice)}
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              £{Math.round(opt.bundlePrice)}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-trainline-success">
                            Save {Math.round(savingsPct)}%
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flight Options */}
      {hasFlights && onSelectFlight && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border/30 pb-2">
            <Plane className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Flights</h2>
          </div>

          <div className="grid gap-3">
            {flightOptions.map(opt => {
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
                      <p className="text-xs text-muted-foreground line-through">£{Math.round(marketTotal)}</p>
                      <p className="text-lg font-bold text-foreground">£{Math.round(bundleTotal)}</p>
                      <p className="text-[10px] font-semibold text-trainline-success">Save {Math.round(savingsPct)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />{opt.airlineMiles} miles
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />+{opt.tierBoost}% tier boost
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No transport available */}
      {!hasRail && !hasFlights && (
        <div className="text-center py-8 text-muted-foreground">
          <Train className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Route not yet configured</p>
          <p className="text-xs mt-1">This route combination is not available yet</p>
        </div>
      )}

      {/* Contextual Add-ons - Only show when transport is selected */}
      {(hasAnyRailSelected || hasFlightSelected) && onToggleAncillary && (
        <div className="border-t border-border/30 pt-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Enhance your journey</h2>
          <div className="space-y-3">
            {/* Rail-specific: St Pancras Lounge - only if rail selected from London */}
            {hasAnyRailSelected && !hasFlightSelected && stPancrasLounge && (selectedRoute?.from.includes("London") || selectedRoute?.from.includes("St Pancras")) && (
              <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={selectedAncillaryIds.includes(stPancrasLounge.id)}
                  onChange={() => onToggleAncillary(stPancrasLounge.id)}
                  className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{stPancrasLounge.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground line-through mr-2">£{stPancrasLounge.marketPrice}</span>
                      <span className="text-sm font-bold text-foreground">£{stPancrasLounge.bundlePrice}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+{stPancrasLounge.points} pts · Save £{Math.round(stPancrasLounge.marketPrice - stPancrasLounge.bundlePrice)}</p>
                </div>
              </label>
            )}

            {/* Rail-specific: Zürich Lounge - only if rail selected to Zürich */}
            {hasAnyRailSelected && !hasFlightSelected && zurichLounge && (selectedRoute?.to.includes("Zürich") || selectedRoute?.to.includes("Zurich")) && (
              <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={selectedAncillaryIds.includes(zurichLounge.id)}
                  onChange={() => onToggleAncillary(zurichLounge.id)}
                  className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{zurichLounge.name}</span>
                      {zurichLounge.freeLabel && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold uppercase tracking-wider">
                          {zurichLounge.freeLabel}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground line-through mr-2">£{zurichLounge.marketPrice}</span>
                      <span className="text-sm font-bold text-foreground">£{zurichLounge.bundlePrice}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+{zurichLounge.points} pts · Save £{Math.round(zurichLounge.marketPrice - zurichLounge.bundlePrice)}</p>
                </div>
              </label>
            )}

            {/* Pret meal - for any transport */}
            {pret && (
              <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={selectedAncillaryIds.includes(pret.id)}
                  onChange={() => onToggleAncillary(pret.id)}
                  className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{pret.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground line-through mr-2">£{pret.marketPrice}</span>
                      <span className="text-sm font-bold text-foreground">£{pret.bundlePrice}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+{pret.points} pts · Save £{Math.round(pret.marketPrice - pret.bundlePrice)}</p>
                </div>
              </label>
            )}

            {/* Flight-specific: Extra Luggage - only if flight selected */}
            {hasFlightSelected && !hasAnyRailSelected && extraLuggage && (
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
                      <span className="text-xs text-muted-foreground line-through mr-2">£{extraLuggage.marketPrice}</span>
                      <span className="text-sm font-bold text-foreground">£{extraLuggage.bundlePrice}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+{extraLuggage.points} pts · Save £{Math.round(extraLuggage.marketPrice - extraLuggage.bundlePrice)}</p>
                </div>
              </label>
            )}

            {/* Fast Track - Dubai flights only */}
            {hasFlightSelected && !hasAnyRailSelected && fastTrack && selectedRoute?.to.includes("Dubai") && (
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
                      <span className="text-xs text-muted-foreground line-through mr-2">£{fastTrack.marketPrice}</span>
                      <span className="text-sm font-bold text-foreground">£{fastTrack.bundlePrice}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">+{fastTrack.points} pts · Save £{Math.round(fastTrack.marketPrice - fastTrack.bundlePrice)}</p>
                </div>
              </label>
            )}

            {/* eSIM - Show for international travel */}
            {destinationESIM && (hasFlightSelected || hasAnyRailSelected) && (
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
                      <span className="text-xs text-muted-foreground line-through mr-2">£{destinationESIM.marketPrice}</span>
                      <span className="text-sm font-bold text-foreground">£{destinationESIM.bundlePrice}</span>
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
      )}
    </div>
  );
}
