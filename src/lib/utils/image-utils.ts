export function getProductImageUrl(url: string | null | undefined): string {
  if (!url) return "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=600&auto=format&fit=crop"
  if (url.startsWith("http") || url.startsWith("/")) return url
  return url
}
