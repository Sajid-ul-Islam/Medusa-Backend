"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/medusa";
import Link from "next/link";
import { Store } from "lucide-react";

interface Publisher {
  id: string;
  name: string;
  handle: string;
  description?: string;
}

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Publishers</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Discover books from independent publishers around the world. Each publisher
          has their own unique collection of titles, from academic texts to fiction bestsellers.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : publishers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishers.map((publisher) => (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.handle}`}
              className="group p-6 bg-card rounded-lg border transition-all hover:shadow-lg hover:border-primary/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {publisher.name}
                  </h2>
                  {publisher.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {publisher.description}
                    </p>
                  )}
                  <span className="inline-block mt-3 text-sm text-primary group-hover:underline">
                    Visit Store →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">No publishers yet</p>
          <p className="text-sm text-muted-foreground">
            Be the first to open a bookstore on our platform!
          </p>
        </div>
      )}
    </div>
  );
}
