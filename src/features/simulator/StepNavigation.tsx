/**
 * STEP NAVIGATION — Step progress and navigation controls.
 * Stateless, receives current step and callbacks.
 */

import { CheckCircle2, Navigation, Hotel, ArrowLeft, ArrowRight, Search, CreditCard, Map } from "lucide-react";
import type { Step } from "@/hooks/useJourneyState";
import { STEPS } from "@/hooks/useJourneyState";

const stepMeta = {
  search: { label: "Search", icon: Search },
  itinerary: { label: "Itinerary", icon: Map },
  transport: { label: "Transport", icon: Navigation },
  hotel: { label: "Hotel", icon: Hotel },
  payment: { label: "Payment", icon: CreditCard },
  checkout: { label: "Checkout", icon: CheckCircle2 },
} as const;

interface StepNavigationProps {
  currentStep: Step;
  stepIndex: number;
  onStepChange: (step: Step) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  isDone: boolean;
}

export function StepNavigation({
  currentStep,
  stepIndex,
  onStepChange,
  onPrevStep,
  onNextStep,
  isDone
}: StepNavigationProps) {
  return (
    <>
      {/* Step indicator bar */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-card/70 backdrop-blur border-b border-border/20">
        <div className="container mx-auto px-4 md:px-6 py-2">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {STEPS.map((s, i) => {
              const Icon = stepMeta[s].icon;
              const isActive = i === stepIndex;
              const isCompleted = i < stepIndex;
              const isPending = i > stepIndex;

              return (
                <button
                  key={s}
                  onClick={() => onStepChange(s)}
                  className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-primary/50"
                      : "text-muted-foreground/40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-teal-glow"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-[10px] font-medium hidden sm:block">{stepMeta[s].label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass-surface border-t border-border/20">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <button
            onClick={onPrevStep}
            disabled={stepIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-20 bg-secondary/80 text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex gap-1">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === stepIndex
                    ? "bg-primary w-5"
                    : i < stepIndex
                    ? "bg-primary/40"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          {isDone ? (
            <a
              href="/"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:shadow-teal-glow transition-all"
            >
              Done <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={onNextStep}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:shadow-teal-glow transition-all"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
