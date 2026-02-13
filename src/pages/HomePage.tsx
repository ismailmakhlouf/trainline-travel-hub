/**
 * HOME PAGE — Landing page with choice between customer and executive views
 */

import { Link } from "react-router-dom";
import { Eye, BarChart3, ArrowRight, Sparkles } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          {/* Trainline Heart-Checkmark Logo */}
          <div className="flex justify-center mb-6">
            <svg width="64" height="64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 15C85 15 72 25 65 40C58 25 45 15 30 15C10 15 0 30 0 50C0 85 40 120 65 145L100 180L135 145C160 120 200 85 200 50C200 30 190 15 170 15C155 15 142 25 135 40C128 25 115 15 100 15Z" fill="#0AC18E"/>
              <path d="M75 90L60 105L85 130L140 75L125 60L85 100L75 90Z" fill="white" strokeWidth="8" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground">
            <span className="text-[#0AC18E]">trainline</span> Travel Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bundle rail, flights, hotels & extras in one seamless journey
          </p>
        </div>

        {/* View Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer View */}
          <Link
            to="/journey"
            className="group relative rounded-3xl border-2 border-primary/30 bg-card-gradient p-8 hover:border-primary/60 hover:shadow-teal-glow transition-all"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-primary" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">Customer Journey</h2>
                <p className="text-muted-foreground">
                  Experience the complete booking flow from search to checkout
                </p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Interactive multi-step booking flow
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Real-time pricing & bundle savings
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Loyalty points & tier progression
                </li>
              </ul>

              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                Start Journey
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Executive Dashboard */}
          <Link
            to="/executive"
            className="group relative rounded-3xl border-2 border-accent/30 bg-card-gradient p-8 hover:border-accent/60 hover:shadow-gold-glow transition-all"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">Executive Dashboard</h2>
                <p className="text-muted-foreground">
                  Revenue projections, partner metrics & fleet analytics
                </p>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Live revenue modeling at scale
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Partner & segment performance
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Adoption scenario planning
                </li>
              </ul>

              <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                View Analytics
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Interactive prototype demonstrating Trainline's Travel Hub vision</p>
        </div>
      </div>
    </div>
  );
}
