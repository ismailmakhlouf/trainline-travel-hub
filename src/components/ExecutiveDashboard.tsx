/**
 * EXECUTIVE DASHBOARD — Hardened fleet metrics display.
 * Zero inline arithmetic. All calculations via revenueModel helpers.
 * Fully derived from computed journey and fleet metrics.
 */

import { motion } from "framer-motion";
import { TrendingUp, Target, ArrowUpRight, Activity, PieChart, Globe, Star, Users } from "lucide-react";
import type { ComputedJourney } from "@/lib/pricingEngine";
import type { FleetMetrics } from "@/lib/revenueModel";
import {
  computeAdoptionScenarios,
  formatRevenue,
  formatAdoptionPercentage,
  calculateRevenueCapturePercentage,
} from "@/lib/revenueModel";
import { MONTHLY_JOURNEYS, LEGACY_REV_PER_JOURNEY } from "@/config/businessModel";
import { Slider } from "@/components/ui/slider";

interface ExecutiveDashboardProps {
  computed: ComputedJourney;
  fleet: FleetMetrics;
  adoptionRate: number;
  onAdoptionRateChange: (rate: number) => void;
}

export function ExecutiveDashboard({
  computed,
  fleet,
  adoptionRate,
  onAdoptionRateChange
}: ExecutiveDashboardProps) {
  const scenarios = computeAdoptionScenarios(fleet.revPerJourney);
  const revenueCapturePercentage = calculateRevenueCapturePercentage(LEGACY_REV_PER_JOURNEY, fleet.revPerJourney);

  return (
    <motion.div
      key="exec"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <p className="text-xs text-accent uppercase tracking-widest font-bold">
          Executive Dashboard — Live Fleet Projections
        </p>
        <h1 className="text-2xl md:text-3xl font-bold font-display">
          Revenue <span className="text-gradient-teal">At Scale</span>
        </h1>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto">
          All metrics update dynamically based on customer journey configuration
        </p>
      </div>

      {/* Adoption Rate Slider */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Adoption Rate</h3>
          <span className="text-lg font-bold text-primary">
            {formatAdoptionPercentage(adoptionRate)}%
          </span>
        </div>
        <Slider
          value={[adoptionRate * 100]}
          onValueChange={([v]) => onAdoptionRateChange(v / 100)}
          min={1}
          max={50}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>1%</span>
          <span>{fleet.adoptedJourneys.toLocaleString()} journeys/month</span>
          <span>50%</span>
        </div>
      </div>

      {/* Headline KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Monthly Rev Uplift",
            value: formatRevenue(fleet.monthlyUplift),
            sub: `from ${fleet.adoptedJourneys.toLocaleString()} journeys`,
            icon: TrendingUp,
            color: "text-trainline-success"
          },
          {
            label: "Annual Opportunity",
            value: formatRevenue(fleet.annualUplift),
            sub: `at ${formatAdoptionPercentage(adoptionRate)}% adoption`,
            icon: Target,
            color: "text-accent"
          },
          {
            label: "Avg Basket ×",
            value: `${fleet.basketMultiplier}×`,
            sub: `£${LEGACY_REV_PER_JOURNEY} → £${fleet.revPerJourney}`,
            icon: ArrowUpRight,
            color: "text-primary"
          },
          {
            label: "Margin Uplift",
            value: `+${fleet.marginUplift}%`,
            sub: computed.tierPoints > 500 ? "AI-optimized" : "Standard bundle",
            icon: Activity,
            color: "text-trainline-gold"
          },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-xl bg-card-gradient border border-border/30 p-4 text-center">
            <kpi.icon className={`w-5 h-5 ${kpi.color} mx-auto mb-2`} />
            <p className={`text-xl md:text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{kpi.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue Capture: Before vs After */}
      <div className="grid md:grid-cols-2 gap-4">
        <div
          className="rounded-2xl border border-destructive/20 p-5 space-y-3"
          style={{ background: "linear-gradient(135deg, hsl(0 15% 10%), hsl(0 10% 8%))" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <p className="text-xs font-bold text-destructive uppercase tracking-wider">
              Without Trainline Travel Hub
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Monthly Revenue (rail-only)</p>
            <p className="text-2xl font-bold text-destructive">
              {formatRevenue(fleet.monthlyRevLegacy)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Rev per Journey</p>
            <p className="text-lg font-bold text-destructive/60">£{LEGACY_REV_PER_JOURNEY}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Leakage per Journey</p>
            <p className="text-lg font-bold text-destructive/40">£{fleet.leakagePerJourney}</p>
          </div>
          <div className="h-2 rounded-full bg-destructive/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-destructive/50"
              style={{ width: `${revenueCapturePercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            Only {revenueCapturePercentage}% of journey value captured
          </p>
        </div>

        <div
          className="rounded-2xl border-2 border-primary/30 p-5 space-y-3 shadow-teal-glow"
          style={{ background: "linear-gradient(135deg, hsl(175 20% 10%), hsl(175 15% 8%))" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <p className="text-xs font-bold text-primary uppercase tracking-wider">
              With Trainline Travel Hub
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gradient-teal">
              {formatRevenue(fleet.monthlyRevHub)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Rev per Journey</p>
            <p className="text-lg font-bold text-foreground">£{fleet.revPerJourney}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div>
              <p className="text-[10px] text-muted-foreground">Ancillary Attach</p>
              <p className="text-base font-bold text-trainline-success">
                {fleet.ancillaryAttachRate}%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Cross-Partner Rev</p>
              <p className="text-base font-bold text-accent">{fleet.crossPartnerRevPct}%</p>
            </div>
          </div>
          <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
            <div className="h-full rounded-full bg-primary/60" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      {/* Affiliate Partner Revenue Breakdown - Bar Chart */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" /> Affiliate Partner Revenue
          </h3>
          <p className="text-xs text-muted-foreground">
            Monthly distribution · {fleet.detailedPartners.length} partners
          </p>
        </div>
        <div className="space-y-3">
          {fleet.detailedPartners.length > 0 ? (
            <>
              {fleet.detailedPartners
                .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
                .map((partner, idx) => {
                  const maxRevenue = Math.max(...fleet.detailedPartners.map(p => p.monthlyRevenue));
                  const widthPercentage = (partner.monthlyRevenue / maxRevenue) * 100;
                  const colors = [
                    'bg-primary',
                    'bg-accent',
                    'bg-trainline-success',
                    'bg-blue-500',
                    'bg-purple-500',
                    'bg-pink-500'
                  ];
                  const color = colors[idx % colors.length];

                  return (
                    <div key={`${partner.partnerName}-${idx}`} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{partner.partnerName}</span>
                          <span className="text-[10px] text-muted-foreground">({partner.category})</span>
                        </div>
                        <span className="font-bold text-foreground">{formatRevenue(partner.monthlyRevenue)}/mo</span>
                      </div>
                      <div className="h-8 rounded-lg bg-secondary/30 overflow-hidden relative">
                        <div
                          className={`h-full ${color} transition-all duration-500 flex items-center justify-end pr-2`}
                          style={{ width: `${Math.max(widthPercentage, 10)}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">
                            {formatRevenue(partner.annualRevenue)}/yr
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              Configure journey with flights, hotels & ancillaries to see partner revenue
            </p>
          )}
        </div>
      </div>

      {/* Segment Performance - Bar Chart */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <PieChart className="w-4 h-4 text-primary" /> Segment Performance
          </h3>
          <p className="text-xs text-muted-foreground">Revenue per journey by segment</p>
        </div>
        <div className="space-y-3">
          {fleet.segments.map((seg, idx) => {
            const maxRev = Math.max(...fleet.segments.map(s => s.revPerJourney));
            const widthPercentage = (seg.revPerJourney / maxRev) * 100;
            const segmentColors = [
              'bg-trainline-success',
              'bg-primary',
              'bg-accent'
            ];
            const color = segmentColors[idx % segmentColors.length];

            return (
              <div key={seg.segment} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${seg.highlight ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {seg.segment}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {seg.volumePct}% volume
                    </span>
                  </div>
                  <span className="font-bold text-foreground">£{seg.revPerJourney}</span>
                </div>
                <div className="h-10 rounded-lg bg-secondary/30 overflow-hidden relative">
                  <div
                    className={`h-full ${color} transition-all duration-500 flex items-center px-3 justify-between`}
                    style={{ width: `${Math.max(widthPercentage, 15)}%` }}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {seg.ancillaryAttach}% attach rate
                    </span>
                    <span className="text-[10px] font-bold text-white">
                      {seg.yoyGrowth} YoY
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adoption Scenario Curve */}
      <div className="rounded-2xl bg-card-gradient border border-border/30 p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4 text-trainline-gold" /> Adoption Scenario Modelling
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {scenarios.map(s => {
            const isActive = formatAdoptionPercentage(adoptionRate) === formatAdoptionPercentage(s.rate);
            return (
              <button
                key={s.label}
                onClick={() => onAdoptionRateChange(s.rate)}
                className={`rounded-xl border p-3 text-center transition-all ${
                  isActive
                    ? "border-primary/50 bg-primary/5 shadow-teal-glow"
                    : "border-border/40 hover:border-border/60"
                }`}
              >
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                  {s.label}
                </p>
                <p className="text-base font-bold text-foreground mt-1">
                  {formatRevenue(s.monthlyRev)}
                </p>
                <p className="text-[10px] text-muted-foreground">monthly</p>
                <p className="text-sm font-bold text-trainline-success mt-1">
                  +{formatRevenue(s.annualUplift)}
                </p>
                <p className="text-[10px] text-muted-foreground">annual uplift</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
        <Star className="w-3 h-3 text-primary animate-pulse-soft" />
        All metrics update live as you configure the customer journey
      </div>
    </motion.div>
  );
}
