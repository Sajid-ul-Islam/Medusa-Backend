"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api, SAMPLE_BOOKS } from "@/lib/medusa";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, SlidersHorizontal, BookOpen, X } from "lucide-react";

const CATEGORIES = [
  "All",
  "Technology",
  "Academic",
  "Fiction",
  "Non-Fiction",
  "Science",
];

const FORMATS = ["All", "Physical Print", "Digital eBook"];

function BooksContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const response = await api.getProducts({
          limit: 30,
          search: searchQuery || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
        });
        let result = response.products || [];

        // Apply format filter
        if (selectedFormat === "Digital eBook") {
          result = result.filter(
            (p: any) =>
              p.is_digital ||
              p.variants?.some(
                (v: any) =>
                  v.format === "Digital" || v.title?.toLowerCase().includes("ebook")
              )
          );
        } else if (selectedFormat === "Physical Print") {
          result = result.filter(
            (p: any) =>
              p.is_physical ||
              p.variants?.some((v: any) => v.format === "Physical")
          );
        }

        // Apply sorting
        if (sortBy === "price-low") {
          result.sort(
            (a: any, b: any) =>
              (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0)
          );
        } else if (sortBy === "price-high") {
          result.sort(
            (a: any, b: any) =>
              (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0)
          );
        } else if (sortBy === "title-az") {
          result.sort((a: any, b: any) => a.title.localeCompare(b.title));
        }

        setProducts(result);
      } catch (error) {
        console.error("Failed to load catalog:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [searchQuery, selectedCategory, selectedFormat, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedFormat("All");
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "All" || selectedFormat !== "All";

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Explore Books Catalog
        </h1>
        <p className="text-muted-foreground text-sm">
          Discover publications from verified independent bookstores and academic presses worldwide.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-card border rounded-2xl p-4 sm:p-6 mb-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, author name, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Format Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {FORMATS.map((f) => (
                <option key={f} value={f}>
                  Format: {f}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title-az">Title: A to Z</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1 flex-shrink-0">
            <Filter className="h-3.5 w-3.5" /> Category:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold ml-auto flex-shrink-0 underline pl-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] rounded-2xl bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
            <span>Showing {products.length} titles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const firstVariant = product.variants?.[0];
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  handle={product.handle}
                  thumbnail={product.thumbnail}
                  price={firstVariant?.price || 0}
                  publisher={product.publisher}
                  variantId={firstVariant?.id}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-card rounded-2xl border p-8 max-w-md mx-auto">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-muted text-2xl mb-4">
            🔍
          </div>
          <h3 className="text-lg font-bold mb-2">No matching books found</h3>
          <p className="text-xs text-muted-foreground mb-6">
            Try adjusting your search terms, changing category filters, or browsing all titles.
          </p>
          <Button onClick={clearAllFilters} size="sm">
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center text-sm text-muted-foreground">
          Loading catalog...
        </div>
      }
    >
      <BooksContent />
    </Suspense>
  );
}
