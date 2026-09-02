"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/medusa";
import Link from "next/link";
import Image from "next/image";
import { Store, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Publisher } from "@/types";

export function FeaturedPublishers() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPublishers() {
      try {
        const response = await api.getPublishers();
        setPublishers((response.publishers as Publisher[]) || []);
      } catch (error) {
        console.error("Failed to load publishers:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadPublishers();
  }, []);

  if (isLoading || publishers.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/30 py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Certified Bookstores
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Featured Independent Publishers
            </h2>
          </div>
          <Link
            href="/publishers"
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1"
          >
            Explore All Publishers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishers.slice(0, 3).map((publisher) => (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.handle}`}
              className="flex items-start p-6 bg-card rounded-2xl border transition-all hover:shadow-xl hover:border-primary/40 group"
            >
              <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted border mr-4 flex-shrink-0">
                {publisher.logo_url ? (
                  <Image
                    src={publisher.logo_url}
                    alt={publisher.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                    <Store className="h-6 w-6" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {publisher.name}
                  </h3>
                  {publisher.verified && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary/20 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {publisher.description}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-2">
                  <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                  <span className="truncate">{publisher.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
