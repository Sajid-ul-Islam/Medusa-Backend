"use client";

import { DollarSign, BookOpen, ShoppingBag, TrendingUp, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { formatBDT } from "@/lib/utils";

interface OverviewTabProps {
  storeName: string;
  totalBooks: number;
  totalRevenue: number;
  totalOrders: number;
  recentOrders: {
    id: string;
    customer: string;
    bookTitle: string;
    amount: number;
    date: string;
    status: string;
  }[];
}

export function OverviewTab({
  storeName,
  totalBooks,
  totalRevenue,
  totalOrders,
  recentOrders,
}: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl border bg-card shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Revenue
            </span>
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-foreground">{formatBDT(totalRevenue)}</h3>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" /> +18.4% from last month
          </span>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Published Titles
            </span>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-foreground">{totalBooks}</h3>
          <span className="text-[11px] text-muted-foreground mt-1 block">Active on marketplace</span>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Total Orders
            </span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-foreground">{totalOrders}</h3>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-3 w-3" /> 98.2% fulfillment rate
          </span>
        </div>

        <div className="p-6 rounded-2xl border bg-card shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Payout Balance
            </span>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-foreground">{formatBDT(totalRevenue * 0.85)}</h3>
          <span className="text-[11px] text-muted-foreground mt-1 block">Net ready for disbursement</span>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="border rounded-2xl bg-card p-6 shadow-xs">
        <h3 className="text-base font-bold text-foreground mb-4">Recent Customer Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b text-muted-foreground font-semibold">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Book Title</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/40 transition">
                  <td className="py-3 font-mono font-bold text-primary">{order.id}</td>
                  <td className="py-3 font-medium">{order.customer}</td>
                  <td className="py-3 max-w-xs truncate">{order.bookTitle}</td>
                  <td className="py-3 font-bold">{formatBDT(order.amount)}</td>
                  <td className="py-3 text-muted-foreground">{order.date}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
