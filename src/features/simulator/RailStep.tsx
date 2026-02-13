/**
 * RAIL STEP — Stateless rail selection component.
 * No arithmetic. All calculations via pricingEngine.
 */

import { Train, Users, Clock, Coffee } from "lucide-react";
import type { RailGroup } from "@/lib/pricingEngine";
import { calculateSavingsPercentage } from "@/lib/pricingEngine";
import { ANCILLARY_OPTIONS } from "@/data/ancillaryOptions";
import type { RouteData } from "@/data/routeData";

interface RailStepProps {
  railGroups: RailGroup[];
  selectedRails: Record<string, string>;
  onSelectRail: (groupKey: string, optionId: string) => void;
  selectedAncillaryIds?: string[];
  onToggleAncillary?: (id: string) => void;
  selectedRoute?: RouteData | null;
}

export function RailStep({ railGroups, selectedRails, onSelectRail, selectedAncillaryIds = [], onToggleAncillary, selectedRoute }: RailStepProps) {
  // Get relevant ancillaries for rail
  const stPancrasLounge = ANCILLARY_OPTIONS.find(a => a.id === "anc1");
  const zurichLounge = ANCILLARY_OPTIONS.find(a => a.id === "anc2");
  const pret = ANCILLARY_OPTIONS.find(a => a.id === "anc5");

  // Determine which lounges to show based on route
  const hasAtLeastOneSelection = Object.keys(selectedRails).length > 0;
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Select <span className="text-gradient-teal">Rail</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Choose rail options for each traveler · Standard / Flexible / First Class
        </p>
      </div>

      {railGroups.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Train className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Route not yet configured</p>
          <p className="text-xs mt-1">This route combination is not available yet</p>
        </div>
      ) : (
        railGroups.map(group => (
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
                          £{opt.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{opt.bundlePrice}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-trainline-success">
                        Save {savingsPct}%
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )))}

      {/* Contextual Add-ons */}
      {hasAtLeastOneSelection && onToggleAncillary && (
        <div className="mt-8 space-y-4">
          <div className="border-t border-border/30 pt-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Enhance your journey</h2>
            <div className="space-y-3">
              {/* St Pancras Lounge */}
              {stPancrasLounge && (selectedRoute?.from.includes("London") || selectedRoute?.from.includes("St Pancras")) && (
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
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{stPancrasLounge.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{stPancrasLounge.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{stPancrasLounge.points} pts · Save £{stPancrasLounge.marketPrice - stPancrasLounge.bundlePrice}
                    </p>
                  </div>
                </label>
              )}

              {/* Zürich Lounge */}
              {zurichLounge && (selectedRoute?.to.includes("Zürich") || selectedRoute?.to.includes("Zurich")) && (
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
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{zurichLounge.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{zurichLounge.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{zurichLounge.points} pts · Save £{zurichLounge.marketPrice - zurichLounge.bundlePrice}
                    </p>
                  </div>
                </label>
              )}

              {/* Pret Meal Bundle */}
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
                        <span className="text-xs text-muted-foreground line-through mr-2">
                          £{pret.marketPrice}
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          £{pret.bundlePrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +{pret.points} pts · Save £{pret.marketPrice - pret.bundlePrice}
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
