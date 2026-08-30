"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api, SAMPLE_BOOKS } from "@/lib/medusa";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { BookReviews } from "@/components/product/BookReviews";
import { AudiobookPlayer } from "@/components/product/AudiobookPlayer";
import { EBookReaderModal } from "@/components/reader/EBookReaderModal";
import { FlashSaleCountdown } from "@/components/product/FlashSaleCountdown";
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
  X,
  Minus,
  Plus,
  MessageCircle,
  PackageCheck,
  Sparkles,
} from "lucide-react";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const handle = params?.handle as string;

  const { addToCart, isLoading: cartLoading } = useCart();
  const { success, error: toastError } = useToast();

  const [book, setBook] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function loadBook() {
      if (!handle) return;
      setIsLoading(true);
      try {
        const response = await api.getProduct(handle);
        setBook(response.product);
      } catch (err) {
        console.error("Failed to load book details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadBook();
  }, [handle]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-[3/4] max-w-md mx-auto bg-muted rounded-xl w-full" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-24 bg-muted rounded w-full" />
            <div className="h-10 bg-muted rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Book Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The book you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/books">Back to Browse Books</Link>
        </Button>
      </div>
    );
  }

  const selectedVariant = book.variants?.[selectedVariantIndex] || {
    id: "default",
    title: "Standard Edition",
    price: 2999,
    format: "Physical",
  };

  const isDigital =
    selectedVariant.format === "Digital" ||
    selectedVariant.title?.toLowerCase().includes("ebook") ||
    selectedVariant.title?.toLowerCase().includes("digital");

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(selectedVariant.id, quantity);
      success(
        `Added "${book.title}" (${selectedVariant.title}) to your bag.`,
        "Added to Cart"
      );
    } catch (err) {
      toastError("Could not add book to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  // Related books by publisher
  const moreBooks = SAMPLE_BOOKS.filter(
    (b) => b.id !== book.id && b.publisher?.id === book.publisher?.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumbs */}
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/books" className="hover:text-primary">
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
          {/* Left Column: Book Cover & Preview Button */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border bg-muted group">
              {book.thumbnail ? (
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <BookOpen className="h-20 w-20 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {book.sample_chapter && (
              <Button
                variant="outline"
                className="mt-6 w-full max-w-sm gap-2 text-primary border-primary/30 hover:bg-primary/5"
                onClick={() => setShowSampleModal(true)}
              >
                <FileText className="h-4 w-4" />
                Read Sample Chapter
              </Button>
            )}

            {/* Quick Guarantees */}
            <div className="mt-8 w-full max-w-sm grid grid-cols-2 gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg border">
                <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span>Verified Publisher Edition</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg border">
                {isDigital ? (
                  <Download className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                )}
                <span>
                  {isDigital ? "Instant Download" : "Fast Tracked Delivery"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Book Details & Purchase Actions */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {book.categories?.map((cat: string) => (
                <span
                  key={cat}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
              {book.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-4">
              by <span className="font-semibold text-foreground">{book.author}</span>
            </p>

            {/* Publisher Box */}
            {book.publisher && (
              <div className="flex items-center gap-3 p-3 bg-card border rounded-xl mb-6 max-w-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  <Store className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Published &amp; Dispatched by</p>
                  <Link
                    href={`/publishers/${book.publisher.handle || book.publisher.id}`}
                    className="text-sm font-semibold hover:text-primary transition-colors truncate block"
                  >
                    {book.publisher.name} →
                  </Link>
                </div>
              </div>
            )}

            {/* Price Header */}
            <div className="border-t border-b py-4 my-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-foreground">
                  ${(selectedVariant.price / 100).toFixed(2)}
                </span>
                <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> In Stock &amp; Ready
                </span>
              </div>
            </div>

            {/* Live Flash Sale Urgency Badge */}
            <FlashSaleCountdown dealTitle="Amar Ekushey Boi Mela Special" discountPercent={20} />

            {/* Format Selection */}
            {book.variants && book.variants.length > 0 && (
              <div className="my-6">
                <label className="text-sm font-medium block mb-3">
                  Select Format / Edition:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {book.variants.map((variant: any, idx: number) => {
                    const isSelected = selectedVariantIndex === idx;
                    return (
                      <button
                        key={variant.id || idx}
                        type="button"
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border hover:border-muted-foreground/30 bg-card"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-sm">
                            {variant.title}
                          </span>
                          <span className="font-bold text-primary">
                            ৳{(variant.price / 100).toFixed(0)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {variant.format === "Digital"
                            ? "Instant access in PDF & ePub with anti-piracy watermark"
                            : "Physical print edition with premium paper"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity and Add to Bag */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-6">
              {!isDigital && (
                <div className="flex items-center border rounded-lg bg-card px-2 h-11 w-32 justify-between">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-semibold text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={cartLoading || isAdding}
                className="flex-1 h-11 text-base font-semibold"
              >
                {isAdding ? "Adding to Bag..." : `Add to Bag • ৳${(((selectedVariant?.price || 0) * quantity) / 100).toFixed(0)}`}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowReaderModal(true)}
                className="h-11 font-semibold gap-1.5 border-primary/30"
              >
                <BookOpen className="h-4 w-4 text-primary" /> Read Online
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={async () => {
                  await handleAddToCart();
                  router.push("/checkout");
                }}
                disabled={cartLoading || isAdding}
                className="h-11 font-semibold"
              >
                Buy Now
              </Button>
            </div>

            {/* 1-Click WhatsApp Quick Order Button */}
            <a
              href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                `Hello BookHub, I want to order "${book.title}" (৳${(((selectedVariant?.price || 0) * quantity) / 100).toFixed(0)}).\n\nMy Delivery Details:\nName:\nPhone:\nAddress:`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-10 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs transition shadow-2xs"
            >
              <MessageCircle className="h-4 w-4 fill-emerald-500 text-white" />
              <span>💬 1-Click WhatsApp Quick Order (হোয়াটসঅ্যাপে অর্ডার করুন)</span>
            </a>

            {/* Frequently Bought Together (Bundle & Save) */}
            <div className="my-6 p-5 rounded-2xl border bg-card shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-primary" /> Frequently Bought Together
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600">
                  Save ৳150 Bundle
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-14 w-11 rounded-lg bg-muted border overflow-hidden relative">
                    {book.thumbnail && <img src={book.thumbnail} alt={book.title} className="w-full h-full object-cover" />}
                  </div>
                  <span className="font-bold text-lg text-muted-foreground">+</span>
                  <div className="h-14 w-11 rounded-lg bg-muted border overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80"
                      alt="Recommended Companion"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="font-semibold truncate">{book.title} + Companion Edition</div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <span className="text-sm font-black text-primary">
                      ৳{(((selectedVariant?.price || 0) + 38000) / 100).toFixed(0)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ৳{(((selectedVariant?.price || 0) + 53000) / 100).toFixed(0)}
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={async () => {
                    await handleAddToCart();
                    success(`Added 2-Book Bundle to your bag (Saved ৳150)!`, "Bundle Added");
                  }}
                  className="w-full sm:w-auto font-bold text-xs gap-1.5 shadow-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Add Bundle to Bag
                </Button>
              </div>
            </div>

            {/* Book Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t mt-4 text-xs">
              {book.isbn && (
                <div className="flex items-center gap-2">
                  <Barcode className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">ISBN</div>
                    <div className="font-semibold">{book.isbn}</div>
                  </div>
                </div>
              )}
              {book.published_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Published</div>
                    <div className="font-semibold">{book.published_date}</div>
                  </div>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Length</div>
                    <div className="font-semibold">{book.pages} pages</div>
                  </div>
                </div>
              )}
            </div>

            {/* Synopsis / Description */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-bold mb-4">Synopsis &amp; Overview</h2>
              <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {book.long_description || book.description}
              </div>
            </div>

            {/* Audiobook Voice Preview */}
            <AudiobookPlayer title={book.title} />

            {/* Customer Ratings & Reviews */}
            <BookReviews bookTitle={book.title} />
          </div>
        </div>

        {/* More from this Publisher */}
        {moreBooks.length > 0 && (
          <section className="mt-20 pt-10 border-t">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">More from {book.publisher.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Explore other curated titles published by this store
                </p>
              </div>
              <Link
                href={`/publishers/${book.publisher.handle || book.publisher.id}`}
                className="text-primary hover:underline text-sm font-semibold"
              >
                Visit Storefront →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {moreBooks.map((b) => (
                <ProductCard
                  key={b.id}
                  id={b.id}
                  title={b.title}
                  handle={b.handle}
                  thumbnail={b.thumbnail}
                  price={b.variants?.[0]?.price || 0}
                  publisher={b.publisher}
                  variantId={b.variants?.[0]?.id}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sample Chapter Preview Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Sample Preview
                </span>
                <h3 className="text-lg font-bold truncate max-w-md">
                  {book.title}
                </h3>
              </div>
              <button
                onClick={() => setShowSampleModal(false)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-sm leading-relaxed whitespace-pre-line text-foreground/90 font-serif">
              {book.sample_chapter}
            </div>

            <div className="p-4 border-t bg-muted/20 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Enjoyed the sample? Get full instant access today.
              </span>
              <Button
                onClick={() => {
                  setShowSampleModal(false);
                  handleAddToCart();
                }}
              >
                Add Full Book to Bag
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* In-Browser eBook Reader Modal */}
      <EBookReaderModal
        isOpen={showReaderModal}
        onClose={() => setShowReaderModal(false)}
        title={book.title}
        author={book.author}
        sampleChapter={book.sample_chapter}
      />
    </div>
  );
}

