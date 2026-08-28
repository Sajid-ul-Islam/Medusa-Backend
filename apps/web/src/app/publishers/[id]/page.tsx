"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api, SAMPLE_PUBLISHERS } from "@/lib/medusa";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Store,
  MapPin,
  CheckCircle2,
  BookOpen,
  Calendar,
  Search,
  ArrowLeft,
  Mail,
} from "lucide-react";

export default function PublisherStorefrontPage() {
  const params = useParams();
  const publisherHandle = params?.id as string;

  const [publisher, setPublisher] = useState<any | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadPublisherData() {
      if (!publisherHandle) return;
      setIsLoading(true);
      try {
        const pubResponse = await api.getPublisher(publisherHandle);
        setPublisher(pubResponse.publisher);

        const booksResponse = await api.getProducts({
          publisher_handle: publisherHandle,
          limit: 20,
        });
        setBooks(booksResponse.products || []);
      } catch (err) {
        console.error("Failed to load publisher storefront:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPublisherData();
  }, [publisherHandle]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-48 bg-muted rounded-2xl w-full" />
        <div className="h-8 bg-muted rounded w-1/4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!publisher) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-3">Publisher Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The publisher or bookstore you are looking for does not exist.
        </p>
        <Button asChild>
          <Link href="/publishers">Browse All Publishers</Link>
        </Button>
      </div>
    );
  }

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.categories?.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Publisher Banner Header */}
      <div className="relative bg-muted/60 border-b overflow-hidden">
        {publisher.banner_url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={publisher.banner_url}
              alt={publisher.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 py-10 relative">
          <Link
            href="/publishers"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-primary mb-6 gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Publishers Directory
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative h-24 w-24 rounded-2xl overflow-hidden border-2 border-background shadow-xl bg-card flex-shrink-0">
              {publisher.logo_url ? (
                <Image
                  src={publisher.logo_url}
                  alt={publisher.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                  <Store className="h-10 w-10" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {publisher.name}
                </h1>
                {publisher.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified Publisher
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground max-w-2xl mt-1">
                {publisher.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
                {publisher.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{publisher.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span>{books.length} Published Books</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 gap-2 text-xs" asChild>
                <a href={`mailto:contact@${publisher.handle}.com`}>
                  <Mail className="h-3.5 w-3.5" /> Contact Store
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Publisher Books Catalog */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Store Catalog</h2>
            <p className="text-sm text-muted-foreground">
              Showing books published by {publisher.name}
            </p>
          </div>

          {/* Catalog Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search in this store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((product) => {
              const firstVariant = product.variants?.[0];
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  handle={product.handle}
                  thumbnail={product.thumbnail}
                  price={firstVariant?.price || 0}
                  publisher={publisher}
                  variantId={firstVariant?.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/20 rounded-2xl border">
            <p className="text-lg font-semibold mb-2">No matching books found</p>
            <p className="text-sm text-muted-foreground">
              Try searching with different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

