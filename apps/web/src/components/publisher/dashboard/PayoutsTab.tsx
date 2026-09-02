"use client";

import { useState } from "react";
import { DollarSign, ArrowUpRight, CheckCircle2, Clock, Landmark, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";

interface PayoutsTabProps {
  balanceBDT: number;
  onRequestPayout: (amount: number, method: string) => void;
}

export function PayoutsTab({ balanceBDT, onRequestPayout }: PayoutsTabProps) {
  const [payoutMethod, setPayoutMethod] = useState<"bank" | "bkash">("bkash");
  const [accountNumber, setAccountNumber] = useState("01712-345678");
  const [bankName, setBankName] = useState("Dutch-Bangla Bank Limited (DBBL)");

  const handleWithdraw = () => {
    if (balanceBDT <= 0) return;
    onRequestPayout(balanceBDT, payoutMethod === "bkash" ? `bKash: ${accountNumber}` : `${bankName}: ${accountNumber}`);
  };

  return (
    <div className="space-y-8">
      {/* Balance Banner */}
      <div className="p-8 rounded-3xl border bg-gradient-to-r from-primary/10 via-card to-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Available for Disbursement
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-1">
            {formatBDT(balanceBDT)}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Automatic weekly settlements every Thursday directly to your nominated account.
          </p>
        </div>

        <Button onClick={handleWithdraw} size="lg" className="rounded-xl font-bold gap-2 shadow-md">
          <ArrowUpRight className="h-4 w-4" /> Request Immediate Payout
        </Button>
      </div>

      {/* Payout Destination Account */}
      <div className="border rounded-2xl bg-card p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-foreground">Settlement Account Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setPayoutMethod("bkash")}
            className={`p-4 rounded-2xl border cursor-pointer transition ${
              payoutMethod === "bkash" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "bg-muted/20"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Smartphone className="h-4 w-4 text-pink-600" /> bKash Merchant Wallet
              </span>
              {payoutMethod === "bkash" && <CheckCircle2 className="h-4 w-4 text-primary" />}
            </div>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border bg-background text-xs font-mono"
            />
          </div>

          <div
            onClick={() => setPayoutMethod("bank")}
            className={`p-4 rounded-2xl border cursor-pointer transition ${
              payoutMethod === "bank" ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "bg-muted/20"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-blue-600" /> Commercial Bank BEFTN/NPSB
              </span>
              {payoutMethod === "bank" && <CheckCircle2 className="h-4 w-4 text-primary" />}
            </div>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border bg-background text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
