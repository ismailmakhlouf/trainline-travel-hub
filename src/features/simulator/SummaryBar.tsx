/**
 * SUMMARY BAR — Live journey summary display.
 * No arithmetic. Displays computed results only.
 */

import { Star } from "lucide-react";
import type { ComputedJourney } from "@/lib/pricingEngine";

interface SummaryBarProps {
  computed: ComputedJourney;
}

export function SummaryBar({ computed }: SummaryBarProps) {
  return (
    <div className="fixed top-[6.5rem] left-0 right-0 z-30 bg-background/90 backdrop-blur border-b border-border/10">
      <div className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-muted-foreground">Package: </span>
            <span className="font-bold text-gradient-teal">£{computed.totalBundle}</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-muted-foreground">Saving: </span>
            <span className="font-bold text-trainline-success">{computed.savingsPct}%</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" style={{ color: computed.tier.color }} />
            <span className="font-bold" style={{ color: computed.tier.color }}>
              {computed.tier.name}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">{computed.totalLoyaltyPoints} pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
