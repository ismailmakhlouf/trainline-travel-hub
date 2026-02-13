/**
 * TRIP DETAILS STEP — Destination and travel dates selection
 * Interactive screen for journey planning
 */

import { MapPin, Calendar, Users as UsersIcon, ArrowRight } from "lucide-react";
import { useState } from "react";

interface TripDetailsStepProps {
  onContinue: () => void;
}

const POPULAR_ROUTES = [
  { from: "London", to: "Paris", duration: "2h 15m", image: "🗼" },
  { from: "Paris", to: "Zürich", duration: "4h 10m", image: "🏔️" },
  { from: "Berlin", to: "Zürich", duration: "8h 30m", image: "🇨🇭" },
  { from: "London", to: "Dubai", duration: "7h 15m", image: "🏖️" },
];

export function TripDetailsStep({ onContinue }: TripDetailsStepProps) {
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [outboundDate, setOutboundDate] = useState("2026-03-15");
  const [returnDate, setReturnDate] = useState("2026-03-22");
  const [passengers, setPassengers] = useState({ adults: 2, children: 3, infants: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Plan Your <span className="text-gradient-gold">Journey</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Select your destination and travel dates
        </p>
      </div>

      {/* Popular Routes */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Popular Routes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {POPULAR_ROUTES.map((route, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRoute(idx)}
              className={`p-4 rounded-xl border transition-all text-left ${
                selectedRoute === idx
                  ? "border-primary/50 bg-primary/5 shadow-teal-glow"
                  : "border-border/30 bg-card-gradient hover:border-border/50"
              }`}
            >
              <div className="text-3xl mb-2">{route.image}</div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs">
                  <span className="font-semibold text-foreground">{route.from}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="font-semibold text-foreground">{route.to}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{route.duration}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Travel Dates */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Outbound Date
          </label>
          <input
            type="date"
            value={outboundDate}
            onChange={(e) => setOutboundDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border/30 bg-card-gradient text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Return Date
          </label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border/30 bg-card-gradient text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Passengers */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <UsersIcon className="w-4 h-4 text-primary" />
          Passengers
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-border/30 bg-card-gradient">
            <p className="text-xs text-muted-foreground mb-2">Adults (12+)</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                className="w-8 h-8 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground font-bold transition-colors"
              >
                −
              </button>
              <span className="text-xl font-bold text-foreground">{passengers.adults}</span>
              <button
                onClick={() => setPassengers(p => ({ ...p, adults: p.adults + 1 }))}
                className="w-8 h-8 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/30 bg-card-gradient">
            <p className="text-xs text-muted-foreground mb-2">Children (2-11)</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                className="w-8 h-8 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground font-bold transition-colors"
              >
                −
              </button>
              <span className="text-xl font-bold text-foreground">{passengers.children}</span>
              <button
                onClick={() => setPassengers(p => ({ ...p, children: p.children + 1 }))}
                className="w-8 h-8 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/30 bg-card-gradient">
            <p className="text-xs text-muted-foreground mb-2">Infants (0-1)</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPassengers(p => ({ ...p, infants: Math.max(0, p.infants - 1) }))}
                className="w-8 h-8 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground font-bold transition-colors"
              >
                −
              </button>
              <span className="text-xl font-bold text-foreground">{passengers.infants}</span>
              <button
                onClick={() => setPassengers(p => ({ ...p, infants: p.infants + 1 }))}
                className="w-8 h-8 rounded-lg bg-secondary/40 hover:bg-secondary/60 text-foreground font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary banner */}
      <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              {POPULAR_ROUTES[selectedRoute].from} → {POPULAR_ROUTES[selectedRoute].to}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(outboundDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              {' • '}
              {passengers.adults + passengers.children + passengers.infants} passenger{passengers.adults + passengers.children + passengers.infants !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onContinue}
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
