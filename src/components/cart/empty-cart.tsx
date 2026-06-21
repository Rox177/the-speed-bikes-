"use client"

import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/ui-store"
import { useRouter } from "next/navigation"

export function EmptyCart() {
  const setCartOpen = useUIStore((state) => state.setCartOpen)
  const router = useRouter()

  const handleShop = () => {
    setCartOpen(false)
    router.push("/bikes")
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="p-4 bg-muted rounded-full text-muted-foreground/80">
        <ShoppingBag className="h-10 w-10 stroke-[1.5]" />
      </div>
      <div className="space-y-2 max-w-xs">
        <h4 className="font-bold text-foreground text-lg">Your Cart is Empty</h4>
        <p className="text-xs text-muted-foreground/80 leading-relaxed font-semibold">
          Looks like you haven't added any e-bikes or accessories to your cargo yet.
        </p>
      </div>
      <Button onClick={handleShop} variant="primary" size="md" className="shadow-sm">
        Start Exploring Gear
      </Button>
    </div>
  )
}
export default EmptyCart
