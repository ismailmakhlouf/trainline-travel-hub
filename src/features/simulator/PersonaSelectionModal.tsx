/**
 * PERSONA SELECTION MODAL
 * Appears when user clicks "Sign in" - lets them choose a demo persona
 */

import { X, Users, GraduationCap, Briefcase } from "lucide-react";
import type { PersonaType } from "@/domain/Persona";

interface PersonaOption {
  type: PersonaType;
  icon: typeof Users;
  name: string;
  description: string;
  travelers: string;
  color: string;
  bgColor: string;
}

const PERSONA_OPTIONS: PersonaOption[] = [
  {
    type: "Family",
    icon: Users,
    name: "Marcus & Anika Thompson",
    description: "Family of 5 traveling to Dubai",
    travelers: "2 adults + 3 children",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    type: "Student",
    icon: GraduationCap,
    name: "Priya Sharma",
    description: "Student traveling to visit family in Mumbai",
    travelers: "1 adult",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  {
    type: "Business",
    icon: Briefcase,
    name: "Sarah Chen",
    description: "Business traveler, frequent flyer",
    travelers: "1 adult",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10"
  }
];

interface PersonaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPersona: (persona: PersonaType, metadata: { name: string; travelers: string }) => void;
}

export function PersonaSelectionModal({ isOpen, onClose, onSelectPersona }: PersonaSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Choose Demo Persona</h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a pre-configured scenario to explore the platform
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Persona Options */}
        <div className="p-6 space-y-3">
          {PERSONA_OPTIONS.map((persona) => {
            const Icon = persona.icon;

            return (
              <button
                key={persona.type}
                onClick={() => {
                  onSelectPersona(persona.type, {
                    name: persona.name,
                    travelers: persona.travelers
                  });
                  onClose();
                }}
                className="w-full text-left p-5 rounded-xl border-2 border-slate-700 hover:border-[#23C2A6] bg-slate-900/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${persona.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-7 h-7 ${persona.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{persona.name}</h3>
                    <p className="text-sm text-slate-400 mb-2">{persona.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                        {persona.travelers}
                      </span>
                      <span className={`text-xs font-medium ${persona.color}`}>
                        {persona.type}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-slate-600 group-hover:text-[#23C2A6] transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700 px-6 py-4 bg-slate-900/50">
          <p className="text-xs text-slate-500 text-center">
            These are demo personas for showcasing the platform. Continue as guest to use your own travel details.
          </p>
        </div>
      </div>
    </div>
  );
}
