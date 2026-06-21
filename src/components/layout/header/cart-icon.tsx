"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useUIStore } from "@/store/ui-store"

export function CartIcon({ isDarkHeader }: { isDarkHeader: boolean }) {
  const { itemCount } = useCart()
  const setCartOpen = useUIStore((state) => state.setCartOpen)

  return (
    <button
      onClick={() => setCartOpen(true)}
      className={`relative p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
        isDarkHeader
          ? "hover:bg-gray-800 text-white"
          : "hover:bg-gray-100 text-black"
      }`}
      aria-label="Open Cart"
    >
      <ShoppingBag className="h-5.5 w-5.5 stroke-[2]" />
      {itemCount > 0 && (
        <span className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center animate-fade-in border border-background">
          {itemCount}
        </span>
      )}
    </button>
  )
}
