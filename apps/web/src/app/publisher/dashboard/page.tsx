"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  Store,
  Upload,
  DollarSign,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  CreditCard,
  Package,
} from "lucide-react";

export default function PublisherDashboard() {
  const { success, info } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const [booksList, setBooksList] = useState<any[]>([
    {
      id: "b_1",
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      isbn: "978-1449373320",
      price: 49.99,
      stock: 45,
      sales: 128,
      revenue: 6398.72,
      type: "Both Physical & Digital",
    },
    {
      id: "b_2",
      title: "Clean Architecture",
      author: "Robert C. Martin",
      isbn: "978-0134494166",
      price: 34.99,
      stock: 60,
      sales: 94,
      revenue: 3289.06,
      type: "Physical Book",
    },
  ]);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    stock: "50",
    type: "both",
    category: "Technology",
    description: "",
  });

  const [isPublishing, setIsPublishing] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(true);

  const handlePublishBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.price) return;

    setIsPublishing(true);
    setTimeout(() => {
      const added = {
        id: "b_" + Math.random().toString(36).substring(2, 7),
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn || "978-" + Math.floor(1000000000 + Math.random() * 9000000000),
        price: parseFloat(newBook.price) || 29.99,
        stock: parseInt(newBook.stock) || 50,
        sales: 0,
        revenue: 0,
        type: newBook.type === "both" ? "Both Physical & Digital" : newBook.type === "digital" ? "Digital eBook" : "Physical Book",
      };

      setBooksList((prev) => [added, ...prev]);
      setIsPublishing(false);
      setNewBook({
        title: "",
        author: "",
        isbn: "",
        price: "",
        stock: "50",
        type: "both",
        category: "Technology",
        description: "",
      });
      success(`"${added.title}" has been published and listed in the marketplace!`, "Book Published");
      setActiveTab("books");
    }, 800);
  };

  const totalRevenue = booksList.reduce((sum, b) => sum + (b.revenue || 0), 0);
  const totalSales = booksList.reduce((sum, b) => sum + (b.sales || 0), 0);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            Publisher Control Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your bookstore, upload new titles, and monitor real-time split payouts.
          </p>
        </div>
        <Button onClick={() => setActiveTab("upload")} className="gap-2 self-start">
          <Plus className="h-4 w-4" /> Add New Title
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Listed Titles
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Store className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">{booksList.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Active in store catalog</p>
        </div>

        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">${totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5" /> +14.2% from last month
          </p>
        </div>

        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Units Sold
            </span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold">{totalSales}</p>
          <p className="text-xs text-muted-foreground mt-1">Physical & digital copies</p>
        </div>

        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Payout Account
            </span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="h-5 w-5" /> Active & Verified
          </p>
          <p className="text-xs text-muted-foreground mt-1">Direct Stripe Connect</p>
        </div>
      </div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <nav className="bg-card rounded-2xl border p-3 space-y-1 shadow-sm">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "books", label: "My Book Titles", icon: BookOpen },
              { id: "upload", label: "Upload New Book", icon: Upload },
              { id: "orders", label: "Customer Orders", icon: Package },
              { id: "payouts", label: "Payouts & Banking", icon: DollarSign },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content View */}
        <div className="lg:col-span-9">
          <div className="bg-card rounded-2xl border p-6 sm:p-8 shadow-sm">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">Bookstore Performance</h2>
                  <p className="text-xs text-muted-foreground">
                    Summary of catalog activity and sales performance.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-muted/40 rounded-xl border space-y-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" /> Storefront Profile
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Your store is live on BookHub. Readers can browse and order directly from your store catalog.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/publishers/oxford-academic" target="_blank">
                        View Public Storefront →
                      </a>
                    </Button>
                  </div>

                  <div className="p-5 bg-muted/40 rounded-xl border space-y-3">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-emerald-600" /> Stripe Split Payouts
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Automated 2-day rolling deposits enabled. Next scheduled payout: <strong>$1,240.00</strong> on Monday.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => info("Redirecting to Stripe Express Dashboard...")}
                    >
                      Open Stripe Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* My Books Tab */}
            {activeTab === "books" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">My Book Catalog</h2>
                    <p className="text-xs text-muted-foreground">
                      Manage stock levels, format editions, and pricing for your titles.
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setActiveTab("upload")}>
                    <Plus className="h-4 w-4 mr-1" /> Add Title
                  </Button>
                </div>

                <div className="divide-y border rounded-xl overflow-hidden">
                  {booksList.map((b) => (
                    <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card hover:bg-muted/30 transition-colors">
                      <div>
                        <h4 className="font-bold text-sm">{b.title}</h4>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                          <span>by {b.author}</span>
                          <span>•</span>
                          <span>ISBN: {b.isbn}</span>
                          <span>•</span>
                          <span className="font-semibold text-primary">{b.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end sm:self-auto text-sm">
                        <div className="text-right">
                          <div className="font-bold">${b.price.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{b.stock} in stock</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-emerald-600">{b.sales} sold</div>
                          <div className="text-xs text-muted-foreground">${b.revenue?.toFixed(2) || "0.00"}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === "upload" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Publish a New Book</h2>
                  <p className="text-xs text-muted-foreground">
                    Upload physical book metadata or instant digital eBooks (PDF / ePub).
                  </p>
                </div>

                <form onSubmit={handlePublishBook} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Book Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Advanced Distributed Systems in Rust"
                        required
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Author full name"
                        required
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        ISBN-13 (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="978-0-00-000000-0"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Selling Price (USD) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="29.99"
                        required
                        value={newBook.price}
                        onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Physical Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={newBook.stock}
                        onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Format Edition
                      </label>
                      <select
                        value={newBook.type}
                        onChange={(e) => setNewBook({ ...newBook, type: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm"
                      >
                        <option value="both">Both Physical Print & Digital eBook</option>
                        <option value="physical">Physical Print Edition Only</option>
                        <option value="digital">Digital eBook Only (PDF / ePub)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Category
                      </label>
                      <select
                        value={newBook.category}
                        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border bg-background text-sm"
                      >
                        <option>Technology & Computer Science</option>
                        <option>Academic & Science</option>
                        <option>Fiction & Literature</option>
                        <option>Non-Fiction & History</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-muted-foreground block mb-1">
                        Book Synopsis & Overview
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed book description..."
                        value={newBook.description}
                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                        className="w-full p-3 rounded-lg border bg-background text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" disabled={isPublishing} size="lg">
                      {isPublishing ? "Publishing to Marketplace..." : "Publish Book Title"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Customer Orders</h2>
                <div className="divide-y border rounded-xl overflow-hidden text-sm">
                  {[
                    { id: "ORD-9912", item: "Designing Data-Intensive Applications", customer: "Sarah K.", date: "Today, 2:15 PM", amount: "$49.99", status: "Shipped" },
                    { id: "ORD-9908", item: "Clean Architecture", customer: "David L.", date: "Yesterday", amount: "$34.99", status: "Delivered" },
                  ].map((o) => (
                    <div key={o.id} className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-bold">{o.id} • {o.item}</div>
                        <div className="text-xs text-muted-foreground">Ordered by {o.customer} on {o.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{o.amount}</div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payouts Tab */}
            {activeTab === "payouts" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Stripe Connect Payouts</h2>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <div>
                      <div className="font-bold text-sm">Connected Bank Account: Chase Bank (•••• 4812)</div>
                      <div className="text-xs text-muted-foreground">Automated daily balance transfers enabled</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
