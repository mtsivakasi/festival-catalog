export const DISCOUNT_RATE = 0.8;
export const MINIMUM_ORDER = 2500;

export function calculatePricing(originalTotal: number) {
  const discount = originalTotal * DISCOUNT_RATE;
  const finalTotal = originalTotal - discount;
  return { originalTotal, discount, finalTotal };
}

export function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}