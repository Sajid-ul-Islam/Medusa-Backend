"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";
import {
  BookOpen,
  Send,
  CheckCircle2,
  Sparkles,
  Search,
  Clock,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function RequestBookPage() {
  const { success } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestRef, setRequestRef] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    format: "Physical Edition (Hardcover/Paperback)",
    customerName: "",
    phone: "",
    email: "",
    city: "Dhaka",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `REQ-BH-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestRef(refId);
    setIsSubmitted(true);
    success("Your book request has been received by our publisher network!", "Request Submitted");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Back button & Heading */}
      <div>
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition mb-4 font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Catalog
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl">
            📖
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Request a Book (বই রিকোয়েস্ট)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Can’t find a specific book, out-of-print classic, or rare edition? We will source it from our 15+ verified publishing partners.
            </p>
          </div>
        </div>
      </div>

      {isSubmitted ? (
        <div className="p-8 rounded-3xl border bg-card text-center space-y-4 shadow-md animate-in zoom-in-95">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold">Book Request Submitted Successfully!</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            We have broadcasted your request for <strong className="text-foreground font-bold">&quot;{formData.title}&quot;</strong> to our publisher network.
          </p>

          <div className="p-4 rounded-xl bg-muted/40 border inline-block text-left text-xs font-mono space-y-1">
            <div><span className="text-muted-foreground">Request Ref ID:</span> <strong>{requestRef}</strong></div>
            <div><span className="text-muted-foreground">Contact Phone:</span> <strong>{formData.phone}</strong></div>
            <div><span className="text-muted-foreground">Status:</span> <span className="text-amber-600 font-bold">Searching Publisher Warehouses</span></div>
          </div>

          <p className="text-xs text-muted-foreground">
            Our sourcing team will send you an SMS / WhatsApp message with price and delivery availability within 24–48 hours.
          </p>

          <div className="pt-2">
            <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm">
              Submit Another Request
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-xs">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Book Title / বইয়ের নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. কপালকুণ্ডলা or Clean Code"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Author Name / লেখকের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. বঙ্কিমচন্দ্র চট্টোপাধ্যায়"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Preferred Publisher (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. বাতিঘর, প্রথমা, O'Reilly"
                      value={formData.publisher}
                      onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Format Preference
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Physical Edition (Hardcover/Paperback)">Physical Print Edition (কাগজের বই)</option>
                    <option value="Instant Digital eBook (PDF/ePub)">Digital eBook (পিডিএফ বা ই-বুক)</option>
                    <option value="Any Available Format">Any Available Format (যে কোনো ফরম্যাট)</option>
                  </select>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                    Your Contact &amp; Delivery Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Ahmed"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Mobile Number (WhatsApp/bKash) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 01712-345678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Delivery City / জেলা
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Dhaka">Dhaka (ঢাকা)</option>
                      <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                      <option value="Sylhet">Sylhet (সিলেট)</option>
                      <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                      <option value="Khulna">Khulna (খুলনা)</option>
                      <option value="Barishal">Barishal (বরিশাল)</option>
                      <option value="Rangpur">Rangpur (রংপুর)</option>
                      <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Additional Notes or Specific Edition Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need the 2nd Edition with English notes..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 text-xs font-bold gap-2 shadow-sm">
                  <Send className="h-3.5 w-3.5" /> Submit Book Request to Publishers
                </Button>
              </form>
            </div>
          </div>

          {/* Sourcing Guarantee & Live Feed */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 bg-card rounded-2xl border shadow-xs space-y-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Sourcing Guarantee
              </h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Direct sourcing from 15+ registered Bangladeshi &amp; International publishers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>100% Genuine, authentic print guarantee with no pirated prints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Doorstep delivery across all 64 districts in Bangladesh via Pathao.</span>
                </li>
              </ul>
            </div>

            {/* Recent Sourced Requests Telemetry */}
            <div className="p-5 bg-card rounded-2xl border shadow-xs space-y-3">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" /> Recently Sourced Books
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { title: "গোরা (Gora)", author: "Rabindranath Tagore", status: "Delivered to Dhanmondi", time: "2h ago" },
                  { title: "System Design Interview", author: "Alex Xu", status: "Sourced from O'Reilly", time: "5h ago" },
                  { title: "কিশোর সমগ্র", author: "Mufti Shafi", status: "Dispatched to Sylhet", time: "1d ago" },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-muted/30 border space-y-0.5">
                    <div className="font-semibold text-foreground truncate">{item.title}</div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>{item.status}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
