"use client";

import { useState } from "react";
import { Crown, Zap, CheckCircle2, ShieldCheck, Sparkles, Truck, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaaSSubscriptionTabProps {
  currentPlan: "starter" | "pro" | "enterprise";
  onChangePlan: (plan: "starter" | "pro" | "enterprise") => void;
}

export function SaaSSubscriptionTab({ currentPlan, onChangePlan }: SaaSSubscriptionTabProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  const plans = [
    {
      id: "starter" as const,
      name: "Starter Publisher",
      price: "৳0",
      period: "Free Forever",
      description: "Ideal for self-published indie authors and small regional presses.",
      features: [
        "Up to 25 Published Titles",
        "5% Marketplace Commission",
        "Standard Pathao Logistics Integration",
        "Community Support",
      ],
      icon: Sparkles,
      color: "border-border",
    },
    {
      id: "pro" as const,
      name: "Pro Publisher Tier",
      price: "৳1,499",
      period: "per month",
      description: "For active commercial publishing houses requiring custom domains and DRM.",
      features: [
        "Unlimited Published Titles",
        "Only 2.5% Marketplace Commission",
        "Anti-Piracy Dynamic DRM Watermarking",
        "Custom Subdomain Branding",
        "Steadfast & Pathao Automated Waybills",
        "Priority 24/7 Phone Support",
      ],
      icon: Crown,
      color: "border-primary ring-2 ring-primary/20",
      badge: "⭐ Most Popular",
    },
    {
      id: "enterprise" as const,
      name: "Enterprise Multi-Store",
      price: "৳4,999",
      period: "per month",
      description: "Full white-label SaaS suite with custom apex domain and dedicated account manager.",
      features: [
        "Everything in Pro Tier",
        "Zero Marketplace Commission (0%)",
        "Custom Apex Domain (yourstore.com.bd)",
        "Direct Bank API Payout Settlements",
        "Dedicated Account Executive",
      ],
      icon: ShieldCheck,
      color: "border-amber-500/40",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-foreground">SaaS Publisher Subscription &amp; Tier Plans</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Choose the right operational tier for your publication volume, DRM security, and delivery needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrent = plan.id === selectedPlan;
          return (
            <div
              key={plan.id}
              className={`p-6 rounded-3xl border bg-card relative flex flex-col justify-between shadow-xs transition-all ${
                isCurrent ? "border-primary ring-2 ring-primary/20 shadow-md" : "border-border hover:border-primary/30"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-primary text-primary-foreground shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {plan.name}
                  </span>
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-black text-foreground">{plan.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">{plan.period}</span>
                </div>

                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-2.5 text-xs text-muted-foreground mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="button"
                variant={isCurrent ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedPlan(plan.id);
                  onChangePlan(plan.id);
                }}
                className="w-full rounded-xl font-bold"
              >
                {isCurrent ? "Current Active Plan" : "Upgrade to this Plan"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
