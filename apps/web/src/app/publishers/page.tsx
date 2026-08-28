"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/medusa";
import Link from "next/link";
import { Store, CheckCircle2, UserPlus, ArrowRight, MapPin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPublishers() {
      try {
        const response = await api.getPublishers();
        setPublishers(response.publishers || []);
      } catch (error) {
        console.error("Failed to load publishers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPublishers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-gradient-to-r from-primary/10 via-card to-card p-8 rounded-3xl border border-primary/10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Publishers &amp; Bookstores
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Explore publications from certified independent bookstores and academic presses worldwide. Buy directly from the source.
          </p>
        </div>

        <Button asChild size="lg" className="gap-2 flex-shrink-0 shadow-md">
          <Link href="/publisher/register">
            <UserPlus className="h-4 w-4" /> Open Your Bookstore
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : publishers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishers.map((publisher) => (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.handle || publisher.id}`}
              className="group p-6 bg-card rounded-2xl border transition-all hover:shadow-xl hover:border-primary/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-lg">
                    <Store className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {publisher.name}
                      </h2>
                      {publisher.verified && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      )}
                    </div>
                    {publisher.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {publisher.location}
                      </p>
                    )}
                  </div>
                </div>

                {publisher.description && (
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {publisher.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t flex items-center justify-between text-xs font-semibold text-primary group-hover:underline">
                <span className="flex items-center gap-1 text-muted-foreground font-normal">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  {publisher.total_books || "Multiple"} Titles
                </span>
                <span className="flex items-center gap-1">
                  Visit Storefront <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border">
          <p className="text-lg font-bold mb-2">No publishers registered yet</p>
          <p className="text-xs text-muted-foreground mb-6">
            Be the first to open a bookstore on our platform!
          </p>
          <Button asChild size="sm">
            <Link href="/publisher/register">Join as Publisher</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
