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

export function FeaturedPublishers() {
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

  if (isLoading) {
    return null;
  }

  if (publishers.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Publishers</h2>
          <Link href="/publishers" className="text-primary hover:underline">
            View All Publishers →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishers.slice(0, 3).map((publisher) => (
            <Link
              key={publisher.id}
              href={`/publishers/${publisher.handle}`}
              className="flex items-center p-6 bg-card rounded-lg border transition-all hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mr-4">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{publisher.name}</h3>
                {publisher.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {publisher.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
