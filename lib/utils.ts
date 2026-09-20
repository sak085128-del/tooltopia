export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatDate(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function priceClass(price: string): string {
  switch (price) {
    case "Free":
      return "price-free";
    case "Freemium":
      return "price-freemium";
    case "Free Trial":
      return "price-trial";
    case "Paid":
      return "price-paid";
    default:
      return "price-contact";
  }
}

/** Escape HTML to prevent XSS when rendering user-generated content. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Lightweight content sanitizer for user submissions (removes scripts/event handlers). */
export function sanitizeText(input: string, maxLen = 2000): string {
  return escapeHtml(input.trim().slice(0, maxLen));
}

export function getBaseUrl(): string {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return process.env.NEXTAUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function ratingStars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(Math.max(0, Math.min(5, full))) + "☆".repeat(Math.max(0, 5 - full));
}

export const PRICING_TYPES = [
  "Free",
  "Freemium",
  "Paid",
  "Free Trial",
  "Contact for Pricing",
] as const;

export const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A–Z" },
  { value: "views", label: "Most Viewed" },
] as const;

export function redirectTo(destination: string): never {
  throw new Response("Redirecting…", {
    status: 307,
    headers: { Location: destination },
  });
}