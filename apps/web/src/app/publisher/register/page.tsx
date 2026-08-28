"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Store,
  CheckCircle2,
  Building,
  CreditCard,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function PublisherRegisterPage() {
  const router = useRouter();
  const { success } = useToast();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    storeName: "",
    publisherEmail: "",
    contactPerson: "",
    website: "",
    description: "",
    country: "United States",
    specialty: "Technology & Software",
    catalogFormat: "Both Physical & Digital",
    stripeAccountType: "Standard Connect",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      success(
        `Welcome to BookHub, ${formData.storeName}! Your publisher store is ready.`,
        "Store Created"
      );
      router.push("/publisher/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <Store className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Open Your Bookstore on BookHub
          </h1>
          <p className="text-muted-foreground text-sm mt-2 max-w-lg mx-auto">
            Join hundreds of independent publishers and university presses selling directly to readers globally with automated split payouts.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <span className="text-xs font-semibold">Store Info</span>
          </div>
          <div className="h-0.5 w-12 bg-border" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-xs font-semibold">Catalog</span>
          </div>
          <div className="h-0.5 w-12 bg-border" />
          <div className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 3
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="text-xs font-semibold">Payouts</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">1. Publisher & Storefront Info</h2>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Bookstore / Publishing House Name *
                </label>
                <input
                  type="text"
                  name="storeName"
                  placeholder="e.g. Cambridge Scholarly Press"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    name="publisherEmail"
                    placeholder="publishing@press.org"
                    value={formData.publisherEmail}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Primary Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Jane Doe (Editor in Chief)"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Publisher Description & Mission
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Briefly describe your editorial catalogue and readership..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.storeName || !formData.publisherEmail}
                >
                  Continue to Catalog Setup <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">2. Publication Categories</h2>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Primary Publication Domain
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option>Technology & Computer Science</option>
                  <option>Academic & University Textbooks</option>
                  <option>Literary Fiction & Novels</option>
                  <option>Non-Fiction, History & Science</option>
                  <option>Children & Young Adult</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Offered Format Options
                </label>
                <select
                  name="catalogFormat"
                  value={formData.catalogFormat}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option>Both Physical Print & Digital eBooks</option>
                  <option>Digital eBooks Only (PDF / ePub)</option>
                  <option>Physical Print Editions Only</option>
                </select>
              </div>

              <div className="p-4 bg-muted/40 rounded-xl border text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Digital Rights & Anti-Piracy Protection
                </div>
                <p>
                  All digital book uploads automatically receive digital watermark stamping with the purchasing customer's email and encrypted order tokens.
                </p>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)}>
                  Continue to Payouts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">3. Payouts & Stripe Connect</h2>

              <div className="p-5 bg-primary/5 border border-primary/20 rounded-xl text-sm space-y-3">
                <div className="flex items-center gap-2 font-bold text-primary">
                  <CreditCard className="h-5 w-5" /> Instant Split Payouts via Stripe Connect
                </div>
                <p className="text-xs text-muted-foreground">
                  When customers purchase your books, earnings are automatically split and deposited directly to your bank account after deducting platform commission.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Payout Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 rounded-lg border bg-background text-sm"
                >
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Australia</option>
                </select>
              </div>

              <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? "Launching Store..." : "Create Publisher Storefront"}
                  <Zap className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

