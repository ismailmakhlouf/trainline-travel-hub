/**
 * PERSONA STEP — Traveler type selection
 * First step in booking flow to personalize the journey
 */

import { Users, GraduationCap, Briefcase, Check } from "lucide-react";
import type { PersonaType } from "@/domain/Persona";

interface PersonaStepProps {
  selectedPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
}

const PERSONAS = [
  {
    type: "Family" as PersonaType,
    icon: Users,
    title: "Family Travel",
    description: "Traveling with children",
    features: ["Child-friendly options", "Family discounts", "Flexible tickets", "Free eSIM"],
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },
  {
    type: "Student" as PersonaType,
    icon: GraduationCap,
    title: "Student",
    description: "Budget-conscious traveler",
    features: ["Best value fares", "Standard class", "Flexible dates", "Student discounts"],
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30"
  },
  {
    type: "Business" as PersonaType,
    icon: Briefcase,
    title: "Business",
    description: "Premium travel experience",
    features: ["First class seats", "Lounge access", "Priority boarding", "Flexible changes"],
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30"
  }
];

export function PersonaStep({ selectedPersona, onSelectPersona }: PersonaStepProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold font-display">
          Welcome to <span className="text-gradient-teal">Trainline Travel Hub</span>
        </h1>
        <p className="text-base text-muted-foreground">
          Tell us about your trip to get personalized recommendations
        </p>
      </div>

      {/* Persona Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {PERSONAS.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedPersona === persona.type;

          return (
            <button
              key={persona.type}
              onClick={() => onSelectPersona(persona.type)}
              className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                isSelected
                  ? `${persona.borderColor} ${persona.bgColor} shadow-lg scale-105`
                  : "border-border/30 bg-card-gradient hover:border-border/60 hover:scale-102"
              }`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${persona.bgColor} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${persona.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-1">{persona.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{persona.description}</p>

              {/* Features */}
              <div className="space-y-2">
                {persona.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                    <span className={isSelected ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info banner */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Smart recommendations:</span> We'll tailor your journey options, pricing, and ancillaries based on your selection
        </p>
      </div>
    </div>
  );
}
