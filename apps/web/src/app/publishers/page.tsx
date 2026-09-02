import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishersServer } from "@/lib/api/publishers";
import { Store, CheckCircle2, UserPlus, ArrowRight, MapPin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Independent Publishers & Bookstores | BookHub Bangladesh",
  description: "Explore publications from certified independent bookstores and academic presses. Buy directly from authentic Bangladeshi publishers.",
  openGraph: {
    title: "Independent Publishers & Bookstores | BookHub",
    description: "Explore publications from certified independent bookstores and academic presses.",
  },
};

export default async function PublishersPage() {
  const { publishers } = await getPublishersServer();

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-gradient-to-r from-primary/10 via-card to-card p-8 rounded-3xl border border-primary/10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Publishers &amp; Bookstores
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Explore publications from certified independent bookstores and academic presses worldwide. Buy directly from authentic Bangladeshi publishers.
          </p>
        </div>

        <Button asChild size="lg" className="gap-2 flex-shrink-0 shadow-md">
          <Link href="/publisher/register">
            <UserPlus className="h-4 w-4" /> Open Your Bookstore
          </Link>
        </Button>
      </div>

      {/* Publishers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishers.map((publisher) => (
          <Link
            key={publisher.id}
            href={`/publishers/${publisher.handle || publisher.id}`}
            className="group p-6 bg-card rounded-2xl border transition-all hover:shadow-xl hover:border-primary/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted border flex-shrink-0">
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
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors truncate">
                      {publisher.name}
                    </h3>
                    {publisher.verified && (
                      <CheckCircle2 className="h-4 w-4 text-primary fill-primary/20 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{publisher.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                {publisher.description}
              </p>
            </div>

            <div className="pt-4 border-t flex items-center justify-between text-xs">
              <span className="font-semibold text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                {publisher.total_books || 24} Titles
              </span>
              <span className="font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Visit Store <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
