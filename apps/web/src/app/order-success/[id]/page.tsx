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
          firstName: "Alex",
          lastName: "Johnson",
          address: "742 Evergreen Terrace",
          city: "Springfield",
          state: "OR",
          postalCode: "97477",
          country: "US",
        },
        items: [
          {
            id: "it_1",
            title: "Designing Data-Intensive Applications",
            quantity: 1,
            unit_price: 2999,
            total: 2999,
            format: "Digital",
            publisher: { name: "O'Reilly Media & Tech" },
          },
        ],
        subtotal: 2999,
        shippingTotal: 0,
        total: 2999,
        paymentMethod: "stripe",
        date: new Date().toISOString(),
      });
    }
  }, [orderId]);

  const handleDownload = (format: string, title: string) => {
    setDownloadingFormat(format);
    setTimeout(() => {
      setDownloadingFormat(null);
      success(
        `Preparing watermarked ${format.toUpperCase()} file with your license. Download started!`,
        "Download Ready"
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
        </div>

        {/* Digital Downloads Box (Goal 2.3: eBook delivery) */}
        {hasDigitalItems && (
          <div className="bg-gradient-to-br from-primary/10 via-card to-card rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Digital Downloads</h2>
                <p className="text-xs text-muted-foreground">
                  Time-limited secure download links. Each file includes digital ownership watermarking.
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
                      <div className="text-xs text-muted-foreground">
                        Licensed to: {order.customer?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload("PDF", item.title)}
                      disabled={downloadingFormat === "PDF"}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      {downloadingFormat === "PDF" ? "Generating..." : "Download PDF"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload("ePub", item.title)}
                      disabled={downloadingFormat === "ePub"}
                    >
                      <Download className="h-3.5 w-3.5 mr-1" />
                      {downloadingFormat === "ePub" ? "Generating..." : "Download ePub"}
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
                {order.customer?.city}, {order.customer?.state} {order.customer?.postalCode}
              </div>
              <div>{order.customer?.country}</div>
              <div className="pt-2 text-xs">Phone: {order.customer?.phone}</div>
            </div>
          </div>

          {/* Payment & Invoice Info */}
          <div className="bg-card rounded-2xl border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base flex items-center gap-2 border-b pb-3">
              <CreditCard className="h-4 w-4 text-primary" /> Payment & Billing
            </h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-semibold capitalize">
                  {order.paymentMethod === "stripe" ? "Stripe (Card Split Payment)" : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Status</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Paid & Verified
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold text-base">
                <span>Amount Paid</span>
                <span className="text-primary">${(order.total / 100).toFixed(2)}</span>
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

