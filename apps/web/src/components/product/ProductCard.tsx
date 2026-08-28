"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";

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
}

export function ProductCard({
  id,
  title,
  handle,
  thumbnail,
  price,
  publisher,
  variantId,
}: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const { success, error: toastError } = useToast();

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
              ৳{(price / 100).toFixed(0)}
            </span>
            {variantId && (
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isLoading}
                className="opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
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
