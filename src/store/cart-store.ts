import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string // unique combination of product_id + variant_id + color + size
  productId: string
  variantId?: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
  sku?: string
  maxStock: number
}

interface Coupon {
  code: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minOrderAmount: number
}

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  addItem: (item: Omit<CartItem, 'quantity' | 'id'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  clearCart: () => void
  getSubtotal: () => number
  getDiscountAmount: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (newItem) => {
        const items = get().items
        const quantity = newItem.quantity || 1
        const id = `${newItem.productId}-${newItem.variantId || 'default'}-${newItem.color || ''}-${newItem.size || ''}`

        const existingItemIndex = items.findIndex((item) => item.id === id)

        if (existingItemIndex > -1) {
          const updatedItems = [...items]
          const newQty = updatedItems[existingItemIndex].quantity + quantity
          updatedItems[existingItemIndex].quantity = Math.min(newQty, newItem.maxStock)
          set({ items: updatedItems })
        } else {
          set({
            items: [...items, { ...newItem, quantity: Math.min(quantity, newItem.maxStock), id } as CartItem],
          })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        const updatedItems = get().items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(1, Math.min(quantity, item.maxStock)) }
          }
          return item
        })
        set({ items: updatedItems })
      },

      applyCoupon: (coupon) => {
        set({ coupon })
      },

      removeCoupon: () => {
        set({ coupon: null })
      },

      clearCart: () => {
        set({ items: [], coupon: null })
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },

      getDiscountAmount: () => {
        const coupon = get().coupon
        if (!coupon) return 0
        
        const subtotal = get().getSubtotal()
        if (subtotal < coupon.minOrderAmount) return 0

        if (coupon.type === 'percentage') {
          return (subtotal * coupon.value) / 100
        } else if (coupon.type === 'fixed') {
          return Math.min(coupon.value, subtotal)
        }
        return 0
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = get().getDiscountAmount()
        // Shipping is free over $150, else $15
        const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15
        // Estimate 8.5% tax
        const tax = (subtotal - discount) * 0.085
        return Math.max(0, subtotal - discount + shipping + tax)
      },
    }),
    {
      name: 'volttrail-cart-storage',
    }
  )
)
