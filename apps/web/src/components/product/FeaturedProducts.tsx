"use client";

import { useEffect, useState } from "react";
import { api, SAMPLE_BOOKS } from "@/lib/medusa";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Layers } from "lucide-react";
import { Book } from "@/types";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Book[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const response = await api.getProducts({ limit: 16 });
        const list = response.products && response.products.length > 0 ? (response.products as Book[]) : (SAMPLE_BOOKS as unknown as Book[]);
        setProducts(list);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts(SAMPLE_BOOKS as unknown as Book[]);
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

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    const catStr = (p.categories || []).join(" ").toLowerCase() + " " + (p.title || "").toLowerCase();
    if (activeCategory === "islamic") return catStr.includes("islamic") || catStr.includes("hadith") || catStr.includes("quran") || catStr.includes("sajid") || catStr.includes("makhtum");
    if (activeCategory === "bengali") return catStr.includes("bengali") || catStr.includes("humayun") || catStr.includes("zafar") || catStr.includes("literature") || catStr.includes("devi") || catStr.includes("jochhona");
    if (activeCategory === "tech") return catStr.includes("technology") || catStr.includes("algorithm") || catStr.includes("architecture") || catStr.includes("data") || catStr.includes("learning");
    if (activeCategory === "bestseller") return catStr.includes("habits") || catStr.includes("sapiens") || catStr.includes("alchemist") || catStr.includes("sajid") || p.is_bestseller;
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

        <Link
          href="/books"
          className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          View Full Catalog ({products.length > 0 ? products.length : 28}+ Titles) <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-2 ring-primary/30"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border rounded-2xl bg-muted/20">
          <BookOpen className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-bold text-base">No titles match this filter</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try switching to another category or browse all books.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveCategory("all")}
            className="mt-4 rounded-xl text-xs"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
