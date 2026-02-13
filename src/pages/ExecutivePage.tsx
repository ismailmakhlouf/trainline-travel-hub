/**
 * EXECUTIVE PAGE — Standalone executive dashboard view
 * Completely separate from customer journey flow
 */

import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Home } from "lucide-react";
import { useJourneyContext } from "@/contexts/JourneyContext";
import { ExecutiveDashboard } from "@/components/ExecutiveDashboard";

export function ExecutivePage() {
  const { computed, fleet, adoptionRate, setAdoptionRate } = useJourneyContext();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-surface border-b border-border/20">
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
            <span className="text-xs text-muted-foreground hidden sm:inline">Executive Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60"
            >
              <Home className="w-3 h-3" />
            </Link>
            <Link
              to="/journey"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all text-muted-foreground hover:text-foreground border border-border/30 hover:border-border/60"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Customer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12 container mx-auto px-4 md:px-6 max-w-6xl">
        <ExecutiveDashboard
          computed={computed}
          fleet={fleet}
          adoptionRate={adoptionRate}
          onAdoptionRateChange={setAdoptionRate}
        />
      </div>

      {/* Back to Customer View */}
      <div className="fixed bottom-6 right-6">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-teal-glow hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customer Journey
        </Link>
      </div>
    </div>
  );
}
