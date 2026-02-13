/**
 * CHECKOUT STEP — Booking confirmation screen
 * Shows booking summary and confirmation
 */

import { CheckCircle2, Mail, Calendar, MapPin, Train, Plane, Hotel, Star, Award } from "lucide-react";
import type { ComputedJourney } from "@/lib/pricingEngine";

interface CheckoutStepProps {
  computed: ComputedJourney;
  isOptimized: boolean;
}

export function CheckoutStep({ computed, isOptimized }: CheckoutStepProps) {
  const bookingRef = `TL${Date.now().toString().slice(-8)}`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-trainline-success/20 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-trainline-success" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground">
          Your journey is all set. We've sent the details to your email.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-foreground font-medium">confirmation@trainline.com</span>
        </div>
      </div>

      {/* Booking Reference */}
      <div className="rounded-xl bg-primary/10 border-2 border-primary/40 p-4 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Booking Reference</p>
        <p className="text-2xl font-bold text-primary font-mono">{bookingRef}</p>
      </div>

      {/* Journey Summary */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-6 shadow-card space-y-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Journey Summary
        </h2>

        {/* Transport */}
        {computed.rail.bundle > 0 && (
          <div className="flex items-start gap-4 pb-4 border-b border-border/20">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Train className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Rail Journey</p>
              <p className="text-sm text-muted-foreground">{computed.rail.route}</p>
            </div>
            <p className="text-lg font-bold text-foreground">£{Math.round(computed.rail.bundle)}</p>
          </div>
        )}

        {computed.flight.bundle > 0 && (
          <div className="flex items-start gap-4 pb-4 border-b border-border/20">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{computed.flight.airline}</p>
              <p className="text-sm text-muted-foreground">{computed.flight.route} · {computed.flight.time}</p>
            </div>
            <p className="text-lg font-bold text-foreground">£{Math.round(computed.flight.bundle)}</p>
          </div>
        )}

        {computed.hotel.bundle > 0 && (
          <div className="flex items-start gap-4 pb-4 border-b border-border/20">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
              <Hotel className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{computed.hotel.name}</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                ))}
                · 3 nights
              </p>
            </div>
            <p className="text-lg font-bold text-foreground">£{Math.round(computed.hotel.bundle)}</p>
          </div>
        )}

        {computed.ancillaries.bundle > 0 && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Extras & Add-ons</p>
              <p className="text-sm text-muted-foreground">Lounges, transfers, connectivity</p>
            </div>
            <p className="text-lg font-bold text-foreground">£{Math.round(computed.ancillaries.bundle)}</p>
          </div>
        )}

        {/* Total */}
        <div className="pt-4 border-t-2 border-border/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Market Price</span>
            <span className="text-lg text-muted-foreground line-through">£{Math.round(computed.totalMarket)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-foreground">Total Paid</span>
            <span className="text-3xl font-bold text-primary">£{Math.round(computed.totalBundle)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-trainline-success font-semibold">Total Savings</span>
            <span className="text-xl font-bold text-trainline-success">
              £{Math.round(computed.totalSavings)} ({Math.round(computed.savingsPct)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Loyalty Earned */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-6 shadow-card space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          Loyalty Earned
        </h2>
        <div className={`grid ${computed.flight.bundle > 0 && computed.hotel.bundle > 0 ? 'grid-cols-3' : computed.flight.bundle > 0 || computed.hotel.bundle > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
          <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 text-center">
            <p className="text-2xl font-bold text-primary">{computed.trainlinePoints || 0}</p>
            <p className="text-xs text-muted-foreground mt-1">Trainline Points</p>
          </div>
          {computed.flight.bundle > 0 && (
            <div className="rounded-lg bg-accent/10 border border-accent/30 p-4 text-center">
              <p className="text-2xl font-bold text-accent">{computed.airlineMiles || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">{computed.flight.airline} Miles</p>
            </div>
          )}
          {computed.hotel.bundle > 0 && (
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4 text-center">
              <p className="text-2xl font-bold text-amber-400">{computed.hotelPoints || 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Hotel Points</p>
            </div>
          )}
        </div>

        {/* Tier Status */}
        <div className="rounded-xl bg-secondary/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Your Tier Status</span>
            <span className="text-base font-bold flex items-center gap-1.5" style={{ color: computed.tier.color }}>
              <Star className="w-4 h-4" fill={computed.tier.color} />
              {computed.tier.name}
            </span>
          </div>
          {computed.nextTier && (
            <>
              <div className="h-3 rounded-full bg-background overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${computed.tierProgress}%`,
                    background: `linear-gradient(90deg, ${computed.tier.color}, ${computed.nextTier.color})`
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {computed.nextTier.min - computed.tierPoints} more points to reach{" "}
                <span style={{ color: computed.nextTier.color }} className="font-semibold">
                  {computed.nextTier.name}
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Confirmation sent to your email</p>
            <p className="text-xs text-muted-foreground">
              You'll receive separate confirmations from each provider (rail, airline, hotel) within the next 24 hours.
              Your booking reference is <span className="font-mono font-semibold text-primary">{bookingRef}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
