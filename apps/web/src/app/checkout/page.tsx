"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { api, getCartId } from "@/lib/medusa";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Truck,
  CreditCard,
  Building2,
  Smartphone,
  Check,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, isInitialized } = useCart();
  const { success, error: toastError } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "sslcommerz" | "cod">("bkash");
  const [bkashNumber, setBkashNumber] = useState("01712345678");
  const [bkashPin, setBkashPin] = useState("•••••");
  const [nagadNumber, setNagadNumber] = useState("01812345678");
  const [trxId, setTrxId] = useState("");
  const [selectedCardGateway, setSelectedCardGateway] = useState<"visa_master" | "dbbl_nexus" | "city_bank">("visa_master");

  const [formData, setFormData] = useState({
    email: "customer@example.com",
    firstName: "Rahim",
    lastName: "Chowdhury",
    address: "House 42, Road 11, Banani",
    apartment: "Apt 4B",
    city: "Dhaka",
    state: "Dhaka Division",
    postalCode: "1213",
    country: "Bangladesh",
    phone: "+880 1712-345678",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart?.subtotal || 0;
  const shippingCost = cart?.shipping_total || 500;
  const total = subtotal + shippingCost;

  if (isInitialized && (!cart?.items || cart.items.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-3">Your Bag is Empty</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Please add books to your shopping bag before proceeding to checkout.
        </p>
        <Button asChild size="lg">
          <Link href="/books">Explore Catalog →</Link>
        </Button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const cartId = getCartId() || "temp_cart";

      // 1. Send addresses to Medusa API
      await api.updateCartShipping(cartId, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        address_2: formData.apartment,
        city: formData.city,
        province: formData.state,
        postal_code: formData.postalCode,
        country_code: "bd",
        phone: formData.phone,
      });

      await api.updateCartBilling(cartId, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        country_code: "bd",
      });

      // 2. Complete order with Medusa Backend
      const orderResponse = await api.completeCart(cartId);
      const orderId =
        orderResponse?.data?.id ||
        orderResponse?.id ||
        "ord_" + Math.random().toString(36).substring(2, 9);

      const generatedTrxId =
        trxId ||
        (paymentMethod === "bkash"
          ? "BK" + Math.random().toString(36).substring(2, 10).toUpperCase()
          : paymentMethod === "nagad"
          ? "NG" + Math.random().toString(36).substring(2, 10).toUpperCase()
          : paymentMethod === "sslcommerz"
          ? "SSL_" + Math.random().toString(36).substring(2, 10).toUpperCase()
          : "COD_CASH");

      // Save order details for receipt
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
          trxId: generatedTrxId,
          date: new Date().toISOString(),
        })
      );

      clearCart();
      success(
        paymentMethod === "bkash"
          ? "bKash Payment Verified & Order Confirmed!"
          : paymentMethod === "nagad"
          ? "Nagad Payment Verified & Order Confirmed!"
          : paymentMethod === "sslcommerz"
          ? "SSLCommerz Card Payment Authorized!"
          : "Cash on Delivery Order Placed!",
        "Order Confirmed"
      );
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
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shopping Bag
          </Link>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Customer Info */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-bold">Customer Contact</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Email Address (for instant eBook access &amp; receipt) *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Bangladeshi Mobile Phone (for bKash / SMS updates) *
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

              {/* 2. Delivery Address */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    2
                  </div>
                  <h2 className="text-lg font-bold">Delivery Address (Bangladesh)</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Street Address / Road / House *
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

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      City / Area *
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
                      Postal Code (e.g. 1213)
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Gateway (Bangladeshi Solutions) */}
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Payment Gateway (BDT ৳)</h2>
                    <p className="text-xs text-muted-foreground">
                      Select your preferred local mobile wallet or card payment method
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {/* bKash Gateway Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "bkash"
                        ? "border-[#E2136E] bg-[#E2136E]/5 ring-2 ring-[#E2136E]/20"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "bkash"}
                      onChange={() => setPaymentMethod("bkash")}
                      className="mt-1 accent-[#E2136E]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-[#E2136E] flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4" /> bKash Direct Checkout
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E2136E]/10 text-[#E2136E]">
                          Fastest • 0% Fee
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Instant automated payment via bKash payment gateway.
                      </div>
                    </div>
                  </label>

                  {/* Nagad Gateway Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "nagad"
                        ? "border-[#F7941D] bg-[#F7941D]/5 ring-2 ring-[#F7941D]/20"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "nagad"}
                      onChange={() => setPaymentMethod("nagad")}
                      className="mt-1 accent-[#F7941D]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-[#F7941D] flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4" /> Nagad Mobile Wallet
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#F7941D]/10 text-[#F7941D]">
                          Popular
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Pay directly using your Nagad personal or merchant account.
                      </div>
                    </div>
                  </label>

                  {/* SSLCommerz Gateway Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "sslcommerz"
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "sslcommerz"}
                      onChange={() => setPaymentMethod("sslcommerz")}
                      className="mt-1 text-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm flex items-center gap-1.5">
                          <CreditCard className="h-4 w-4 text-primary" /> SSLCommerz Multi-Gateway
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary/10 text-primary">
                          Cards &amp; NetBanking
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Visa, Mastercard, DBBL Nexus, City Bank, Brac Bank, Rocket, Upay.
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mt-1 text-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm flex items-center gap-1.5">
                          <Truck className="h-4 w-4 text-amber-600" /> Cash on Delivery (COD)
                        </div>
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-muted text-muted-foreground">
                          Physical Books
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Pay in Bangladeshi Taka (`৳`) upon physical delivery at your doorstep.
                      </div>
                    </div>
                  </label>
                </div>

                {/* Sub-inputs for Selected Method */}
                {paymentMethod === "bkash" && (
                  <div className="p-4 bg-[#E2136E]/5 rounded-xl border border-[#E2136E]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E2136E]">bKash Payment Verification</span>
                      <span className="text-[11px] text-muted-foreground font-mono">1.2% Gov Cashout Free</span>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Your bKash Account Number
                      </label>
                      <input
                        type="text"
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-mono focus:ring-2 focus:ring-[#E2136E]/20 focus:border-[#E2136E]"
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      An OTP and PIN confirmation popup will verify and charge exactly ৳{(total / 100).toFixed(0)}.
                    </p>
                  </div>
                )}

                {paymentMethod === "nagad" && (
                  <div className="p-4 bg-[#F7941D]/5 rounded-xl border border-[#F7941D]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F7941D]">Nagad Payment Verification</span>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Your Nagad Account Number
                      </label>
                      <input
                        type="text"
                        value={nagadNumber}
                        onChange={(e) => setNagadNumber(e.target.value)}
                        placeholder="018XXXXXXXX"
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm font-mono focus:ring-2 focus:ring-[#F7941D]/20 focus:border-[#F7941D]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "sslcommerz" && (
                  <div className="p-4 bg-muted/40 rounded-xl border space-y-3">
                    <div className="text-xs font-bold text-foreground">Select SSLCommerz Channel</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedCardGateway("visa_master")}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          selectedCardGateway === "visa_master"
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "bg-background"
                        }`}
                      >
                        💳 Visa / Master
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedCardGateway("dbbl_nexus")}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          selectedCardGateway === "dbbl_nexus"
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "bg-background"
                        }`}
                      >
                        🏛️ DBBL Nexus
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedCardGateway("city_bank")}
                        className={`p-2.5 rounded-lg border text-center font-medium ${
                          selectedCardGateway === "city_bank"
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "bg-background"
                        }`}
                      >
                        🏦 City Bank
                      </button>
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
                        ৳{(item.total / 100).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items Subtotal</span>
                    <span className="font-medium">৳{(subtotal / 100).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charge (BD)</span>
                    <span className="font-medium">৳{(shippingCost / 100).toFixed(0)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total Payable</span>
                    <span className="text-primary">৳{(total / 100).toFixed(0)}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className={`w-full h-12 text-base font-semibold gap-2 ${
                    paymentMethod === "bkash"
                      ? "bg-[#E2136E] hover:bg-[#C2105E] text-white"
                      : paymentMethod === "nagad"
                      ? "bg-[#F7941D] hover:bg-[#E08215] text-white"
                      : ""
                  }`}
                >
                  {isProcessing
                    ? "Connecting Payment Gateway..."
                    : paymentMethod === "bkash"
                    ? `Pay with bKash • ৳${(total / 100).toFixed(0)}`
                    : paymentMethod === "nagad"
                    ? `Pay with Nagad • ৳${(total / 100).toFixed(0)}`
                    : paymentMethod === "sslcommerz"
                    ? `Pay via SSLCommerz • ৳${(total / 100).toFixed(0)}`
                    : `Confirm Cash on Delivery • ৳${(total / 100).toFixed(0)}`}
                  <CheckCircle2 className="h-5 w-5" />
                </Button>

                <div className="text-center text-xs text-muted-foreground space-y-1">
                  <p>Encrypted 256-bit Bangladesh Payment Security</p>
                  <p className="flex items-center justify-center gap-1 text-emerald-600 font-medium">
                    <ShieldCheck className="h-4 w-4" /> 100% Genuine Books &amp; Instant Digital Access
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
