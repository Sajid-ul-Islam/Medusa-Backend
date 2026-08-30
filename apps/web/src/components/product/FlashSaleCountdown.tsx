"use client";

import { useEffect, useState } from "react";
import { Flame, Clock } from "lucide-react";

export function FlashSaleCountdown({
  dealTitle = "Boi Mela Special Discount",
  discountPercent = 20,
}: {
  dealTitle?: string;
  discountPercent?: number;
}) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-card border border-red-500/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center flex-shrink-0 animate-pulse">
          <Flame className="h-4 w-4 fill-red-500" />
        </div>
        <div>
          <div className="font-extrabold text-xs text-foreground flex items-center gap-1.5">
            {dealTitle}
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-500 text-white">
              {discountPercent}% OFF
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Limited inventory allocation at this price</p>
        </div>
      </div>

      {/* Countdown Digits */}
      <div className="flex items-center gap-1.5 font-mono font-bold text-xs self-end sm:self-auto">
        <Clock className="h-3.5 w-3.5 text-muted-foreground mr-0.5" />
        <div className="bg-background border px-2 py-1 rounded-md text-foreground shadow-xs">
          {String(timeLeft.hours).padStart(2, "0")}h
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="bg-background border px-2 py-1 rounded-md text-foreground shadow-xs">
          {String(timeLeft.minutes).padStart(2, "0")}m
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="bg-background border px-2 py-1 rounded-md text-red-600 shadow-xs font-black">
          {String(timeLeft.seconds).padStart(2, "0")}s
        </div>
      </div>
    </div>
  );
}
