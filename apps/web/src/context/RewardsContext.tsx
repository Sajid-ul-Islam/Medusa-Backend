"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";

interface RewardsContextType {
  coins: number;
  streakDays: number;
  addCoins: (amount: number, reason: string) => void;
  redeemCoins: (amount: number) => number;
  claimDailyStreakBonus: () => void;
  hasClaimedToday: boolean;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: React.ReactNode }) {
  const { success } = useToast();
  const [coins, setCoins] = useState<number>(150); // 150 welcome bonus coins
  const [streakDays, setStreakDays] = useState<number>(3);
  const [hasClaimedToday, setHasClaimedToday] = useState<boolean>(false);

  useEffect(() => {
    const savedCoins = localStorage.getItem("bookhub_rewards_coins");
    const savedStreak = localStorage.getItem("bookhub_rewards_streak");
    const lastClaimDate = localStorage.getItem("bookhub_rewards_last_claim");

    if (savedCoins) setCoins(parseInt(savedCoins, 10));
    if (savedStreak) setStreakDays(parseInt(savedStreak, 10));

    const todayStr = new Date().toDateString();
    if (lastClaimDate === todayStr) {
      setHasClaimedToday(true);
    }
  }, []);

  const addCoins = (amount: number, reason: string) => {
    setCoins((prev) => {
      const updated = prev + amount;
      localStorage.setItem("bookhub_rewards_coins", String(updated));
      return updated;
    });
    success(`+${amount} BookHub Coins earned! (${reason})`, "Rewards Added");
  };

  const redeemCoins = (amount: number): number => {
    const usable = Math.min(coins, amount);
    setCoins((prev) => {
      const updated = prev - usable;
      localStorage.setItem("bookhub_rewards_coins", String(updated));
      return updated;
    });
    // 1 coin = ৳1 discount
    return usable * 100; // in poisha (100 poisha = ৳1)
  };

  const claimDailyStreakBonus = () => {
    if (hasClaimedToday) return;

    const todayStr = new Date().toDateString();
    localStorage.setItem("bookhub_rewards_last_claim", todayStr);
    setHasClaimedToday(true);

    const newStreak = streakDays + 1;
    setStreakDays(newStreak);
    localStorage.setItem("bookhub_rewards_streak", String(newStreak));

    const bonus = 25;
    addCoins(bonus, `Day ${newStreak} Reading Streak Bonus`);
  };

  return (
    <RewardsContext.Provider
      value={{
        coins,
        streakDays,
        addCoins,
        redeemCoins,
        claimDailyStreakBonus,
        hasClaimedToday,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    return {
      coins: 150,
      streakDays: 3,
      addCoins: () => {},
      redeemCoins: () => 0,
      claimDailyStreakBonus: () => {},
      hasClaimedToday: false,
    };
  }
  return context;
}
