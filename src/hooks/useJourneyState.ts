/* ══════════════════════════════════════════════════════
   JOURNEY STATE HOOK — Global simulation state.
   All UI components consume this hook.
   ══════════════════════════════════════════════════════ */

import { useState, useMemo, useCallback } from "react";
import {
  type JourneySelections,
  type ComputedJourney,
  getRailGroups,
  computeJourney,
  optimizeSelections,
} from "@/lib/pricingEngine";
import { computeFleetMetrics, type FleetMetrics } from "@/lib/revenueModel";
import { getDefaultSelections, getDefaultAdoptionRate } from "@/config/personas";
import type { PersonaType } from "@/domain/Persona";
import { getRouteData, type RouteData } from "@/data/routeData";
import {
  routeToRailGroups,
  routeToFlightOptions,
  routeToHotelOptions,
  getRouteSummary,
  getRouteAncillaryIds,
} from "@/lib/routeAdapter";

export type Step = "search" | "itinerary" | "transport" | "hotel" | "payment" | "checkout";
export const STEPS: Step[] = ["search", "itinerary", "transport", "hotel", "payment", "checkout"];
export type ViewMode = "customer" | "executive";

// Smart defaults based on persona
function defaultSelections(persona: PersonaType = "Family"): JourneySelections {
  return getDefaultSelections(persona);
}

export function useJourneyState() {
  // Start anonymous - no persona by default
  const [selections, setSelections] = useState<JourneySelections>(() => defaultSelections("Family"));
  const [step, setStep] = useState<Step>("search");
  const [view, setView] = useState<ViewMode>("customer");
  const [optimizing, setOptimizing] = useState(false);
  const [adoptionRate, setAdoptionRate] = useState(() => getDefaultAdoptionRate("Family"));
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [searchParams, setSearchParams] = useState<{
    from: string;
    to: string;
    departDate: string;
    departTime: string;
    returnDate?: string;
    adults: number;
    children: number;
    tripType: "one-way" | "return" | "open-return" | "multi-city";
  } | null>(null);
  const [personaMetadata, setPersonaMetadata] = useState<{
    name?: string;
    travelers?: string;
  }>({});

  // Use route-based rail groups if route is selected, otherwise fall back to default
  const railGroups = useMemo(() => {
    if (selectedRoute && searchParams) {
      return routeToRailGroups(selectedRoute, {
        adults: searchParams.adults,
        children: searchParams.children,
      });
    }
    return getRailGroups();
  }, [selectedRoute, searchParams]);

  // Route-based flight options
  const flightOptions = useMemo(() => {
    return routeToFlightOptions(selectedRoute);
  }, [selectedRoute]);

  // Route-based hotel options
  const hotelOptions = useMemo(() => {
    return routeToHotelOptions(selectedRoute);
  }, [selectedRoute]);

  // Route summary for display
  const routeSummary = useMemo(() => {
    if (!searchParams) return "";
    return getRouteSummary(selectedRoute, {
      adults: searchParams.adults,
      children: searchParams.children,
    });
  }, [selectedRoute, searchParams]);

  // Route-relevant ancillary IDs
  const routeAncillaryIds = useMemo(() => {
    return getRouteAncillaryIds(selectedRoute);
  }, [selectedRoute]);

  // Computed journey — recalculates on every selection change
  const computed: ComputedJourney = useMemo(
    () => computeJourney(selections),
    [selections]
  );

  // Pre-optimization snapshot (for before/after comparison)
  const preOptComputed: ComputedJourney = useMemo(
    () => computeJourney({ ...selections, optimized: false }),
    [selections]
  );

  // Fleet metrics — recalculates on adoption rate or journey change
  const fleet: FleetMetrics = useMemo(
    () => computeFleetMetrics(computed, adoptionRate),
    [computed, adoptionRate]
  );

  // ─── Actions ────────────────────────────────────────

  const selectPersona = useCallback((persona: PersonaType, metadata?: { name?: string; travelers?: string }) => {
    const newSelections = getDefaultSelections(persona);
    setSelections(newSelections);
    setAdoptionRate(getDefaultAdoptionRate(persona));
    if (metadata) {
      setPersonaMetadata(metadata);
    }
  }, []);

  const handleSearch = useCallback((params: {
    from: string;
    to: string;
    departDate: string;
    departTime: string;
    returnDate?: string;
    adults: number;
    children: number;
    tripType: "one-way" | "return" | "open-return" | "multi-city";
  }) => {
    setSearchParams(params);

    // For multi-city, don't try to load a single route
    if (params.tripType === "multi-city") {
      setSelectedRoute(null);
      return;
    }

    const route = getRouteData(params.from, params.to);
    setSelectedRoute(route);

    // Don't auto-assign persona - let user search anonymously
    // Persona is only set when user clicks "Sign in" and chooses one
  }, []);

  const selectRail = useCallback((groupKey: string, optionId: string) => {
    setSelections(prev => {
      // If clicking the same option, deselect it
      const currentSelection = prev.railSelections[groupKey];
      if (currentSelection === optionId) {
        const { [groupKey]: _, ...rest } = prev.railSelections;
        return { ...prev, railSelections: rest };
      }
      // Rail and flight are mutually exclusive - clear flight when selecting rail
      return {
        ...prev,
        railSelections: { ...prev.railSelections, [groupKey]: optionId },
        flightId: "", // Clear flight selection
      };
    });
  }, []);

  const selectFlight = useCallback((id: string) => {
    setSelections(prev => {
      // If clicking the same flight, deselect it
      if (prev.flightId === id) {
        return { ...prev, flightId: "" };
      }
      // Rail and flight are mutually exclusive - clear rail when selecting flight
      return {
        ...prev,
        flightId: id,
        railSelections: {}, // Clear all rail selections
      };
    });
  }, []);

  const selectHotel = useCallback((id: string) => {
    setSelections(prev => ({ ...prev, hotelId: id }));
  }, []);

  const toggleAncillary = useCallback((id: string) => {
    setSelections(prev => ({
      ...prev,
      ancillaryIds: prev.ancillaryIds.includes(id)
        ? prev.ancillaryIds.filter(x => x !== id)
        : [...prev.ancillaryIds, id],
    }));
  }, []);

  const handleOptimize = useCallback(() => {
    if (selections.optimized) return;
    setOptimizing(true);
    setTimeout(() => {
      setSelections(prev => optimizeSelections(prev));
      setOptimizing(false);
    }, 2500);
  }, [selections.optimized]);

  const resetJourney = useCallback(() => {
    setSelections(defaultSelections());
    setStep("search");
    setSelectedRoute(null);
    setSearchParams(null);
  }, []);

  // Step navigation
  const stepIndex = STEPS.indexOf(step);
  const nextStep = useCallback(() => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1]);
  }, [stepIndex]);
  const prevStep = useCallback(() => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1]);
  }, [stepIndex]);

  return {
    // State
    selections,
    step,
    stepIndex,
    view,
    optimizing,
    adoptionRate,
    selectedRoute,
    searchParams,
    personaMetadata,

    // Computed
    computed,
    preOptComputed,
    fleet,
    railGroups,
    flightOptions,
    hotelOptions,
    routeSummary,
    routeAncillaryIds,

    // Actions
    setStep,
    setView,
    setAdoptionRate,
    selectPersona,
    handleSearch,
    selectRail,
    selectFlight,
    selectHotel,
    toggleAncillary,
    handleOptimize,
    resetJourney,
    nextStep,
    prevStep,
  };
}
