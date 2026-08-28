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
}

export default function BooksPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [page]);

  async function loadProducts() {
    setIsLoading(true);
    try {
      const response = await api.getProducts({ limit: 12, offset: page * 12 });
      const newProducts = response.products || [];
      
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse All Books</h1>
      
      {products.length > 0 ? (
        <>
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
          
          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button onClick={loadMore} disabled={isLoading} size="lg">
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      ) : (
        !isLoading && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No books available yet</p>
          </div>
        )
      )}
      
      {isLoading && products.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
}
