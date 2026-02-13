/**
 * OPTIMIZE STEP — Stateless optimization display component.
 * No arithmetic. All calculations via pricingEngine.
 */

import { motion } from "framer-motion";
import { Zap, Settings2, DollarSign, TrendingUp, Award, Plane } from "lucide-react";
import type { ComputedJourney } from "@/lib/pricingEngine";
import { calculateBonusMiles } from "@/lib/pricingEngine";

interface OptimizeStepProps {
  isOptimized: boolean;
  optimizing: boolean;
  currentJourney: ComputedJourney;
  preOptJourney: ComputedJourney;
  onOptimize: () => void;
}

export function OptimizeStep({
  isOptimized,
  optimizing,
  currentJourney,
  preOptJourney,
  onOptimize
}: OptimizeStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto">
          <Zap className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          {isOptimized ? "Journey Optimized" : "Optimize My Journey"}
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {isOptimized
            ? "Databricks AI has recalculated your bundle for maximum savings and tier progression."
            : "Review your complete journey below, then let Databricks AI optimize pricing, loyalty, and tier benefits."}
        </p>
      </div>

      {isOptimized ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-secondary/40 border border-border/30 p-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                Before Optimization
              </p>
              <p className="text-lg font-bold text-muted-foreground line-through">
                £{preOptJourney.totalBundle}
              </p>
              <p className="text-xs text-muted-foreground">{preOptJourney.totalLoyaltyPoints} pts</p>
            </div>
            <div className="rounded-xl bg-trainline-success/5 border-2 border-trainline-success/30 p-4 text-center shadow-teal-glow">
              <p className="text-[10px] text-trainline-success uppercase tracking-wider font-bold mb-1">
                After Optimization
              </p>
              <p className="text-lg font-bold text-foreground">£{currentJourney.totalBundle}</p>
              <p className="text-xs text-trainline-success font-semibold">
                {currentJourney.tierPoints} pts (+{currentJourney.tierPoints - preOptJourney.totalLoyaltyPoints} bonus)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Price Saved",
                value: `£${preOptJourney.totalBundle - currentJourney.totalBundle}`,
                icon: DollarSign,
                color: "text-trainline-success"
              },
              {
                label: "Total Savings",
                value: `${currentJourney.savingsPct}%`,
                icon: TrendingUp,
                color: "text-trainline-success"
              },
              {
                label: "Tier Progress",
                value: `+${currentJourney.tierPoints - preOptJourney.totalLoyaltyPoints} pts`,
                icon: Award,
                color: "text-accent"
              },
              {
                label: "Bonus Miles",
                value: `+${calculateBonusMiles(currentJourney.airlineMiles)}`,
                icon: Plane,
                color: "text-primary"
              },
            ].map(item => (
              <div key={item.label} className="rounded-xl bg-card-gradient border border-border/30 p-4 text-center">
                <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
                <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                <p className="text-[10px] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl bg-secondary/40 border border-border/30 p-4 text-center w-full max-w-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Current Package Total
            </p>
            <p className="text-2xl font-bold text-foreground">£{currentJourney.totalBundle}</p>
            <p className="text-xs text-muted-foreground">
              {currentJourney.totalLoyaltyPoints} pts · {currentJourney.tier.name} tier
            </p>
          </div>

          <button
            onClick={onOptimize}
            disabled={optimizing}
            className="px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg hover:shadow-gold-glow transition-all disabled:opacity-50"
          >
            {optimizing ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Settings2 className="w-5 h-5" />
                </motion.div>
                Recalculating bundle…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" /> Optimize My Journey
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
