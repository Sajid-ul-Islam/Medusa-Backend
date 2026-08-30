"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Zap,
  Truck,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

const FREE_DELIVERY_THRESHOLD = 150000; // ৳1,500 in poisha

export function CartDrawer() {
  const router = useRouter();
  const { cart, isLoading, isDrawerOpen, closeDrawer, removeFromCart, updateQuantity } =
    useCart();
  const { success, error: toastError, info } = useToast();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percent?: number;
    amount?: number;
    discountTotal: number;
  } | null>(null);

  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  // Restore saved voucher and gift options on mount
  useEffect(() => {
    try {
      const savedDiscount = sessionStorage.getItem("bookhub_applied_discount");
      if (savedDiscount) {
        setAppliedDiscount(JSON.parse(savedDiscount));
      }
      const savedGift = sessionStorage.getItem("bookhub_gift_option");
      if (savedGift) {
        const parsed = JSON.parse(savedGift);
        setIsGift(Boolean(parsed.isGift));
        if (parsed.giftNote) setGiftNote(parsed.giftNote);
      }
    } catch (e) {}
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const discountVal = appliedDiscount ? appliedDiscount.discountTotal : 0;
  const giftFee = isGift ? 5000 : 0; // ৳50 in poisha
  const total = Math.max(0, subtotal - discountVal + giftFee);

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const remainingForFreeDelivery = Math.max(0, (FREE_DELIVERY_THRESHOLD - subtotal) / 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "BOIMELA20") {
      const discount = Math.round(subtotal * 0.2);
      const discountObj = { code, percent: 20, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher BOIMELA20 applied: 20% Discount!", "Promo Applied");
    } else if (code === "EID100") {
      const discount = Math.min(subtotal, 10000);
      const discountObj = { code, amount: 10000, discountTotal: discount };
      setAppliedDiscount(discountObj);
      sessionStorage.setItem("bookhub_applied_discount", JSON.stringify(discountObj));
      success("Voucher EID100 applied: ৳100 Discount!", "Promo Applied");
    } else {
      toastError("Invalid voucher. Try 'BOIMELA20' or 'EID100'");
    }
  };

  const handleGiftToggle = (checked: boolean) => {
    setIsGift(checked);
    if (checked) {
      sessionStorage.setItem("bookhub_gift_option", JSON.stringify({ isGift: true, giftNote }));
      info("Added Luxury Gift Packaging & Card (+৳50)", "Gift Wrap Added");
    } else {
      sessionStorage.removeItem("bookhub_gift_option");
    }
  };

  const handleProceedToCheckout = () => {
    if (isGift) {
      sessionStorage.setItem("bookhub_gift_option", JSON.stringify({ isGift: true, giftNote }));
    }
    closeDrawer();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b bg-muted/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-bold text-base">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span>Your Book Bag</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
                aria-label="Close cart drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Delivery Threshold Progress Meter */}
            <div className="p-2.5 rounded-xl bg-background border shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Truck className="h-3.5 w-3.5 text-primary" />
                  {remainingForFreeDelivery === 0
                    ? "🎉 You unlocked FREE Delivery!"
                    : `Add ৳${remainingForFreeDelivery.toFixed(0)} more for FREE Delivery`}
                </span>
                <span className="text-[11px] font-bold text-primary">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-2xl">
                  📚
                </div>
                <h3 className="font-bold text-base">Your bag is empty</h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Browse our independent publisher titles and add your favorite physical books or eBooks.
                </p>
                <Button size="sm" onClick={closeDrawer} asChild className="mt-2 font-bold">
                  <Link href="/books">Explore Catalog →</Link>
                </Button>
              </div>
            ) : (
              items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-xl border bg-background shadow-xs hover:border-primary/30 transition"
                >
                  <div className="w-16 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 border relative">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">
                        📖
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-semibold text-xs leading-snug truncate pr-2">
                          {item.title}
                        </h4>
                        <span className="font-bold text-xs text-primary whitespace-nowrap">
                          {formatPrice(item.total)}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {formatPrice(item.unit_price)} each
                      </p>
                      {item.format && (
                        <span className="inline-block text-[10px] font-medium text-muted-foreground mt-0.5">
                          {item.format === "Digital" ? "⚡ Instant eBook" : "📦 Physical Book"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                      <div className="flex items-center border rounded-md bg-muted/30">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          className="p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        disabled={isLoading}
                        className="text-xs text-destructive hover:underline flex items-center gap-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t bg-muted/20 space-y-3.5">
              {/* Gift a Book Option */}
              <div className="p-3 rounded-xl border bg-background/80 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => handleGiftToggle(e.target.checked)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="flex items-center gap-1.5">
                    <Gift className="h-3.5 w-3.5 text-pink-500" />
                    <span>Send as a Gift (+৳50 Ribbon &amp; Card)</span>
                  </span>
                </label>

                {isGift && (
                  <div className="pt-1.5 animate-in fade-in">
                    <input
                      type="text"
                      placeholder="Greeting note: e.g. Happy Birthday Rafid!..."
                      value={giftNote}
                      onChange={(e) => {
                        setGiftNote(e.target.value);
                        sessionStorage.setItem(
                          "bookhub_gift_option",
                          JSON.stringify({ isGift: true, giftNote: e.target.value })
                        );
                      }}
                      className="w-full h-8 px-2.5 text-xs rounded-lg border bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Price invoice will be hidden from the recipient package.
                    </p>
                  </div>
                )}
              </div>

              {/* Promo Voucher Mini Form */}
              {appliedDiscount ? (
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{appliedDiscount.code} (-৳{(appliedDiscount.discountTotal / 100).toFixed(0)})</span>
                  </div>
                  <button
                    onClick={() => {
                      setAppliedDiscount(null);
                      sessionStorage.removeItem("bookhub_applied_discount");
                      info("Voucher removed");
                    }}
                    className="text-destructive font-semibold hover:underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. BOIMELA20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 h-8 px-2.5 uppercase font-mono rounded-lg border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button type="submit" size="sm" variant="secondary" className="h-8 text-xs px-3">
                    Apply
                  </Button>
                </form>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span>-{formatPrice(appliedDiscount.discountTotal)}</span>
                  </div>
                )}
                {isGift && (
                  <div className="flex justify-between text-pink-600 font-semibold">
                    <span>Gift Packaging &amp; Card</span>
                    <span>+৳50</span>
                  </div>
                )}
                <div className="flex justify-between font-extrabold text-sm text-foreground pt-1 border-t">
                  <span>Total Payable</span>
                  <span className="text-primary font-black">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleProceedToCheckout}
                  className="w-full h-11 text-xs font-bold gap-2 shadow-sm"
                >
                  Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="outline"
                  onClick={handleProceedToCheckout}
                  className="w-full h-9 text-xs font-bold gap-1.5 border-[#E2136E]/30 text-[#E2136E] hover:bg-[#E2136E]/10"
                >
                  <Zap className="h-3.5 w-3.5 fill-[#E2136E]" /> 1-Click bKash Express Checkout
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>SSL Encrypted • bKash &amp; Card Secure</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
