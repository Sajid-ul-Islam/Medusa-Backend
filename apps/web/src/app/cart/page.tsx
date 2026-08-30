"use client";

import { useState, useEffect } from "react";
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
import { formatPrice } from "@/lib/utils";

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

  // Restore coupon discount from session on load
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("bookhub_applied_discount");
      if (saved) {
        setAppliedDiscount(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "BOIMELA20") {
      const discount = Math.round(subtotal * 0.2);
      const discountObj = { code, percent: 20, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher BOIMELA20 applied: 20% discount!", "Promo Applied");
    } else if (code === "EID100") {
      const discount = Math.min(subtotal, 10000);
      const discountObj = { code, amount: 10000, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher EID100 applied: ৳100 discount!", "Promo Applied");
    } else {
      toastError("Invalid voucher code. Try 'BOIMELA20' or 'EID100'");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
    sessionStorage.removeItem("bookhub_applied_discount");
    info("Coupon removed.");
  };

  const handleProceedToCheckout = () => {
    setIsNavigating(true);
    router.push("/checkout");
  };

  // Group items by publisher if available
  const itemsByPublisher: { [key: string]: any[] } = {};
  cart.items.forEach((item: any) => {
    const pubName = item.publisher?.name || "Verified Independent Publisher";
    if (!itemsByPublisher[pubName]) {
      itemsByPublisher[pubName] = [];
    }
    itemsByPublisher[pubName].push(item);
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-black">Your Book Bag</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review your physical and digital book selections before checkout
          </p>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-sm rounded-full">
          {cart.items.length} {cart.items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Cart Items grouped by Publisher */}
        <div className="lg:col-span-8 space-y-6">
          {Object.entries(itemsByPublisher).map(([pubName, pubItems]) => (
            <div
              key={pubName}
              className="bg-card rounded-2xl border p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b text-sm font-semibold">
                <Store className="h-4 w-4 text-primary" />
                <span>Shipped by:</span>
                <span className="text-primary font-bold">{pubName}</span>
              </div>

              <div className="divide-y">
                {pubItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 justify-between"
                  >
                    <div className="flex gap-4">
                      <div className="h-24 w-18 bg-muted rounded-lg overflow-hidden flex-shrink-0 border relative">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-2xl">
                            📚
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-base line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          Unit Price: <span className="font-semibold text-foreground">{formatPrice(item.unit_price)}</span>
                        </p>
                        {item.format && (
                          <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-muted font-medium text-muted-foreground">
                            {item.format === "Digital" ? "⚡ Instant eBook" : "📦 Physical Print"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-4">
                      <span className="font-extrabold text-base text-primary">
                        {formatPrice(item.total)}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg bg-muted/40">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="p-1 text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1 text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          className="text-xs text-destructive hover:underline p-1 flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary & Vouchers */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-card rounded-2xl border p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" /> Promo Voucher Code
            </h3>

            {appliedDiscount ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-600">
                    {appliedDiscount.code} (-{formatPrice(appliedDiscount.discountTotal)})
                  </span>
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
          <div className="bg-card rounded-2xl border p-6 sticky top-24 shadow-xs">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Voucher Discount ({appliedDiscount.code})</span>
                  <span>-{formatPrice(appliedDiscount.discountTotal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping (BD)</span>
                <span className="font-medium">
                  {shipping === 0 ? "FREE" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Platform Commission</span>
                <span>Included</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total Payable</span>
              <span className="text-primary font-black">{formatPrice(total)}</span>
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
