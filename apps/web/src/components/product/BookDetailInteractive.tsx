"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Book, BookVariant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import {
  ShoppingCart,
  Minus,
  Plus,
  BookOpen,
  Headphones,
  MessageCircle,
  PackageCheck,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";

// Lazy-load heavy reader modal and audio player (Phase 3 performance optimization)
const EBookReaderModal = dynamic(
  () => import("@/components/reader/EBookReaderModal").then((mod) => mod.EBookReaderModal),
  { ssr: false }
);

const AudiobookPlayer = dynamic(
  () => import("@/components/product/AudiobookPlayer").then((mod) => mod.AudiobookPlayer),
  { ssr: false }
);

interface BookDetailInteractiveProps {
  book: Book;
  relatedBook?: Book;
}

export function BookDetailInteractive({ book, relatedBook }: BookDetailInteractiveProps) {
  const { addToCart } = useCart();
  const { success, error: toastError } = useToast();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showReaderModal, setShowReaderModal] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [bundleSelected, setBundleSelected] = useState(true);

  const selectedVariant: BookVariant = book.variants?.[selectedVariantIndex] || {
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

  const handleBuyBundle = async () => {
    if (!relatedBook) return;
    setIsAdding(true);
    try {
      await addToCart(selectedVariant.id, 1);
      const relVariantId = relatedBook.variants?.[0]?.id || relatedBook.id;
      await addToCart(relVariantId, 1);
      success(`Bundle added with special discount!`, "Bundle Added");
    } catch (err) {
      toastError("Failed to add bundle.");
    } finally {
      setIsAdding(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello BookHub! I would like to order "${book.title}" (${selectedVariant.title}) by ${book.author}. Price: ${formatBDT(selectedVariant.price)}.`
  );

  return (
    <div className="space-y-6">
      {/* Format / Variant Selection Pills */}
      <div>
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2.5">
          Select Edition &amp; Format
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {book.variants?.map((variant, idx) => {
            const isSelected = selectedVariantIndex === idx;
            return (
              <button
                key={variant.id || idx}
                type="button"
                onClick={() => setSelectedVariantIndex(idx)}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-border hover:border-muted-foreground/40 bg-card"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-bold truncate">{variant.title}</span>
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />}
                </div>
                <span className="text-sm font-black text-foreground">
                  {formatBDT(variant.price)}
                </span>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  {variant.format === "Digital" ? "⚡ Instant PDF / ePub" : "📦 Pathao Delivery"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Selector & Add to Bag CTA */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="flex items-center border rounded-xl bg-card p-1 self-start">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted disabled:opacity-40 transition"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-bold text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          size="lg"
          className="flex-1 h-12 rounded-xl text-sm font-bold gap-2 shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
        >
          <ShoppingCart className="h-5 w-5" />
          {isAdding ? "Adding to Bag..." : `Add to Bag • ${formatBDT(selectedVariant.price * quantity)}`}
        </Button>
      </div>

      {/* Instant Action Triggers: eBook Reader, Audiobook, WhatsApp */}
      <div className="flex flex-wrap gap-2 pt-1">
        {/* Sample Reader Trigger */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowReaderModal(true)}
          className="rounded-xl gap-1.5 text-xs font-semibold"
        >
          <BookOpen className="h-4 w-4 text-primary" />
          Read Sample Chapter
        </Button>

        {/* Audiobook Trigger if available */}
        {book.has_audiobook && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAudioPlayer(!showAudioPlayer)}
            className="rounded-xl gap-1.5 text-xs font-semibold border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5 hover:bg-amber-500/10"
          >
            <Headphones className="h-4 w-4" />
            {showAudioPlayer ? "Hide Audiobook" : "Listen to Audiobook Sample"}
          </Button>
        )}

        {/* 1-Click WhatsApp Quick Order */}
        <a
          href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold transition-colors"
        >
          <MessageCircle className="h-4 w-4 fill-emerald-500 text-emerald-500" />
          1-Click WhatsApp Order
        </a>
      </div>

      {/* Embedded Audiobook Player when active */}
      {showAudioPlayer && (
        <div className="pt-2 animate-in fade-in slide-in-from-top-2">
          <AudiobookPlayer
            title={book.title}
            narrator="Shuvro Chowdhury"
            duration={book.audiobook_duration || "4h 32m"}
          />
        </div>
      )}

      {/* Frequently Bought Together Bundle Card */}
      {relatedBook && (
        <div className="border rounded-2xl p-4 bg-muted/20 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Frequently Bought Together
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bundle-check"
              checked={bundleSelected}
              onChange={(e) => setBundleSelected(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
            />
            <label htmlFor="bundle-check" className="text-xs text-muted-foreground flex-1 cursor-pointer">
              Add <strong className="text-foreground">{relatedBook.title}</strong> ({formatBDT(relatedBook.variants?.[0]?.price || 1200)}) to save ৳150 on courier fees!
            </label>
          </div>
          {bundleSelected && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleBuyBundle}
              disabled={isAdding}
              className="w-full rounded-xl text-xs font-bold gap-1.5"
            >
              <PackageCheck className="h-4 w-4 text-primary" />
              Add Both to Bag (Save ৳150)
            </Button>
          )}
        </div>
      )}

      {/* eBook Reader Modal */}
      {showReaderModal && (
        <EBookReaderModal
          isOpen={showReaderModal}
          onClose={() => setShowReaderModal(false)}
          title={book.title}
          author={book.author}
          sampleChapter={book.sample_chapter}
        />
      )}
    </div>
  );
}
