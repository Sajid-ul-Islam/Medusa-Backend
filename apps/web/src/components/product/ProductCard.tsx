"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Heart, Sparkles, Feather, ShoppingBag, BookOpen, Download } from "lucide-react";
import { formatPrice, safeGetStorage, safeSetStorage } from "@/lib/utils";
import { Book } from "@/types";

interface ProductCardProps {
  product?: Book;
  id?: string;
  title?: string;
  handle?: string;
  thumbnail?: string;
  price?: number;
  publisher?: {
    name: string;
    handle: string;
  };
  variantId?: string;
  isSigned?: boolean;
}

export function ProductCard(props: ProductCardProps) {
  const { product, isSigned = false } = props;

  const id = product?.id || props.id || "";
  const title = product?.title || props.title || "";
  const handle = product?.handle || props.handle || "";
  const thumbnail = product?.thumbnail || props.thumbnail;
  const price = product ? (product.variants?.[0]?.price || 0) : (props.price || 0);
  const publisher = product?.publisher || props.publisher;
  const variantId = product ? (product.variants?.[0]?.id || product.id) : (props.variantId || id);
  const isDigital = product?.is_digital || product?.variants?.some((v) => v.format === "Digital");

  const { addToCart, isLoading } = useCart();
  const { success, info, error: toastError } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const list = safeGetStorage<string[]>("bookhub_wishlist", []);
    if (list.includes(id)) {
      setIsWishlisted(true);
    }
  }, [id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let list = safeGetStorage<string[]>("bookhub_wishlist", []);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    if (isWishlisted) {
      list = list.filter((item) => item !== id);
      setIsWishlisted(false);
      info(`Removed "${title}" from your wishlist.`, "Wishlist Updated");
    } else {
      list.push(id);
      setIsWishlisted(true);
      success(`Saved "${title}" to your personal bookshelf!`, "Added to Wishlist");
    }

    safeSetStorage("bookhub_wishlist", list);
  };

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(variantId || id, 1);
      success(`Added "${title}" to your bag.`, "Added to Bag");
    } catch (err) {
      toastError("Could not add book to bag.");
    }
  };

  return (
    <Link
      href={`/books/${handle}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25 active:scale-[0.99]"
    >
      {/* 3D Realistic Book Cover Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted/60 flex items-center justify-center book-cover-depth">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
            <span className="text-4xl font-black">{title?.[0] || "B"}</span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product?.is_bestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600/95 backdrop-blur-md px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wider shadow-sm">
              🔥 Bestseller
            </span>
          )}
          {isSigned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 backdrop-blur-md px-2 py-0.5 text-[9px] font-black text-white uppercase tracking-wider shadow-sm">
              <Feather className="h-2.5 w-2.5" /> Signed
            </span>
          )}
        </div>

        {/* Wishlist Floating Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 z-10 active:scale-90 ${
            isWishlisted
              ? "bg-red-500 text-white shadow-md scale-105"
              : "bg-background/80 text-muted-foreground hover:bg-background hover:text-red-500 hover:scale-110 shadow-xs"
          } ${isBouncing ? "animate-heart-bounce" : ""}`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 z-10 hidden sm:block">
          <Button
            type="button"
            size="sm"
            onClick={handleQuickAdd}
            disabled={isLoading}
            className="w-full h-9 rounded-xl text-xs font-bold gap-1.5 shadow-lg shadow-primary/25 active:scale-95"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Quick Add
          </Button>
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-2">
        <div>
          {publisher && (
            <span className="text-[10px] font-extrabold text-primary truncate block uppercase tracking-wider mb-0.5">
              {publisher.name}
            </span>
          )}
          <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>

        <div className="pt-2 border-t flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-muted-foreground uppercase font-semibold">Price</span>
            <span className="text-sm font-black text-foreground">{formatPrice(price)}</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
            {isDigital ? (
              <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                <Download className="h-3 w-3" /> eBook
              </span>
            ) : (
              <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="h-3 w-3" /> Print
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
