"use client"

import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils/format"

export function OrderSummary() {
  const { items, subtotal, discount, total } = useCart()

  return (
    <div className="bg-card border border-border p-6 rounded-xl space-y-6">
      <h3 className="text-lg font-bold text-foreground border-b border-border pb-3 font-display">Order Summary</h3>

      <div className="divide-y divide-border/60 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
            <div className="h-14 w-14 bg-muted border border-border rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <h4 className="font-semibold text-sm text-foreground truncate">{item.name}</h4>
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground/80 mt-1">
                <span>Qty: {item.quantity}</span>
                <span className="text-foreground">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 text-sm font-semibold border-t border-border/80 pt-4">
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
          <span>{subtotal > 150 ? "Free" : formatCurrency(15)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground/80">
          <span>Estimated Tax</span>
          <span>{formatCurrency((subtotal - discount) * 0.085)}</span>
        </div>
        <div className="flex justify-between text-base font-extrabold text-foreground border-t border-border/80 pt-3">
          <span>Total Cargo Value</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
export default OrderSummary
