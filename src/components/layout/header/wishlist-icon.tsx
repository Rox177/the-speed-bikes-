"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/hooks/use-wishlist"

export function WishlistIcon({ isDarkHeader }: { isDarkHeader: boolean }) {
  const { itemCount } = useWishlist()

  return (
    <Link
      href="/wishlist"
      className={`relative p-2 rounded-full transition-all duration-200 block cursor-pointer active:scale-95 ${
        isDarkHeader
          ? "hover:bg-gray-800 text-white"
          : "hover:bg-gray-100 text-black"
      }`}
      aria-label="Wishlist"
    >
      <Heart className="h-5.5 w-5.5 stroke-[2]" />
      {itemCount > 0 && (
        <span className="absolute top-0.5 right-0.5 bg-accent text-accent-foreground text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center animate-fade-in border border-background">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
