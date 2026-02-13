/**
 * JOURNEY SIMULATOR — Main orchestration component.
 * Coordinates all step components with useJourneyState hook.
 * Zero arithmetic, fully modular.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Train, Eye, BarChart3, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useJourneyContext } from "@/contexts/JourneyContext";
import { LandingPage } from "./LandingPage";
import { PersonaSelectionModal } from "./PersonaSelectionModal";
import { ItinerarySummary } from "./ItinerarySummary";
import { TransportStep } from "./TransportStep";
import { HotelStep } from "./HotelStep";
import { PaymentStep } from "./PaymentStep";
import { CheckoutStep } from "./CheckoutStep";
import { SummaryBar } from "./SummaryBar";
import { StepNavigation } from "./StepNavigation";

export function JourneySimulator() {
  const [showPersonaModal, setShowPersonaModal] = useState(false);

  const {
    selections,
    step,
    stepIndex,
    computed,
    railGroups,
    flightOptions,
    hotelOptions,
    routeSummary,
    routeAncillaryIds,
    selectedRoute,
    searchParams,
    setStep,
    selectPersona,
    handleSearch,
    selectRail,
    selectFlight,
    selectHotel,
    toggleAncillary,
    nextStep,
    prevStep,
  } = useJourneyContext();

  const STEPS = ["search", "itinerary", "transport", "hotel", "payment", "checkout"] as const;
  const isDone = stepIndex === STEPS.length - 1;
  const showNavigation = step !== "search";

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Top bar - hide on landing page */}
      {showNavigation && (
        <div className="fixed top-0 left-0 right-0 z-50 glass-surface">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {/* Trainline Heart-Checkmark Logo */}
            <svg width="28" height="28" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 15C85 15 72 25 65 40C58 25 45 15 30 15C10 15 0 30 0 50C0 85 40 120 65 145L100 180L135 145C160 120 200 85 200 50C200 30 190 15 170 15C155 15 142 25 135 40C128 25 115 15 100 15Z" fill="#0AC18E"/>
              <path d="M75 90L60 105L85 130L140 75L125 60L85 100L75 90Z" fill="white" strokeWidth="8" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-[#0AC18E] text-base md:text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 700 }}>
              trainline
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">Travel Hub</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60"
            >
              <Home className="w-3 h-3" />
            </Link>
            <Link
              to="/executive"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60"
            >
              <BarChart3 className="w-3 h-3" />
              <span className="hidden sm:inline">Executive</span>
            </Link>
          </div>
        </div>
        </div>
      )}

      {/* Step navigation - hide on landing page */}
      {showNavigation && (
        <>
          <StepNavigation
            currentStep={step}
            stepIndex={stepIndex}
            onStepChange={setStep}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            isDone={isDone}
          />
          {/* Live summary bar */}
          <SummaryBar computed={computed} />
        </>
      )}

      {/* Main content */}
      <div className={`${showNavigation ? "pt-40 container mx-auto px-4 md:px-6 max-w-4xl" : ""}`}>
        <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {step === "search" && (
                <LandingPage
                  onSearch={(params) => {
                    handleSearch(params);
                    nextStep();
                  }}
                  onSignIn={() => setShowPersonaModal(true)}
                />
              )}

              {step === "itinerary" && (
                <ItinerarySummary
                  selectedRoute={selectedRoute}
                  searchParams={searchParams}
                  railGroups={railGroups}
                  flightOptions={flightOptions}
                  hotelOptions={hotelOptions}
                  onProceed={nextStep}
                />
              )}

              {step === "transport" && (
                <TransportStep
                  railGroups={railGroups}
                  selectedRails={selections.railSelections}
                  onSelectRail={selectRail}
                  flightOptions={flightOptions}
                  selectedFlightId={selections.flightId}
                  onSelectFlight={selectFlight}
                  routeSummary={routeSummary}
                  passengerCount={searchParams?.adults ?? 1}
                  selectedAncillaryIds={selections.ancillaryIds}
                  onToggleAncillary={toggleAncillary}
                  selectedRoute={selectedRoute}
                />
              )}

              {step === "hotel" && (
                <HotelStep
                  selectedHotelId={selections.hotelId}
                  onSelectHotel={selectHotel}
                  hotelOptions={hotelOptions}
                  destinationCity={selectedRoute?.hotelDestination?.city ?? selectedRoute?.to.split(' ')[0]}
                  selectedAncillaryIds={selections.ancillaryIds}
                  onToggleAncillary={toggleAncillary}
                  routeAncillaryIds={routeAncillaryIds}
                />
              )}

              {step === "payment" && (
                <PaymentStep
                  totalAmount={computed.totalBundle}
                  onConfirm={nextStep}
                />
              )}

              {step === "checkout" && (
                <CheckoutStep
                  computed={computed}
                  isOptimized={selections.optimized}
                />
              )}
            </motion.div>
          </AnimatePresence>
      </div>

      {/* Persona Selection Modal */}
      <PersonaSelectionModal
        isOpen={showPersonaModal}
        onClose={() => setShowPersonaModal(false)}
        onSelectPersona={(persona, metadata) => {
          selectPersona(persona, metadata);
          setShowPersonaModal(false);
        }}
      />
    </div>
  );
}
