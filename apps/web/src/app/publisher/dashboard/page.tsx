"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { OverviewTab } from "@/components/publisher/dashboard/OverviewTab";
import { InventoryTab } from "@/components/publisher/dashboard/InventoryTab";
import { PayoutsTab } from "@/components/publisher/dashboard/PayoutsTab";
import { StoreSettingsTab } from "@/components/publisher/dashboard/StoreSettingsTab";
import { SaaSSubscriptionTab } from "@/components/publisher/dashboard/SaaSSubscriptionTab";
import { PublisherSession } from "@/types";
import {
  Store,
  BarChart3,
  BookOpen,
  DollarSign,
  Crown,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublisherDashboard() {
  const router = useRouter();
  const { success, info } = useToast();

  const [session, setSession] = useState<PublisherSession | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "inventory" | "payouts" | "settings" | "saas">("overview");
  const [currentPlan, setCurrentPlan] = useState<"starter" | "pro" | "enterprise">("pro");

  // Auth Guard: Enforce publisher session validation (Phase 1 Security)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("publisher_session");
      if (!stored) {
        // Redirect unauthenticated visitor to login
        router.push("/publisher/login");
        return;
      }
      try {
        setSession(JSON.parse(stored));
      } catch {
        router.push("/publisher/login");
      }
    }
  }, [router]);

  const [booksList, setBooksList] = useState([
    {
      id: "b_1",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      isbn: "978-1449373320",
      price: 1200,
      stock: 45,
      sales: 128,
      revenue: 153600,
      type: "Both Physical & Digital",
    },
    {
      id: "b_2",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      isbn: "978-0134494166",
      price: 950,
      stock: 60,
      sales: 94,
      revenue: 89300,
      type: "Physical Book",
    },
    {
      id: "b_3",
      title: "Paradoxical Sajid",
      author: "Arif Azad",
      isbn: "978-9849312307",
      price: 380,
      stock: 120,
      sales: 340,
      revenue: 129200,
      type: "Both Physical & Digital",
    },
  ]);

  const [storeProfile, setStoreProfile] = useState({
    name: "Batighar Publications (বাতিঘর)",
    tagline: "Premier Bengali Literature & World Translations",
    description: "Batighar is an iconic Bangladeshi publishing house celebrating rich Bengali novels, world translations, and poetry collections.",
    location: "Banglabazar, Dhaka & Anderkilla, Chattogram",
    phone: "+880 1712-345678",
    website: "https://batighar.com",
    subdomain: "batighar",
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("publisher_session");
    }
    router.push("/publisher/login");
  };

  const handleAddBook = (bookData: any) => {
    const newBook = {
      id: "b_" + Math.random().toString(36).substring(2, 7),
      ...bookData,
      sales: 0,
      revenue: 0,
    };
    setBooksList([newBook, ...booksList]);
    success(`"${bookData.title}" published to marketplace!`, "Book Published");
  };

  const handleDeleteBook = (id: string) => {
    setBooksList(booksList.filter((b) => b.id !== id));
    info("Publication removed from catalog.", "Deleted");
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const totalRevenue = booksList.reduce((sum, b) => sum + (b.revenue || 0), 0);
  const totalBooks = booksList.length;

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      {/* Top Publisher Brand Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-foreground">
                  {session.name || storeProfile.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-primary/10 text-primary uppercase">
                  {currentPlan} Tier
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{session.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-bold gap-1.5">
              <Link href={`/publishers/${storeProfile.subdomain}`} target="_blank">
                <ExternalLink className="h-3.5 w-3.5" /> View Public Storefront
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl text-xs text-destructive hover:bg-destructive/10 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="container mx-auto px-4 flex space-x-1 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-4 w-4" /> Overview &amp; Analytics
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === "inventory"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" /> Publications ({booksList.length})
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`px-4 py-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === "payouts"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <DollarSign className="h-4 w-4" /> Payouts &amp; Settlements
          </button>
          <button
            onClick={() => setActiveTab("saas")}
            className={`px-4 py-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === "saas"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Crown className="h-4 w-4" /> SaaS Subscriptions
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings className="h-4 w-4" /> Store Settings
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <OverviewTab
            storeName={storeProfile.name}
            totalBooks={totalBooks}
            totalRevenue={totalRevenue}
            totalOrders={562}
            recentOrders={[
              {
                id: "ORD-94821",
                customer: "Kazi Nazrul",
                bookTitle: "Designing Data-Intensive Applications",
                amount: 1200,
                date: "Today 02:45 PM",
                status: "Processing Pathao",
              },
              {
                id: "ORD-94819",
                customer: "Farhana Yasmin",
                bookTitle: "Paradoxical Sajid (Physical)",
                amount: 380,
                date: "Today 11:20 AM",
                status: "Dispatched",
              },
              {
                id: "ORD-94814",
                customer: "Tanvir Ahmed",
                bookTitle: "Clean Architecture (eBook)",
                amount: 950,
                date: "Yesterday",
                status: "Delivered",
              },
            ]}
          />
        )}

        {activeTab === "inventory" && (
          <InventoryTab
            books={booksList}
            onAddBook={handleAddBook}
            onDeleteBook={handleDeleteBook}
          />
        )}

        {activeTab === "payouts" && (
          <PayoutsTab
            balanceBDT={totalRevenue * 0.85}
            onRequestPayout={(amount, method) => {
              success(`Disbursement request for ৳${amount.toLocaleString()} submitted to ${method}!`, "Payout Requested");
            }}
          />
        )}

        {activeTab === "saas" && (
          <SaaSSubscriptionTab
            currentPlan={currentPlan}
            onChangePlan={(plan) => {
              setCurrentPlan(plan);
              success(`Subscription updated to ${plan.toUpperCase()}!`, "Plan Changed");
            }}
          />
        )}

        {activeTab === "settings" && (
          <StoreSettingsTab
            initialProfile={storeProfile}
            onSave={(updated) => {
              setStoreProfile(updated);
              success("Storefront settings updated!", "Saved");
            }}
          />
        )}
      </main>
    </div>
  );
}
