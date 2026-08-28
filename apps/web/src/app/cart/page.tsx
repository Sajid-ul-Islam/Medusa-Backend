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
  Tag,
  Check,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const { success, info, error: toastError } = useToast();
  const [isNavigating, setIsNavigating] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percent?: number;
    amount?: number;
    discountTotal: number;
  } | null>(null);

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
  const discountVal = appliedDiscount ? appliedDiscount.discountTotal : 0;
  const total = Math.max(0, subtotal - discountVal + shipping);

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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "BOIMELA20") {
      const discount = Math.round(subtotal * 0.2);
      const discountObj = { code, percent: 20, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher BOIMELA20 applied: 20% Discount!", "Promo Code Applied");
    } else if (code === "EID100") {
      const discount = Math.min(subtotal, 10000); // ৳100
      const discountObj = { code, amount: 10000, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher EID100 applied: ৳100 Flat Discount!", "Promo Code Applied");
    } else if (code === "READBD10") {
      const discount = Math.round(subtotal * 0.1);
      const discountObj = { code, percent: 10, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher READBD10 applied: 10% Discount!", "Promo Code Applied");
    } else {
      toastError("Invalid voucher code. Try 'BOIMELA20' or 'EID100'");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    sessionStorage.removeItem("bookhub_applied_discount");
    setCouponCode("");
    info("Coupon removed.");
  };

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
        <span className="text-xs px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full">
          {publisherCount} {publisherCount === 1 ? "Publisher Store" : "Publisher Stores"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {Object.entries(itemsByPublisher).map(([publisherName, items]) => (
            <div key={publisherName} className="bg-card rounded-xl border overflow-hidden shadow-sm">
              {/* Publisher Store Header */}
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
                            info("Removed from bag");
                          }}
                          disabled={isLoading}
                          className="text-xs text-destructive hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
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
        <div className="lg:col-span-4 space-y-4">
          {/* Promo Code Box */}
          <div className="bg-card rounded-xl border p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Tag className="h-3.5 w-3.5 text-primary" /> Promo Voucher Code
            </div>

            {appliedDiscount ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-emerald-600 font-mono">
                    {appliedDiscount.code}
                  </span>
                  <div className="text-[11px] text-emerald-600">
                    Saved ৳{(appliedDiscount.discountTotal / 100).toFixed(0)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-xs text-destructive font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. BOIMELA20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-9 px-3 uppercase font-mono rounded-lg border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button type="submit" size="sm" variant="secondary" className="h-9 text-xs">
                  Apply
                </Button>
              </form>
            )}
            <div className="text-[10px] text-muted-foreground">
              Try <span className="font-mono text-primary font-bold">BOIMELA20</span> for 20% off or <span className="font-mono text-primary font-bold">EID100</span>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="bg-card rounded-xl border p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items Subtotal</span>
                <span className="font-medium">৳{(subtotal / 100).toFixed(0)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Voucher Discount ({appliedDiscount.code})</span>
                  <span>-৳{(appliedDiscount.discountTotal / 100).toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping (BD)</span>
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
              <span>Total Payable</span>
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
                <span>bKash, Nagad &amp; Card Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Direct delivery across 64 districts in Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
