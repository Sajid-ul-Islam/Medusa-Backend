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
  Download,
  Flame,
  Feather,
} from "lucide-react";

export default function Home() {
  const trendingSearches = [
    { label: "Paradoxical Sajid", query: "sajid" },
    { label: "Data Intensive Apps", query: "data-intensive" },
    { label: "Ar-Raheeq Al-Makhtum", query: "makhtum" },
    { label: "Clean Architecture", query: "architecture" },
    { label: "Humayun Ahmed", query: "humayun" },
  ];

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

          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Your premier bookstore for authentic physical paperbacks and instant DRM-protected digital eBooks with nationwide Pathao delivery and bKash checkout.
          </p>

          {/* Hero Live Search Form with Hotkey Pill */}
          <form
            action="/books"
            method="GET"
            className="max-w-xl mx-auto flex items-center bg-card border rounded-2xl p-1.5 shadow-xl shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/25 transition-all"
          >
            <div className="pl-3.5 text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              name="q"
              placeholder="Search by title, author, Islamic Hadith, or ISBN..."
              className="flex-1 h-11 px-3 bg-transparent text-sm focus:outline-none text-foreground placeholder:text-muted-foreground/70"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 text-[10px] font-mono font-bold text-muted-foreground bg-muted rounded-lg mr-2 border">
              ⌘K
            </kbd>
            <Button type="submit" className="h-10 px-5 text-xs font-bold rounded-xl gap-1.5 shadow-xs active:scale-95">
              Search
            </Button>
          </form>

          {/* Trending Searches Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
            <span className="text-muted-foreground font-semibold flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-red-500 animate-flame" /> Trending:
            </span>
            {trendingSearches.map((item) => (
              <Link
                key={item.query}
                href={`/books?q=${encodeURIComponent(item.query)}`}
                className="px-2.5 py-1 rounded-full bg-muted/80 hover:bg-primary/10 hover:text-primary transition text-muted-foreground font-medium text-[11px] border border-transparent hover:border-primary/20"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Social Proof & Trust Metrics Ribbon */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-border/60">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-foreground">15+</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">Publishing Houses</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-foreground">1,200+</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">Authentic Titles</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-foreground">24-48h</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">Pathao Express BD</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-black text-foreground">100%</div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">Anti-Piracy Watermark</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Products Catalog */}
      <FeaturedProducts />

      {/* Certified Publishers Section */}
      <FeaturedPublishers />

      {/* Value Propositions / Trust Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Why Readers Love BookHub
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            The Marketplace Built for Book Lovers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl border bg-card/60 backdrop-blur-xs shadow-xs hover:border-primary/40 transition group">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Nationwide Fast Delivery</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Doorstep delivery across all 64 districts in Bangladesh via Pathao &amp; Steadfast express logistics.
            </p>
          </div>

          <div className="p-6 rounded-3xl border bg-card/60 backdrop-blur-xs shadow-xs hover:border-primary/40 transition group">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Download className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Dynamic DRM Watermark</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Read digital eBooks instantly on any device with personalized anti-piracy buyer stamping.
            </p>
          </div>

          <div className="p-6 rounded-3xl border bg-card/60 backdrop-blur-xs shadow-xs hover:border-primary/40 transition group">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Gift Wrapping &amp; Note</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Send beautifully wrapped books with custom handwritten greeting cards for birthdays and Boi Mela gifts.
            </p>
          </div>

          <div className="p-6 rounded-3xl border bg-card/60 backdrop-blur-xs shadow-xs hover:border-primary/40 transition group">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base mb-1">Direct from Publishers</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              100% genuine copies direct from authentic publishing houses. Zero counterfeit or pirated prints.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action for Indie Authors & Publishers */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
            <Feather className="h-3.5 w-3.5" /> For Independent Writers &amp; Publishers
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Launch Your Independent Bookstore in Minutes
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/90 max-w-xl mx-auto leading-relaxed">
            Get your own branded subdomain, automated Pathao shipping labels, bKash merchant payouts, and eBook DRM protection with zero upfront setup fees.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary" className="font-bold rounded-xl text-xs sm:text-sm shadow-xl active:scale-95">
              <Link href="/publisher/register">
                Open Publisher Store <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 font-bold rounded-xl text-xs sm:text-sm active:scale-95">
              <Link href="/publisher/dashboard">
                Explore Demo Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
