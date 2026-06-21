import { useEffect, useState } from 'react'
import { useCartStore, CartItem } from '@/store/cart-store'

export function useCart() {
  const store = useCartStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Wait until client hydration completes
    setIsHydrated(true)
  }, [])

  return {
    ...store,
    items: isHydrated ? store.items : ([] as CartItem[]),
    itemCount: isHydrated ? store.items.reduce((total, item) => total + item.quantity, 0) : 0,
    subtotal: isHydrated ? store.getSubtotal() : 0,
    discount: isHydrated ? store.getDiscountAmount() : 0,
    total: isHydrated ? store.getTotal() : 0,
    isHydrated,
  }
}
