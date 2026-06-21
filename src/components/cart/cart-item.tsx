"use client"

import { Trash2 } from "lucide-react"
import { CartItem as CartItemType, useCartStore } from "@/store/cart-store"
import { formatCurrency } from "@/lib/utils/format"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex gap-4 py-4 border-b border-border/60">
      {/* Item Image */}
      <div className="h-20 w-20 bg-muted rounded-xl border border-border overflow-hidden flex-shrink-0 flex items-center justify-center">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1">
        <div className="space-y-0.5">
          <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
          <div className="flex flex-wrap gap-x-2 text-[10px] font-bold text-muted-foreground/80">
            {item.color && <span>Color: {item.color}</span>}
            {item.size && <span>Size: {item.size}</span>}
          </div>
        </div>

        {/* Quantity and Remove */}
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border rounded-lg h-8 px-2 w-24 justify-between">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="text-muted-foreground hover:text-foreground font-bold text-sm cursor-pointer"
            >
              -
            </button>
            <span className="font-bold text-foreground text-xs">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="text-muted-foreground hover:text-foreground font-bold text-sm cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-muted-foreground/70 hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-destructive/5 cursor-pointer"
            aria-label="Remove item"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Item Total Price */}
      <div className="text-right">
        <span className="font-bold text-sm text-foreground">{formatCurrency(item.price * item.quantity)}</span>
      </div>
    </div>
  )
}
export default CartItem
