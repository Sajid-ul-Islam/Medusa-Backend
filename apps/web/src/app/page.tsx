import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { FeaturedPublishers } from "@/components/publisher/FeaturedPublishers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Ambient Glow */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-24 md:py-32">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-6">
            ✨ Bangladesh Multi-Store Book Publishing Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Discover Books from
            <br />
            <span className="text-primary bg-clip-text">Independent Publishers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your trusted marketplace for physical paperbacks and instant digital eBooks with bKash, Nagad, and nationwide courier delivery in Bangladesh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-12 px-8 text-base font-bold shadow-lg shadow-primary/20" asChild>
              <Link href="/books">Browse All Titles</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold border-primary/30" asChild>
              <Link href="/publisher/register">Become a Publisher</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Featured Publishers */}
      <FeaturedPublishers />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose BookHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-muted-foreground">
              Discover books from hundreds of independent publishers worldwide.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground">
              Pay once, buy from multiple publishers. Secure checkout with Stripe.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Delivery</h3>
            <p className="text-muted-foreground">
              Get your digital books instantly. Physical books shipped directly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You a Publisher?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join our platform and reach thousands of book lovers. Set up your store,
            list your books, and start selling today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/publisher/register">Create Your Store</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
