"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Heart, Sparkles, Feather } from "lucide-react";
import { formatPrice, safeGetStorage, safeSetStorage } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  title: string;
  handle: string;
  thumbnail?: string;
  price: number;
  publisher?: {
    name: string;
    handle: string;
  };
  variantId?: string;
  isSigned?: boolean;
}

export function ProductCard({
  id,
  title,
  handle,
  thumbnail,
  price,
  publisher,
  variantId,
  isSigned = false,
}: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const { success, info, error: toastError } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const list = safeGetStorage<string[]>("bookhub_wishlist", []);
    if (list.includes(id)) {
      setIsWishlisted(true);
    }
  }, [id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let list = safeGetStorage<string[]>("bookhub_wishlist", []);

    if (isWishlisted) {
      list = list.filter((item) => item !== id);
      setIsWishlisted(false);
      info(`Removed "${title}" from your wishlist.`, "Wishlist Updated");
    } else {
      list.push(id);
      setIsWishlisted(true);
      success(`Saved "${title}" to your personal bookshelf wishlist!`, "Added to Wishlist");
    }

    safeSetStorage("bookhub_wishlist", list);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId) {
      try {
        await addToCart(variantId, 1);
        success(`Added "${title}" to your cart.`, "Added to Bag");
      } catch (error) {
        toastError("Failed to add to cart.");
      }
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-xl hover:border-primary/30">
      {/* Cover Image Link */}
      <Link href={`/books/${handle}`} className="aspect-[3/4] w-full overflow-hidden bg-muted relative block">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-4xl text-muted-foreground">📚</span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-xs hover:bg-background transition text-foreground"
          aria-label="Add to Wishlist"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
            }`}
          />
        </button>

        {/* Promo / Signed Badge */}
        {isSigned ? (
          <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-[10px] uppercase shadow-md tracking-wider">
            <Feather className="h-3 w-3" /> Signed Copy
          </div>
        ) : (
          <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white font-bold text-[10px]">
            <Sparkles className="h-3 w-3 text-amber-400" /> Boi Mela
          </div>
        )}
      </Link>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/books/${handle}`} className="hover:text-primary transition-colors">
          <h3 className="font-bold text-base line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {publisher && (
          <Link
            href={`/publishers/${publisher.handle}`}
            className="text-xs text-muted-foreground hover:text-primary mt-1.5 line-clamp-1 inline-block"
          >
            by <span className="font-medium text-foreground">{publisher.name}</span>
          </Link>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-extrabold text-foreground">
              {formatPrice(price)}
            </span>
            {variantId && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isLoading}
                className="opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity font-bold"
              >
                Add to Bag
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
