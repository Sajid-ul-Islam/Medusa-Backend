import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { FeaturedPublishers } from "@/components/publisher/FeaturedPublishers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  Truck,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Gift,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Modern Hero Section with Mesh Gradient & Live Search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background/80 to-background py-20 md:py-28">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-primary/15 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider animate-in fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Independent Book Marketplace of Bangladesh</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Discover &amp; Collect Books from
            <br />
            <span className="text-primary bg-clip-text">Independent Publishers</span>
          </h1>

          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your premier bookstore for authentic physical paperbacks and instant DRM-protected digital eBooks with nationwide Pathao delivery and bKash checkout.
          </p>

          {/* Hero Live Search Form */}
          <form
            action="/books"
            method="GET"
            className="max-w-xl mx-auto flex items-center bg-card border rounded-2xl p-1.5 shadow-xl shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
          >
            <div className="pl-3 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="q"
              placeholder="Search by book title, author, Islamic Hadith, or ISBN..."
              className="flex-1 h-11 px-3 bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground/70"
            />
            <Button type="submit" className="h-10 px-5 text-xs font-bold rounded-xl gap-1.5 shadow-xs">
              Search
            </Button>
          </form>

          {/* Popular Search Keyword Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
            <span className="font-semibold text-foreground/80">Trending:</span>
            {[
              { label: "প্যারাডক্সিক্যাল সাজিদ", query: "sajid" },
              { label: "হুমায়ূন আহমেদ", query: "humayun" },
              { label: "Clean Code", query: "clean" },
              { label: "Algorithms", query: "algorithms" },
              { label: "সীরাত ও হাদীস", query: "hadith" },
            ].map((chip) => (
              <Link
                key={chip.label}
                href={`/books?q=${encodeURIComponent(chip.query)}`}
                className="px-2.5 py-1 rounded-lg bg-muted/40 hover:bg-primary/10 hover:text-primary border text-[11px] font-medium transition"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          {/* Trust Metrics Social Proof Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/50 max-w-3xl mx-auto text-xs">
            <div className="p-2.5 rounded-xl bg-card border">
              <div className="font-black text-base text-primary">15+</div>
              <div className="text-muted-foreground text-[11px]">Verified Publishers</div>
            </div>
            <div className="p-2.5 rounded-xl bg-card border">
              <div className="font-black text-base text-emerald-600">85%</div>
              <div className="text-muted-foreground text-[11px]">Publisher Royalty</div>
            </div>
            <div className="p-2.5 rounded-xl bg-card border">
              <div className="font-black text-base text-amber-500">64</div>
              <div className="text-muted-foreground text-[11px]">Districts Covered</div>
            </div>
            <div className="p-2.5 rounded-xl bg-card border">
              <div className="font-black text-base text-pink-600">100%</div>
              <div className="text-muted-foreground text-[11px]">Genuine Prints</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products with Category Tabs */}
      <FeaturedProducts />

      {/* Verified Publishers Carousel / Grid */}
      <FeaturedPublishers />

      {/* Why Choose BookHub Value Proposition */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black">Built for Readers &amp; Authors</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            A sustainable marketplace connecting independent book creators directly with passionate readers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border bg-card hover:shadow-md transition space-y-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">In-Browser Instant eBook Reader</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Read digital purchases immediately in your browser with distraction-free Sepia and Dark modes without installing heavy apps.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card hover:shadow-md transition space-y-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">Dynamic Anti-Piracy DRM Protection</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every digital purchase is dynamically stamped with purchaser license hashes, protecting publisher intellectual property.
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card hover:shadow-md transition space-y-3">
            <div className="h-12 w-12 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center text-xl">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base">Gift Wrapping &amp; Book Requests</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Send books as gifts with luxury ribbon wrapping and custom greeting notes, or request rare out-of-print books directly.
            </p>
          </div>
        </div>
      </section>

      {/* Publisher CTA Banner */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-amber-700 text-primary-foreground p-8 sm:p-12 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-black tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block">
              For Publishing Houses &amp; Writers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">Publish on BookHub Today</h2>
            <p className="text-xs sm:text-sm text-primary-foreground/90 max-w-lg">
              Set up your bookstore in 2 minutes, upload 500 books via Excel/CSV, and earn an industry-leading 85% revenue royalty.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button size="lg" variant="secondary" className="font-bold shadow-md" asChild>
              <Link href="/publisher/register">Open Your Bookstore →</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-bold bg-white/10 border-white/30 hover:bg-white/20 text-white" asChild>
              <Link href="/publisher/dashboard">Publisher Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
