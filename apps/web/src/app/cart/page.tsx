"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Plus,
  Minus,
  Store,
  ArrowRight,
  ShieldCheck,
  Truck,
  BookOpen,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const { success, info } = useToast();
  const [isNavigating, setIsNavigating] = useState(false);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <BookOpen className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Your Book Bag is Empty</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          You haven&apos;t added any physical or digital books to your cart yet.
        </p>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/books">Explore All Titles →</Link>
        </Button>
      </div>
    );
  }

  const subtotal = cart.subtotal || 0;
  const shipping = cart.shipping_total || 500;
  const total = cart.total || subtotal + shipping;

  // Group items by publisher to implement Split-Cart multi-vendor UX
  const itemsByPublisher: Record<string, any[]> = cart.items.reduce(
    (acc: Record<string, any[]>, item: any) => {
      const pubName = item.publisher?.name || "Independent Publisher";
      if (!acc[pubName]) acc[pubName] = [];
      acc[pubName].push(item);
      return acc;
    },
    {}
  );

  const publisherCount = Object.keys(itemsByPublisher).length;

  const handleProceedToCheckout = () => {
    setIsNavigating(true);
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review your selected books before proceeding to secure checkout.
          </p>
        </div>
        <Link
          href="/books"
          className="text-sm text-primary hover:underline font-medium hidden sm:inline"
        >
          ← Continue Shopping
        </Link>
      </div>

      {/* Multi-Publisher Notice (Goal 7: Split Cart Experience) */}
      {publisherCount > 1 && (
        <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-sm flex items-start gap-3">
          <Store className="h-5 w-5 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div>
            <span className="font-semibold">Multi-Publisher Order:</span> You have items from{" "}
            <strong>{publisherCount} different publishers</strong>. Physical items will be packaged and delivered separately by their respective publishers.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {Object.entries(itemsByPublisher).map(([publisherName, items]: [string, any[]]) => (
            <div key={publisherName} className="bg-card rounded-xl border overflow-hidden shadow-sm">
              {/* Publisher Group Header */}
              <div className="bg-muted/40 px-5 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Store className="h-4 w-4 text-primary" />
                  <span>Fulfilled by {publisherName}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items in this publisher group */}
              <div className="divide-y">
                {items.map((item: any) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-5">
                    <div className="w-20 h-28 bg-muted rounded-lg overflow-hidden flex-shrink-0 border relative">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          📚
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-base leading-snug">
                            {item.title}
                          </h3>
                          <span className="font-bold text-base whitespace-nowrap">
                            ৳{(item.total / 100).toFixed(0)}
                          </span>
                        </div>

                        {item.format && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                            {item.format === "Digital" ? "⚡ Instant eBook (PDF/ePub)" : "📦 Physical Book"}
                          </span>
                        )}

                        <p className="text-xs text-muted-foreground mt-1">
                          ৳{(item.unit_price / 100).toFixed(0)} each
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4 pt-2">
                        <div className="flex items-center border rounded-lg bg-background">
                          <button
                            type="button"
                            onClick={async () => {
                              await updateQuantity(item.id, item.quantity - 1);
                              info("Cart updated");
                            }}
                            disabled={isLoading}
                            className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={async () => {
                              await updateQuantity(item.id, item.quantity + 1);
                              info("Cart updated");
                            }}
                            disabled={isLoading}
                            className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            await removeFromCart(item.id);
                            success("Item removed from your cart");
                          }}
                          disabled={isLoading}
                          className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="bg-card rounded-xl border p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items Subtotal</span>
                <span className="font-medium">৳{(subtotal / 100).toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : `৳${(shipping / 100).toFixed(0)}`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Platform Commission</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-primary">৳{(total / 100).toFixed(0)}</span>
            </div>

            <Button
              className="w-full h-12 text-base font-semibold gap-2"
              onClick={handleProceedToCheckout}
              disabled={isLoading || isNavigating}
            >
              {isNavigating ? "Loading Checkout..." : "Proceed to Checkout"}
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Direct delivery from independent publishers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
