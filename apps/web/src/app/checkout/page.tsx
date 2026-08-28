"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { api, getCartId } from "@/lib/medusa";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Store,
  FileCheck,
  Clock,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    email: "customer@example.com",
    firstName: "Alex",
    lastName: "Johnson",
    phone: "+1 555-0199",
    address: "742 Evergreen Terrace",
    apartment: "Suite 4B",
    city: "Springfield",
    state: "OR",
    postalCode: "97477",
    country: "US",
  });

  const [shippingOption, setShippingOption] = useState("std");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart?.subtotal || 4999;
  const shippingCost = shippingOption === "express" ? 1200 : 500;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const cartId = getCartId() || "temp_cart";

      // Send addresses to Medusa API
      await api.updateCartShipping(cartId, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.apartment,
        city: formData.city,
        province: formData.state,
        postal_code: formData.postalCode,
        country_code: formData.country.toLowerCase(),
        phone: formData.phone,
      });

      await api.updateCartBilling(cartId, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country_code: formData.country.toLowerCase(),
      });

      // Complete checkout
      const orderResponse = await api.completeCart(cartId);
      const orderId =
        orderResponse?.data?.id ||
        orderResponse?.id ||
        "ord_" + Math.random().toString(36).substring(2, 9);

      // Save mock order details for success screen
      sessionStorage.setItem(
        `order_${orderId}`,
        JSON.stringify({
          orderId,
          displayId: Math.floor(100000 + Math.random() * 900000),
          customer: formData,
          items: cart?.items || [],
          subtotal,
          shippingTotal: shippingCost,
          total,
          paymentMethod,
          date: new Date().toISOString(),
        })
      );

      clearCart();
      success("Order placed successfully!", "Payment Approved");
      router.push(`/order-success/${orderId}`);
    } catch (err) {
      console.error("Checkout submission failed:", err);
      toastError("Unable to complete transaction. Please check your payment details.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Checkout Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <Link
            href="/cart"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            256-Bit SSL Encrypted Checkout
          </div>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Form Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Contact Information */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-bold">Contact Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Email Address (for order receipt & eBook links) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Phone Number (for shipping carrier updates) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-lg font-bold">Delivery Address</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Apartment, suite, unit (optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="US">United States (USD)</option>
                      <option value="GB">United Kingdom (GBP)</option>
                      <option value="CA">Canada (CAD)</option>
                      <option value="DE">Germany (EUR)</option>
                      <option value="FR">France (EUR)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Delivery Method */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    3
                  </div>
                  <h2 className="text-lg font-bold">Shipping Speed</h2>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingOption === "std"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingOption === "std"}
                        onChange={() => setShippingOption("std")}
                        className="text-primary"
                      />
                      <div>
                        <div className="font-semibold text-sm">Standard Tracked Delivery</div>
                        <div className="text-xs text-muted-foreground">3–5 business days</div>
                      </div>
                    </div>
                    <span className="font-bold text-sm">$5.00</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      shippingOption === "express"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingOption === "express"}
                        onChange={() => setShippingOption("express")}
                        className="text-primary"
                      />
                      <div>
                        <div className="font-semibold text-sm">Express Priority Courier</div>
                        <div className="text-xs text-muted-foreground">1–2 business days (Air priority)</div>
                      </div>
                    </div>
                    <span className="font-bold text-sm">$12.00</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Options (Stripe Connect Split Gateway) */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    4
                  </div>
                  <h2 className="text-lg font-bold">Payment Method</h2>
                </div>

                <div className="space-y-3 mb-6">
                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "stripe"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                      className="text-primary"
                    />
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Credit / Debit Card (Stripe Connect)</div>
                      <div className="text-xs text-muted-foreground">
                        Instant automated split payments directly to publisher accounts
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="text-primary"
                    />
                    <Truck className="h-5 w-5 text-amber-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">Cash on Delivery (Physical books only)</div>
                      <div className="text-xs text-muted-foreground">
                        Pay upon physical parcel receipt at your doorstep
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === "stripe" && (
                  <div className="p-4 bg-muted/40 rounded-xl border space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        defaultValue="4242 4242 4242 4242"
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="12/28"
                          defaultValue="12/28"
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          defaultValue="789"
                          className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-xl border p-6 sticky top-20 shadow-sm space-y-6">
                <h2 className="text-xl font-bold">Review Your Order</h2>

                {/* Items in Cart */}
                <div className="divide-y max-h-72 overflow-y-auto pr-1">
                  {cart?.items?.map((item: any) => (
                    <div key={item.id} className="py-3 flex items-center gap-3 text-sm">
                      <div className="w-12 h-16 bg-muted rounded overflow-hidden flex-shrink-0 border">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm">
                            📚
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          Qty: {item.quantity} • {item.format || "Standard"}
                        </div>
                      </div>
                      <div className="font-bold text-sm">
                        ${(item.total / 100).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Subtotal</span>
                    <span className="font-medium">${(subtotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className="font-medium">${(shippingCost / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">${(total / 100).toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className="w-full h-12 text-base font-semibold gap-2"
                >
                  {isProcessing ? "Authorizing Payment..." : `Pay $${(total / 100).toFixed(2)}`}
                  <CheckCircle2 className="h-5 w-5" />
                </Button>

                <div className="text-center text-xs text-muted-foreground space-y-1">
                  <p>By placing this order, you agree to BookHub's Terms & Conditions.</p>
                  <p className="flex items-center justify-center gap-1 text-emerald-600 font-medium">
                    <ShieldCheck className="h-4 w-4" /> 100% Satisfaction & Authenticity Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

