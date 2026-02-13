/**
 * ITINERARY SUMMARY — End-to-end journey overview
 * Shows complete itinerary with option to drill down into each section
 */

import { useState } from "react";
import { Train, Plane, Hotel as HotelIcon, ShoppingBag, ChevronDown, ChevronUp, Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import type { RouteData } from "@/data/routeData";
import type { RailGroup, FlightOption, HotelOption } from "@/lib/pricingEngine";

interface ItinerarySummaryProps {
  selectedRoute: RouteData | null;
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    departTime: string;
    returnDate?: string;
    adults: number;
    children: number;
    tripType: "one-way" | "return" | "open-return" | "multi-city";
  } | null;
  railGroups: RailGroup[];
  flightOptions: FlightOption[];
  hotelOptions: HotelOption[];
  onProceed: () => void;
}

export function ItinerarySummary({
  selectedRoute,
  searchParams,
  railGroups,
  flightOptions,
  hotelOptions,
  onProceed,
}: ItinerarySummaryProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasRail = railGroups.length > 0;
  const hasFlights = flightOptions.length > 0;
  const hasHotels = hotelOptions.length > 0;
  const travelerCount = (searchParams?.adults || 0) + (searchParams?.children || 0);

  // Calculate price ranges
  const railPriceRange = hasRail
    ? {
        min: Math.min(...railGroups.flatMap(g => g.options.map(o => o.bundlePrice))),
        max: Math.max(...railGroups.flatMap(g => g.options.map(o => o.bundlePrice))),
      }
    : null;

  const flightPriceRange = hasFlights
    ? {
        min: Math.min(...flightOptions.map(f => f.bundlePrice)),
        max: Math.max(...flightOptions.map(f => f.bundlePrice)),
      }
    : null;

  const hotelPriceRange = hasHotels
    ? {
        min: Math.min(...hotelOptions.map(h => h.trainlineExclusivePrice)),
        max: Math.max(...hotelOptions.map(h => h.trainlineExclusivePrice)),
      }
    : null;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground">
          Your <span className="text-gradient-teal">Journey</span> Awaits
        </h1>
        <p className="text-muted-foreground">
          Review your itinerary and customize your perfect trip
        </p>
      </div>

      {/* Journey Overview Card */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-6 shadow-card space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{searchParams?.from} → {searchParams?.to}</h2>
            <p className="text-sm text-muted-foreground">
              {searchParams?.departDate} · {travelerCount} traveler{travelerCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Transport Section */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 shadow-card overflow-hidden">
        <button
          onClick={() => toggleSection('transport')}
          className="w-full p-5 flex items-center justify-between hover:bg-primary/5 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              {hasFlights ? <Plane className="w-5 h-5 text-primary" /> : <Train className="w-5 h-5 text-primary" />}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground">Transport</h3>
              <p className="text-sm text-muted-foreground">
                {hasRail && hasFlights ? `${railGroups.length} rail options · ${flightOptions.length} flights` :
                 hasRail ? `${railGroups.length} rail options available` :
                 hasFlights ? `${flightOptions.length} flights available` :
                 'No transport configured'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {(railPriceRange || flightPriceRange) && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground">from</p>
                <p className="text-lg font-bold text-primary">
                  £{Math.round(Math.min(railPriceRange?.min || Infinity, flightPriceRange?.min || Infinity))}
                </p>
              </div>
            )}
            {expandedSections['transport'] ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>

        {expandedSections['transport'] && (
          <div className="border-t border-border/30 p-5 space-y-4 bg-secondary/20">
            {hasRail && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Train className="w-4 h-4" />
                  Rail Options
                </div>
                <div className="grid gap-2">
                  {railGroups.slice(0, 2).map(group => (
                    <div key={group.key} className="text-sm text-muted-foreground pl-6">
                      {group.label} · {group.options.length} class{group.options.length > 1 ? 'es' : ''} · from £{Math.round(Math.min(...group.options.map(o => o.bundlePrice)))}
                    </div>
                  ))}
                  {railGroups.length > 2 && (
                    <div className="text-sm text-muted-foreground pl-6">
                      +{railGroups.length - 2} more option{railGroups.length - 2 > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            )}

            {hasFlights && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Plane className="w-4 h-4" />
                  Flight Options
                </div>
                <div className="grid gap-2">
                  {flightOptions.slice(0, 3).map(flight => (
                    <div key={flight.id} className="text-sm text-muted-foreground pl-6">
                      {flight.airline} · {flight.time} · £{Math.round(flight.bundlePrice)}
                    </div>
                  ))}
                  {flightOptions.length > 3 && (
                    <div className="text-sm text-muted-foreground pl-6">
                      +{flightOptions.length - 3} more option{flightOptions.length - 3 > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hotel Section */}
      {hasHotels && (
        <div className="rounded-2xl bg-card-gradient border border-border/30 shadow-card overflow-hidden">
          <button
            onClick={() => toggleSection('hotel')}
            className="w-full p-5 flex items-center justify-between hover:bg-accent/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <HotelIcon className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-foreground">Accommodation</h3>
                <p className="text-sm text-muted-foreground">
                  {hotelOptions.length} hotel{hotelOptions.length > 1 ? 's' : ''} in {selectedRoute?.hotelDestination?.city || searchParams?.to}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {hotelPriceRange && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">from</p>
                  <p className="text-lg font-bold text-accent">
                    £{Math.round(hotelPriceRange.min)}
                  </p>
                </div>
              )}
              {expandedSections['hotel'] ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </button>

          {expandedSections['hotel'] && (
            <div className="border-t border-border/30 p-5 space-y-2 bg-secondary/20">
              {hotelOptions.slice(0, 3).map(hotel => (
                <div key={hotel.id} className="text-sm text-muted-foreground pl-6">
                  {hotel.name} · {hotel.stars}★ · Exclusive rate from £{Math.round(hotel.trainlineExclusivePrice)}
                </div>
              ))}
              {hotelOptions.length > 3 && (
                <div className="text-sm text-muted-foreground pl-6">
                  +{hotelOptions.length - 3} more option{hotelOptions.length - 3 > 1 ? 's' : ''}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Extras Section */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 shadow-card overflow-hidden">
        <button
          onClick={() => toggleSection('extras')}
          className="w-full p-5 flex items-center justify-between hover:bg-secondary transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground">Extras & Add-ons</h3>
              <p className="text-sm text-muted-foreground">
                Lounges, transfers, eSIM & more
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {expandedSections['extras'] ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </button>

        {expandedSections['extras'] && (
          <div className="border-t border-border/30 p-5 bg-secondary/20">
            <p className="text-sm text-muted-foreground">
              Add extras during booking to enhance your journey and earn bonus points
            </p>
          </div>
        )}
      </div>

      {/* Benefits Banner */}
      <div className="rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/30 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Bundle & Save with Travel Hub</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Exclusive negotiated rates across all partners</li>
              <li>• Earn loyalty points on every booking component</li>
              <li>• One checkout for your entire journey</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <button
        onClick={onProceed}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-teal-glow transition-all flex items-center justify-center gap-2"
      >
        Customize Your Journey
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-center text-xs text-muted-foreground">
        You'll be able to customize every aspect of your trip in the next steps
      </p>
    </div>
  );
}
