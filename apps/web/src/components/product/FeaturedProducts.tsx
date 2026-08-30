"use client";

import { useEffect, useState } from "react";
import { api, SAMPLE_BOOKS } from "@/lib/medusa";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const response = await api.getProducts({ limit: 16 });
        const list = response.products && response.products.length > 0 ? response.products : SAMPLE_BOOKS;
        setProducts(list);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts(SAMPLE_BOOKS);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const categories = [
    { id: "all", label: "🌟 All Featured" },
    { id: "islamic", label: "🕌 Islamic & Hadith" },
    { id: "bengali", label: "📖 Bengali Classics" },
    { id: "tech", label: "💻 Computer Science" },
    { id: "bestseller", label: "🔥 National Bestsellers" },
  ];

  const filteredProducts = products.filter((p: any) => {
    if (activeCategory === "all") return true;
    const catStr = (p.categories || []).join(" ").toLowerCase() + " " + (p.title || "").toLowerCase();
    if (activeCategory === "islamic") return catStr.includes("islamic") || catStr.includes("hadith") || catStr.includes("quran") || catStr.includes("sajid") || catStr.includes("makhtum");
    if (activeCategory === "bengali") return catStr.includes("bengali") || catStr.includes("humayun") || catStr.includes("zafar") || catStr.includes("literature") || catStr.includes("devi") || catStr.includes("jochhona");
    if (activeCategory === "tech") return catStr.includes("technology") || catStr.includes("algorithm") || catStr.includes("architecture") || catStr.includes("data") || catStr.includes("learning");
    if (activeCategory === "bestseller") return catStr.includes("habits") || catStr.includes("sapiens") || catStr.includes("alchemist") || catStr.includes("sajid");
    return true;
  });

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Header & Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Curated Marketplace Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Explore Handpicked Books
          </h2>
        </div>

        <Button variant="outline" size="sm" asChild className="self-start sm:self-auto font-bold border-primary/30">
          <Link href="/books" className="gap-1.5">
            View Full Catalog ({products.length}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-102"
                : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-muted/60 animate-pulse border" />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 12).map((product) => {
            const firstVariant = product.variants?.[0];
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                handle={product.handle}
                thumbnail={product.thumbnail}
                price={firstVariant?.price || product.price || 0}
                publisher={product.publisher}
                variantId={firstVariant?.id || product.variant_id}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl border bg-card space-y-3">
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="text-base font-bold">No books in this category currently</p>
          <Button size="sm" onClick={() => setActiveCategory("all")}>
            View All Titles
          </Button>
        </div>
      )}
    </section>
  );
}
