"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Building2,
  BookOpen,
  ShoppingBag,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  LogOut,
  Database,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminSession, setAdminSession] = useState<any>(null);
  const [publishers, setPublishers] = useState<any[]>([
    {
      id: "pub_oreilly",
      name: "O'Reilly Media & Tech",
      email: "oreilly@media.com",
      handle: "oreilly-media",
      status: "active",
      is_verified: true,
      books_count: 24,
      total_sales: "৳142,800",
    },
    {
      id: "pub_oxford",
      name: "Oxford Academic Press",
      email: "oxford@press.com",
      handle: "oxford-press",
      status: "active",
      is_verified: true,
      books_count: 18,
      total_sales: "৳94,500",
    },
    {
      id: "pub_penguin",
      name: "Penguin Classics & Fiction",
      email: "penguin@classics.com",
      handle: "penguin-classics",
      status: "active",
      is_verified: true,
      books_count: 31,
      total_sales: "৳189,200",
    },
  ]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("medusa_admin_session");
      if (!stored) {
        router.push("/admin/login");
      } else {
        setAdminSession(JSON.parse(stored));
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("medusa_admin_session");
    }
    router.push("/admin/login");
  };

  if (!adminSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-16">
      {/* Top Admin Navbar */}
      <header className="bg-card border-b sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-slate-800">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-extrabold text-base leading-tight">
                BookHub Platform Admin
              </div>
              <div className="text-xs text-muted-foreground">
                Connected to Supabase PostgreSQL • Medusa Backend Engine
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Supabase Live
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 text-xs text-destructive hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 pt-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-xs font-medium uppercase tracking-wider">
              Superadmin Mode
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
              Welcome, {adminSession.user?.first_name || "Administrator"}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Master control panel for multi-store publishers, digital eBook licenses, marketplace commissions, and Supabase cloud data.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5"
            >
              <Link href="/books">
                View Storefront <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* High Level Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Gross Sales</span>
              <DollarSign className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black">৳426,500</div>
            <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> +18.4% this month
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Publishers</span>
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-black">{publishers.length} Stores</div>
            <div className="text-xs text-muted-foreground mt-1">100% verified partners</div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Catalog Titles</span>
              <BookOpen className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black">73 Books</div>
            <div className="text-xs text-muted-foreground mt-1">eBooks &amp; Physical Hardcovers</div>
          </div>

          <div className="bg-card p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
              <ShoppingBag className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black">1,248</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">Automated fulfillment</div>
          </div>
        </div>

        {/* Publisher Management Table */}
        <div className="bg-card rounded-2xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Registered Publishers &amp; Bookstores</h2>
              <p className="text-xs text-muted-foreground">
                Manage publishing houses, review verification status, and monitor store payouts.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b text-xs uppercase text-muted-foreground bg-muted/30">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">Publisher / Store</th>
                  <th className="py-3 px-4">Contact Email</th>
                  <th className="py-3 px-4">Catalog</th>
                  <th className="py-3 px-4">Revenue</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {publishers.map((pub) => (
                  <tr key={pub.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-foreground">
                      {pub.name}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{pub.email}</td>
                    <td className="py-3 px-4 text-xs font-medium">{pub.books_count} titles</td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">{pub.total_sales}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button asChild variant="ghost" size="sm" className="h-8 text-xs">
                        <Link href={`/publishers/${pub.handle}`}>
                          View Store <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
