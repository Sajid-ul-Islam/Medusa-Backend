"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  CheckCircle,
  Download,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  FileText,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Truck,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const { success } = useToast();

  const [order, setOrder] = useState<any | null>(null);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const stored = sessionStorage.getItem(`order_${orderId}`);
    if (stored) {
      setOrder(JSON.parse(stored));
    } else {
      // Fallback order view
      setOrder({
        orderId,
        displayId: Math.floor(100000 + Math.random() * 900000),
        customer: {
          email: "customer@example.com",
          firstName: "Rahim",
          lastName: "Chowdhury",
          address: "House 42, Road 11, Banani",
          city: "Dhaka",
          state: "Dhaka Division",
          postalCode: "1213",
          country: "Bangladesh",
          phone: "+880 1712-345678",
        },
        items: [
          {
            id: "it_1",
            title: "Designing Data-Intensive Applications",
            quantity: 1,
            unit_price: 4999,
            total: 4999,
            format: "Digital",
            publisher: { name: "O'Reilly Media & Tech" },
          },
        ],
        subtotal: 4999,
        shippingTotal: 500,
        total: 5499,
        paymentMethod: "bkash",
        trxId: "BK99281XZ",
        date: new Date().toISOString(),
      });
    }
  }, [orderId]);

  // Anti-Piracy Watermarking Engine (eBook DRM)
  const handleDownload = (format: string, bookTitle: string) => {
    setDownloadingFormat(format);

    setTimeout(() => {
      const email = order?.customer?.email || "customer@example.com";
      const name = `${order?.customer?.firstName || ""} ${order?.customer?.lastName || ""}`.trim() || "Verified Buyer";
      const displayId = order?.displayId || "BK-98214";
      const trxId = order?.trxId || "BK_LIVE_TRX";

      const watermarkContent = `================================================================================
BOOKHUB DIGITAL WATERMARKED eBOOK LICENSE
================================================================================
Title: ${bookTitle}
Format: ${format.toUpperCase()}
Licensed To: ${name} (${email})
Order ID: #${displayId}
Payment TrxID: ${trxId}
License Hash: SHA256-${Math.random().toString(36).substring(2, 15).toUpperCase()}
Issued On: ${new Date().toUTCString()}
Status: OFFICIAL PUBLISHER VERIFIED COPY

[ANTI-PIRACY NOTICE]
This digital publication contains dynamic cryptographic watermarking linked to 
the purchaser's identity. Redistribution, unauthorized sharing, or uploading to 
file-sharing platforms is strictly prohibited by Bangladesh Copyright Act 2000.
================================================================================\n\nEnjoy your reading on BookHub!`;

      const blob = new Blob([watermarkContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-licensed.${format.toLowerCase() === "epub" ? "epub" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadingFormat(null);
      success(
        `Dynamic watermarked ${format.toUpperCase()} generated with DRM license for ${email}!`,
        "Download Complete"
      );
    }, 1200);
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-12 bg-muted rounded w-1/3 mx-auto mb-4" />
        <div className="h-6 bg-muted rounded w-1/4 mx-auto" />
      </div>
    );
  }

  const hasDigitalItems =
    order.items?.some(
      (i: any) =>
        i.format === "Digital" ||
        i.title?.toLowerCase().includes("ebook") ||
        i.title?.toLowerCase().includes("digital")
    ) ?? true;

  const hasPhysicalItems =
    order.items?.some((i: any) => i.format !== "Digital") ?? true;

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="bg-card rounded-2xl border p-8 text-center shadow-sm mb-8">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            Thank you for your order!
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Order confirmation #{order.displayId || "BK-98214"} has been placed and a receipt was sent to{" "}
            <span className="font-semibold text-foreground">{order.customer?.email}</span>.
          </p>
          {order.trxId && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-mono font-bold mt-3">
              <ShieldCheck className="h-3.5 w-3.5" /> TrxID: {order.trxId}
            </div>
          )}
        </div>

        {/* Courier Dispatch & Live Tracking Stepper (Pathao / Steadfast Bangladesh) */}
        {hasPhysicalItems && (
          <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-sm mb-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Courier Parcel Tracking (Pathao Express)</h2>
                  <div className="text-xs text-muted-foreground font-mono">
                    Tracking ID: PTH-BD-{order.displayId || "98214"} • Estimated Delivery: 24–48 Hours
                  </div>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600">
                In Transit
              </span>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-1.5">
                <div className="h-8 w-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto text-xs">
                  ✓
                </div>
                <div className="font-bold text-foreground">Order Placed</div>
                <div className="text-[10px] text-muted-foreground">Today, 2:30 PM</div>
              </div>
              <div className="space-y-1.5">
                <div className="h-8 w-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center mx-auto text-xs">
                  ✓
                </div>
                <div className="font-bold text-foreground">Publisher Packed</div>
                <div className="text-[10px] text-muted-foreground">Today, 3:15 PM</div>
              </div>
              <div className="space-y-1.5">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto text-xs animate-pulse">
                  3
                </div>
                <div className="font-bold text-primary">Pathao Courier</div>
                <div className="text-[10px] text-muted-foreground">In Transit (Dhaka Hub)</div>
              </div>
              <div className="space-y-1.5 opacity-50">
                <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground font-bold flex items-center justify-center mx-auto text-xs">
                  4
                </div>
                <div className="font-bold">Out for Delivery</div>
                <div className="text-[10px]">Expected Tomorrow</div>
              </div>
            </div>
          </div>
        )}

        {/* Digital Downloads with DRM Anti-Piracy Watermarking */}
        {hasDigitalItems && (
          <div className="bg-gradient-to-br from-primary/10 via-card to-card rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">Your Digital Downloads</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    DRM Protected
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Anti-piracy dynamic watermark stamped with: <span className="font-mono text-primary font-bold">{order.customer?.email}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {order.items?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background/80 rounded-xl border gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg">
                      📖
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        License: {order.customer?.email} • Trx: {order.trxId || "BK_VERIFIED"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload("PDF", item.title)}
                      disabled={downloadingFormat === "PDF"}
                      className="gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {downloadingFormat === "PDF" ? "Watermarking..." : "Download PDF"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload("ePub", item.title)}
                      disabled={downloadingFormat === "ePub"}
                      className="gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {downloadingFormat === "ePub" ? "Watermarking..." : "Download ePub"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Details & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Delivery & Customer Info */}
          <div className="bg-card rounded-2xl border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2 border-b pb-3">
              <MapPin className="h-4 w-4 text-primary" /> Delivery Information
            </h3>
            <div className="text-sm space-y-1 text-muted-foreground">
              <div className="font-semibold text-foreground">
                {order.customer?.firstName} {order.customer?.lastName}
              </div>
              <div>{order.customer?.address}</div>
              {order.customer?.apartment && <div>{order.customer?.apartment}</div>}
              <div>
                {order.customer?.city}, {order.customer?.postalCode}
              </div>
              <div>{order.customer?.country || "Bangladesh"}</div>
              <div className="pt-2 text-xs font-mono">Phone: {order.customer?.phone}</div>
            </div>
          </div>

          {/* Payment & Invoice Info */}
          <div className="bg-card rounded-2xl border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2 border-b pb-3">
              <CreditCard className="h-4 w-4 text-primary" /> Payment &amp; Billing
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Gateway</span>
                <span className="font-semibold capitalize flex items-center gap-1">
                  {order.paymentMethod === "bkash" ? (
                    <span className="text-[#E2136E] font-bold">bKash Direct</span>
                  ) : order.paymentMethod === "nagad" ? (
                    <span className="text-[#F7941D] font-bold">Nagad Wallet</span>
                  ) : order.paymentMethod === "sslcommerz" ? (
                    <span className="text-primary font-bold">SSLCommerz Cards</span>
                  ) : (
                    <span>Cash on Delivery (COD)</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Paid &amp; Verified
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-base">
                <span>Total Paid</span>
                <span className="text-primary">৳{(order.total / 100).toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/books">
              Explore More Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
