// Centralized Currency Formatter for BookHub (Bangladeshi Taka - BDT ৳)

export const CURRENCY_SYMBOL = "৳";
export const CURRENCY_CODE = "BDT";

/**
 * Format an integer amount (in lowest denomination, i.e., poisha/cents where 100 = 1 ৳)
 * e.g., 2999 -> "৳29.99" or rounded "৳30"
 */
export function formatPrice(amountInPoisha: number, showDecimals: boolean = false): string {
  if (typeof amountInPoisha !== "number" || isNaN(amountInPoisha)) {
    return `${CURRENCY_SYMBOL}0`;
  }
  const mainUnit = amountInPoisha / 100;
  if (showDecimals) {
    return `${CURRENCY_SYMBOL}${mainUnit.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `${CURRENCY_SYMBOL}${Math.round(mainUnit).toLocaleString("en-BD")}`;
}

/**
 * Format raw whole number Taka amounts (e.g. 500 -> "৳500")
 */
export function formatBDT(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    return `${CURRENCY_SYMBOL}0`;
  }
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-BD")}`;
}

