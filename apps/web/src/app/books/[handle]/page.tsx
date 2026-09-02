import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByHandleServer, getProductsServer } from "@/lib/api/products";
import { BookDetailInteractive } from "@/components/product/BookDetailInteractive";
import { ProductCard } from "@/components/product/ProductCard";
import { BookReviews } from "@/components/product/BookReviews";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import {
  BookOpen,
  Store,
  Calendar,
  Layers,
  Barcode,
  CheckCircle2,
  FileText,
  Truck,
  Download,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Props {
  params: Promise<{ handle: string }>;
}

/**
 * Dynamic Metadata Generation for E-Commerce SEO (OpenGraph, Twitter, Googlebot)
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const { product } = await getProductByHandleServer(handle);

  if (!product) {
    return {
      title: "Book Not Found | BookHub Bangladesh",
      description: "The requested book could not be found.",
    };
  }

  const priceFormatted = formatBDT(product.variants?.[0]?.price || 0);

  return {
    title: `${product.title} by ${product.author} — ${priceFormatted} | BookHub`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} by ${product.author}`,
      description: product.description.slice(0, 200),
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 1066,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | BookHub`,
      description: product.description.slice(0, 160),
      images: [product.thumbnail],
    },
  };
}

/**
 * Async Next.js Server Component for Book Details Page
 */
export default async function BookDetailPage({ params }: Props) {
  const { handle } = await params;
  const { product: book } = await getProductByHandleServer(handle);

  if (!book) {
    notFound();
  }

  // Related books from same publisher or category
  const { products: allProducts } = await getProductsServer({ limit: 10 });
  const relatedBooks = allProducts
    .filter((b) => b.id !== book.id && (b.publisher?.id === book.publisher?.id || b.categories?.[0] === book.categories?.[0]))
    .slice(0, 4);

  const bundlePartner = relatedBooks[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumbs */}
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/books" className="hover:text-primary transition-colors">
            Books
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs">
            {book.title}
          </span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Book Cover & Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border bg-muted group">
              <Image
                src={book.thumbnail}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {book.is_bestseller && (
                <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  🔥 Bestseller
                </span>
              )}
            </div>

            {/* Value Props Ribbon */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-sm mt-6 text-center">
              <div className="p-2.5 rounded-xl border bg-card flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-[11px] font-bold">Pathao Express</span>
                <span className="text-[10px] text-muted-foreground">Nationwide</span>
              </div>
              <div className="p-2.5 rounded-xl border bg-card flex flex-col items-center gap-1">
                <Download className="h-4 w-4 text-emerald-600" />
                <span className="text-[11px] font-bold">DRM Watermark</span>
                <span className="text-[10px] text-muted-foreground">eBook Safe</span>
              </div>
              <div className="p-2.5 rounded-xl border bg-card flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-amber-500" />
                <span className="text-[11px] font-bold">100% Original</span>
                <span className="text-[10px] text-muted-foreground">Publisher Direct</span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Interactive Purchase Island */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {book.categories?.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Title & Author */}
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground leading-tight mb-2">
                {book.title}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-medium">
                By <strong className="text-foreground">{book.author}</strong>
              </p>

              {/* Publisher Badge */}
              {book.publisher && (
                <div className="mt-3 inline-flex items-center gap-2 p-1.5 pr-3 rounded-full border bg-muted/30 hover:bg-muted/50 transition">
                  <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                    <Store className="h-3.5 w-3.5" />
                  </div>
                  <Link
                    href={`/publishers/${book.publisher.handle}`}
                    className="text-xs font-bold hover:text-primary transition flex items-center gap-1"
                  >
                    <span>{book.publisher.name}</span>
                    {book.publisher.verified && (
                      <CheckCircle2 className="h-3 w-3 text-primary fill-primary/20" />
                    )}
                  </Link>
                </div>
              )}
            </div>

            {/* Interactive Leaf Component (Variants, Add to Bag, Modals, Bundle) */}
            <BookDetailInteractive book={book} relatedBook={bundlePartner} />

            {/* Synopsis / Description */}
            <div className="border-t pt-6">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" /> Book Synopsis &amp; Overview
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3 whitespace-pre-line">
                {book.description}
              </div>
            </div>

            {/* Book Specifications Table */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-bold text-foreground mb-3">Specification &amp; Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl border bg-card">
                  <span className="text-[11px] text-muted-foreground block mb-0.5">Language</span>
                  <span className="text-xs font-bold">{book.language || "Bengali / English"}</span>
                </div>
                <div className="p-3 rounded-xl border bg-card">
                  <span className="text-[11px] text-muted-foreground block mb-0.5">Page Count</span>
                  <span className="text-xs font-bold">{book.pages ? `${book.pages} Pages` : "320 Pages"}</span>
                </div>
                <div className="p-3 rounded-xl border bg-card">
                  <span className="text-[11px] text-muted-foreground block mb-0.5">Publish Year</span>
                  <span className="text-xs font-bold">{book.publish_year || "2025-2026"}</span>
                </div>
                <div className="p-3 rounded-xl border bg-card">
                  <span className="text-[11px] text-muted-foreground block mb-0.5">ISBN</span>
                  <span className="text-xs font-bold font-mono">{book.isbn || "978-984-00-1234"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-16 border-t pt-12">
          <BookReviews bookTitle={book.title} />
        </section>

        {/* Related Books by Publisher */}
        {relatedBooks.length > 0 && (
          <section className="mt-16 border-t pt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  More from Publisher
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  You May Also Like
                </h2>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/books">Explore Catalog</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relBook) => (
                <ProductCard key={relBook.id} product={relBook} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
