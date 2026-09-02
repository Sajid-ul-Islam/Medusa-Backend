import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPublisherByHandleServer } from "@/lib/api/publishers";
import { getProductsServer } from "@/lib/api/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Store,
  MapPin,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  Mail,
  Globe,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { publisher } = await getPublisherByHandleServer(id);

  if (!publisher) {
    return {
      title: "Publisher Not Found | BookHub",
    };
  }

  const desc = publisher.description ? publisher.description.slice(0, 160) : `Official bookstore for ${publisher.name}`;
  const ogImages = publisher.logo_url ? [publisher.logo_url] : [];

  return {
    title: `${publisher.name} — Official Online Store | BookHub`,
    description: desc,
    openGraph: {
      title: `${publisher.name} Storefront`,
      description: desc,
      images: ogImages,
    },
  };
}

export default async function PublisherStorefrontPage({ params }: Props) {
  const { id: publisherHandle } = await params;
  const { publisher } = await getPublisherByHandleServer(publisherHandle);

  if (!publisher) {
    notFound();
  }

  const { products: books } = await getProductsServer({
    publisher_handle: publisherHandle,
    limit: 24,
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Publisher Branded Hero Banner */}
      <div className="relative h-64 md:h-80 w-full bg-muted overflow-hidden">
        {publisher.banner_url ? (
          <Image
            src={publisher.banner_url}
            alt={publisher.name}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-75"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/80 to-primary/40 flex items-center justify-center">
            <Store className="h-16 w-16 text-primary-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="container mx-auto px-4 absolute top-4 left-0 right-0">
          <Link
            href="/publishers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur text-xs font-bold hover:bg-background transition text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Publishers
          </Link>
        </div>
      </div>

      {/* Publisher Info Header */}
      <div className="container mx-auto px-4 relative -mt-20 z-10">
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Logo */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-4 border-background shadow-lg bg-muted flex-shrink-0 flex items-center justify-center">
              {publisher.logo_url ? (
                <Image
                  src={publisher.logo_url}
                  alt={publisher.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <Store className="h-10 w-10 text-primary" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  {publisher.name}
                </h1>
                {publisher.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified Publisher
                  </span>
                )}
              </div>

              {publisher.description && (
                <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                  {publisher.description}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground font-medium">
                {publisher.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{publisher.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span>{publisher.total_books || books.length || 24} Published Titles</span>
                </div>
                {publisher.website && (
                  <a
                    href={publisher.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition"
                  >
                    <Globe className="h-3.5 w-3.5" /> Official Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <section className="mt-12 space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Official Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Books by {publisher.name}
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-semibold">
              Showing {books.length} Books
            </span>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-16 border rounded-2xl bg-muted/20">
              <BookOpen className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="font-bold text-base">No books found</h3>
              <p className="text-xs text-muted-foreground mt-1">
                This publisher has not published any books yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <ProductCard key={book.id} product={book} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
