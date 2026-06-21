"use client"

import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useUIStore } from "@/store/ui-store"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CartItem } from "./cart-item"
import { CartCoupon } from "./cart-coupon"
import { EmptyCart } from "./empty-cart"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils/format"

export function CartDrawer() {
  const router = useRouter()
  const { items, subtotal, discount, total, clearCart } = useCart()
  const { isCartOpen, setCartOpen } = useUIStore()

  const handleCheckoutRedirect = () => {
    setCartOpen(false)
    router.push("/checkout")
  }

  // Free shipping progress calculation ($150 limit)
  const shippingLimit = 150
  const progressPercent = Math.min((subtotal / shippingLimit) * 100, 100)
  const remainingForFreeShipping = shippingLimit - subtotal

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full max-w-md flex flex-col p-6 overflow-hidden bg-white text-foreground dark:bg-card">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-xl font-bold flex items-center gap-2 font-display">
            <span>Shopping Cart</span>
            <span className="text-xs bg-muted text-muted-foreground/80 px-2 py-0.5 rounded-full font-bold">
              {items.length}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Free Shipping Progress Indicator */}
            <div className="py-4 border-b border-border/60 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                {remainingForFreeShipping > 0 ? (
                  <span className="text-muted-foreground">
                    Spend <span className="text-primary">{formatCurrency(remainingForFreeShipping)}</span> more for Free Shipping
                  </span>
                ) : (
                  <span className="text-green-600 dark:text-green-400">⚡ You've unlocked Free Shipping!</span>
                )}
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items list container */}
            <div className="flex-1 overflow-y-auto pr-1">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Coupon and Summary details */}
            <div className="border-t border-border pt-4 mt-auto space-y-4 bg-white dark:bg-card">
              <CartCoupon />

              <div className="space-y-2 text-sm font-semibold">
                <div className="flex justify-between text-muted-foreground/80">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground/80">
                  <span>Shipping</span>
                  <span>{subtotal > shippingLimit ? "Free" : formatCurrency(15)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground/80">
                  <span>Estimated Tax</span>
                  <span>{formatCurrency((subtotal - discount) * 0.085)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-foreground border-t border-border/80 pt-3">
                  <span>Order Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <Button
                  onClick={handleCheckoutRedirect}
                  variant="primary"
                  className="w-full h-12 font-bold shadow-md cursor-pointer text-sm"
                >
                  Proceed to Secure Checkout
                </Button>
                <button
                  onClick={clearCart}
                  className="text-xs text-muted-foreground/70 hover:text-destructive font-bold transition-all py-2 text-center cursor-pointer"
                >
                  Clear All Cargo
                </button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
export default CartDrawer
