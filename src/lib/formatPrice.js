export function formatPrice(value, currency = "CAD") {
  if (typeof value !== "number") return "Custom quote";

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatFromPrice(value, currency = "CAD") {
  if (typeof value !== "number") return "Custom quote";
  return `From ${formatPrice(value, currency)}`;
}
