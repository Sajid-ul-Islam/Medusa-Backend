"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/medusa";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
  variants: Array<{ id: string; price: number }>;
  collection?: { id: string; title: string };
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.getProducts({ limit: 8 });
        setProducts(response.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Books</h2>
        <Button variant="outline" asChild>
          <a href="/books">View All Books →</a>
        </Button>
      </div>
      
      {products.length > 0 ? (
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
                variantId={firstVariant?.id}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">No books available yet</p>
          <p className="text-sm text-muted-foreground">Check back soon for new arrivals!</p>
        </div>
      )}
    </section>
  );
}
