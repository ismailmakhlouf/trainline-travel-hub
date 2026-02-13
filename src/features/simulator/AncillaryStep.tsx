/**
 * ANCILLARY STEP — Stateless ancillary selection component.
 * No arithmetic. All calculations via pricingEngine.
 */

import { CheckCircle2, Wifi, TrendingDown } from "lucide-react";
import { ANCILLARY_OPTIONS, isAncillaryFree, type TierDef } from "@/lib/pricingEngine";
import type { PersonaType } from "@/domain/Persona";

interface AncillaryStepProps {
  selectedAncillaryIds: string[];
  currentTier: TierDef;
  currentPersona: PersonaType;
  onToggleAncillary: (id: string) => void;
  routeAncillaryIds?: string[];
}

export function AncillaryStep({ selectedAncillaryIds, currentTier, currentPersona, onToggleAncillary, routeAncillaryIds }: AncillaryStepProps) {
  const categories = ["Connectivity", "Lounge", "Transfer", "Dining", "Extras"] as const;

  // Filter ancillaries based on route if provided
  const relevantAncillaries = routeAncillaryIds && routeAncillaryIds.length > 0
    ? ANCILLARY_OPTIONS.filter(a => routeAncillaryIds.includes(a.id))
    : ANCILLARY_OPTIONS;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Add <span className="text-gradient-teal">Extras</span>
        </h1>
        <p className="text-sm text-muted-foreground">Toggle ancillaries — prices update live</p>
      </div>

      {categories.map(cat => {
        const items = relevantAncillaries.filter(a => a.category === cat);
        if (items.length === 0) return null;

        return (
          <div key={cat} className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {cat}
            </h3>
            {items.map(item => {
              const selected = selectedAncillaryIds.includes(item.id);
              const isTierFree = isAncillaryFree(item, currentTier);
              const isPersonaFree = item.freeForPersonas?.includes(currentPersona) ?? false;
              const isFree = isTierFree || isPersonaFree;
              const isConnectivity = item.category === "Connectivity";

              return (
                <div key={item.id}>
                  <button
                    onClick={() => onToggleAncillary(item.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selected
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/30 bg-card-gradient hover:border-border/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          selected ? "border-primary bg-primary" : "border-muted-foreground/30"
                        }`}>
                          {selected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">{item.name}</p>
                            {isConnectivity && <Wifi className="w-3 h-3 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{item.points} pts</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {isFree ? (
                          <div>
                            <span className="text-sm font-bold text-trainline-success">FREE</span>
                            <p className="text-[10px] text-accent font-medium">
                              {isPersonaFree ? item.freeLabel : item.freeLabel}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <span className="text-xs text-muted-foreground line-through">
                              £{item.marketPrice}
                            </span>
                            <span className="text-sm font-bold text-foreground ml-2">
                              £{item.bundlePrice}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Roaming comparison for eSIM */}
                    {isConnectivity && item.roamingComparison && (
                      <div className="mt-3 pt-3 border-t border-border/20">
                        <div className="flex items-start gap-2 text-xs">
                          <TrendingDown className="w-4 h-4 text-trainline-success mt-0.5" />
                          <div>
                            <p className="text-muted-foreground">
                              <span className="font-semibold text-foreground">{item.roamingComparison.carrierName}</span>
                              {" "}roaming pack: <span className="line-through">£{item.roamingComparison.roamingPackPrice}</span>
                              {" "}({item.roamingComparison.roamingPackDuration})
                            </p>
                            <p className="text-trainline-success font-medium mt-0.5">
                              Save £{item.roamingComparison.roamingPackPrice - (isFree ? 0 : item.bundlePrice)} vs your carrier
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
