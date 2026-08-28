"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Store, Upload, DollarSign, BarChart3 } from "lucide-react";

export default function PublisherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Publisher Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your bookstore, track sales, and upload new titles.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">Total Books</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground mt-1">Listed titles</p>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <p className="text-3xl font-bold">$0.00</p>
          <p className="text-sm text-muted-foreground mt-1">This month</p>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-muted-foreground">Orders</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground mt-1">Pending fulfillment</p>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <Upload className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-muted-foreground">Downloads</span>
          </div>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-muted-foreground mt-1">Digital books sold</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="bg-card rounded-lg border p-4 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === "overview"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === "books"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              My Books
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === "upload"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Upload New Book
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === "orders"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("payouts")}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeTab === "payouts"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              Payouts
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-card rounded-lg border p-8">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">👋 Welcome to Your Bookstore!</h3>
                    <p className="text-muted-foreground">
                      Get started by uploading your first book. You can sell both physical
                      and digital formats with automatic delivery for eBooks.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">💳 Connect Stripe Account</h3>
                    <p className="text-muted-foreground mb-4">
                      Link your Stripe account to receive payments directly from book sales.
                    </p>
                    <Button>Connect Stripe</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "books" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Books</h2>
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No books listed yet</p>
                  <Button onClick={() => setActiveTab("upload")}>
                    Upload Your First Book
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "upload" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Upload New Book</h2>
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium mb-2">Book Title</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background"
                      placeholder="Enter book title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Author</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background"
                      placeholder="Author name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">ISBN (optional)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md bg-background"
                      placeholder="978-0-00-000000-0"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (USD)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-md bg-background"
                        placeholder="19.99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border rounded-md bg-background"
                        placeholder="100"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Book Type</label>
                    <select className="w-full px-4 py-2 border rounded-md bg-background">
                      <option value="physical">Physical Book</option>
                      <option value="digital">Digital Book (PDF/ePub)</option>
                      <option value="both">Both Physical and Digital</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Cover Image</label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to upload cover image
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended: 1600x2400px JPG or PNG
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      className="w-full px-4 py-2 border rounded-md bg-background min-h-[150px]"
                      placeholder="Describe your book..."
                    />
                  </div>
                  
                  <Button size="lg" className="w-full">
                    Publish Book
                  </Button>
                </div>
              </div>
            )}

            {(activeTab === "orders" || activeTab === "payouts") && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {activeTab === "orders" ? "Orders" : "Payouts"}
                </h2>
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No {activeTab} available yet. Once you start selling, they will appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
