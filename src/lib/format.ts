export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateSavings(salePrice: number, regularPrice: number): number {
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
}
