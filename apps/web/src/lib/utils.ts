import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes cleanly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats poisha (cents) to Bangladeshi Taka (BDT ৳) with comma separation.
 * Handles undefined, null, and NaN safely without runtime crashes.
 */
export function formatPrice(amountInPoisha?: number | null, fallback = "৳0"): string {
  if (amountInPoisha === undefined || amountInPoisha === null || isNaN(amountInPoisha)) {
    return fallback;
  }
  const taka = Math.round(amountInPoisha / 100);
  return `৳${taka.toLocaleString("en-BD")}`;
}

/**
 * Formats flat BDT amounts (non-poisha) with comma formatting.
 */
export function formatBDT(amount?: number | null, fallback = "৳0"): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return fallback;
  }
  return `৳${Math.round(amount).toLocaleString("en-BD")}`;
}

/**
 * Truncate long strings safely
 */
export function truncate(str: string, length = 60): string {
  if (!str) return "";
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

/**
 * Safe client-side storage helper that guards against SSR window is undefined
 */
export function safeGetStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function safeSetStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to persist ${key} in localStorage:`, error);
  }
}
