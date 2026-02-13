/**
 * HOTEL STEP — Stateless hotel selection component.
 * No arithmetic. All calculations via pricingEngine.
 */

import { Star, Award, Hotel as HotelIcon, Car, UtensilsCrossed } from "lucide-react";
import { calculateSavingsPercentage, getBestPublicHotelPrice, type HotelOption } from "@/lib/pricingEngine";
import { ANCILLARY_OPTIONS } from "@/data/ancillaryOptions";

interface HotelStepProps {
  selectedHotelId: string;
  onSelectHotel: (id: string) => void;
  hotelOptions?: HotelOption[];
  destinationCity?: string;
  selectedAncillaryIds?: string[];
  onToggleAncillary?: (id: string) => void;
  routeAncillaryIds?: string[];
}

export function HotelStep({ selectedHotelId, onSelectHotel, hotelOptions, destinationCity, selectedAncillaryIds = [], onToggleAncillary, routeAncillaryIds = [] }: HotelStepProps) {
  // Only use provided hotel options - don't fall back to hardcoded defaults
  const hotels = hotelOptions || [];
  const city = destinationCity || "";

  // Get relevant ancillaries for hotels
  const uberTransfer = ANCILLARY_OPTIONS.find(a => a.id === "anc3");
  const privateMPV = ANCILLARY_OPTIONS.find(a => a.id === "anc4");
  const dubaiDining = ANCILLARY_OPTIONS.find(a => a.id === "anc6");

  // Check if there are any extras available for this destination
  const hasExtras = (city.includes("Dubai") && (uberTransfer || privateMPV || dubaiDining)) ||
                    (city.includes("Mumbai") && uberTransfer);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Select <span className="text-gradient-gold">Hotel</span>
        </h1>
        <p className="text-sm text-muted-foreground">{city} · 3 nights</p>
        <p className="text-xs text-primary/80 font-medium">
          Exclusive negotiated rates from Booking.com & Agoda
        </p>
      </div>

      {hotels.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <HotelIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No hotels available for this destination</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {hotels.map(opt => {
          const selected = selectedHotelId === opt.id;
          const bestPublic = getBestPublicHotelPrice(opt);
          const savingsPct = calculateSavingsPercentage(bestPublic, opt.trainlineExclusivePrice);

          return (
            <button
              key={opt.id}
              onClick={() => onSelectHotel(opt.id)}
              className={`w-full text-left p-5 rounded-xl border transition-all ${
                selected
                  ? "border-accent/50 bg-accent/5 shadow-gold-glow"
                  : "border-border/30 bg-card-gradient hover:border-border/60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-foreground">{opt.name}</p>
                    {selected && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold uppercase tracking-wider">
                        Exclusive
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: opt.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className={`rounded-lg p-3 ${
                  selected
                    ? "bg-blue-500/10 border-2 border-blue-500/40"
                    : "bg-blue-500/5 border border-blue-500/20"
                }`}>
                  <p className="text-[10px] text-blue-400 font-bold mb-1">Booking.com</p>
                  <p className="text-[10px] text-muted-foreground/60 mb-0.5 line-through">Public £{Math.round(opt.bookingPrice)}</p>
                  <p className="text-lg font-bold text-foreground">£{Math.round(opt.trainlineExclusivePrice)}</p>
                  <p className="text-[10px] text-trainline-success font-semibold">Exclusive rate</p>
                </div>
                <div className={`rounded-lg p-3 ${
                  selected
                    ? "bg-purple-500/10 border-2 border-purple-500/40"
                    : "bg-purple-500/5 border border-purple-500/20"
                }`}>
                  <p className="text-[10px] text-purple-400 font-bold mb-1">Agoda</p>
                  <p className="text-[10px] text-muted-foreground/60 mb-0.5 line-through">Public £{Math.round(opt.agodaPrice)}</p>
                  <p className="text-lg font-bold text-foreground">£{Math.round(opt.trainlineExclusivePrice)}</p>
                  <p className="text-[10px] text-trainline-success font-semibold">Exclusive rate</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="w-3 h-3" />{opt.hotelPoints} pts · +{opt.tierBoost}% tier
                </span>
                <span className="text-trainline-success font-semibold">
                  Save {Math.round(savingsPct)}% vs public rates
                </span>
              </div>
            </button>
          );
        })}
        </div>
      )}

      {/* Contextual Add-ons */}
      {selectedHotelId && onToggleAncillary && hasExtras && (
        <div className="mt-8 space-y-4">
          <div className="border-t border-border/30 pt-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Enhance your stay</h2>
            <div className="space-y-3">
              {/* Uber Transfer - Dubai */}
              {uberTransfer && city.includes("Dubai") && (
                <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAncillaryIds.includes(uberTransfer.id)}
                    onChange={() => onToggleAncillary(uberTransfer.id)}
                    className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{uberTransfer.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{uberTransfer.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{uberTransfer.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{uberTransfer.points} pts · Save £{Math.round(uberTransfer.marketPrice - uberTransfer.bundlePrice)}
                    </p>
                  </div>
                </label>
              )}

              {/* Private MPV Transfer */}
              {privateMPV && city.includes("Dubai") && (
                <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAncillaryIds.includes(privateMPV.id)}
                    onChange={() => onToggleAncillary(privateMPV.id)}
                    className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{privateMPV.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{privateMPV.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{privateMPV.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{privateMPV.points} pts · Save £{Math.round(privateMPV.marketPrice - privateMPV.bundlePrice)}
                    </p>
                  </div>
                </label>
              )}

              {/* Dubai Dining */}
              {dubaiDining && city.includes("Dubai") && (
                <label className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-card-gradient hover:border-border/60 cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={selectedAncillaryIds.includes(dubaiDining.id)}
                    onChange={() => onToggleAncillary(dubaiDining.id)}
                    className="mt-1 w-4 h-4 rounded border-border/40 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{dubaiDining.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{dubaiDining.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{dubaiDining.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{dubaiDining.points} pts · Save £{Math.round(dubaiDining.marketPrice - dubaiDining.bundlePrice)}
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
