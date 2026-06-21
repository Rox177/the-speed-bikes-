import { expect, test, describe, beforeEach } from 'vitest'
import { useCartStore } from './cart-store'

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  test('should initialize with empty items', () => {
    const state = useCartStore.getState()
    expect(state.items).toEqual([])
    expect(state.coupon).toBeNull()
  })

  test('addItem should add a new item and merge quantities', () => {
    const store = useCartStore.getState()
    
    store.addItem({
      productId: 'bike-1',
      name: 'VoltTrail Trailblazer',
      price: 3499,
      image: '/images/trailblazer.jpg',
      maxStock: 5,
      quantity: 1,
    })

    let state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].productId).toBe('bike-1')
    expect(state.items[0].quantity).toBe(1)

    // Add again
    state.addItem({
      productId: 'bike-1',
      name: 'VoltTrail Trailblazer',
      price: 3499,
      image: '/images/trailblazer.jpg',
      maxStock: 5,
      quantity: 2,
    })

    state = useCartStore.getState()
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(3) // 1 + 2 = 3
  })

  test('addItem should cap at maxStock', () => {
    const store = useCartStore.getState()

    store.addItem({
      productId: 'bike-1',
      name: 'VoltTrail Trailblazer',
      price: 3499,
      image: '/images/trailblazer.jpg',
      maxStock: 5,
      quantity: 10, // exceeds maxStock
    })

    const state = useCartStore.getState()
    expect(state.items[0].quantity).toBe(5) // capped at maxStock
  })

  test('removeItem should remove correct item', () => {
    const store = useCartStore.getState()

    store.addItem({
      productId: 'bike-1',
      name: 'VoltTrail Trailblazer',
      price: 3499,
      image: '/images/trailblazer.jpg',
      maxStock: 5,
      quantity: 1,
    })

    let state = useCartStore.getState()
    const itemId = state.items[0].id

    state.removeItem(itemId)

    state = useCartStore.getState()
    expect(state.items).toHaveLength(0)
  })

  test('getSubtotal, getDiscountAmount and getTotal calculations', () => {
    const store = useCartStore.getState()

    store.addItem({
      productId: 'bike-1',
      name: 'VoltTrail Trailblazer',
      price: 100,
      image: '/images/trailblazer.jpg',
      maxStock: 10,
      quantity: 2,
    })

    let state = useCartStore.getState()
    expect(state.getSubtotal()).toBe(200)

    // Apply percentage discount coupon
    state.applyCoupon({
      code: 'PROMO20',
      type: 'percentage',
      value: 20,
      minOrderAmount: 150,
    })

    state = useCartStore.getState()
    expect(state.getDiscountAmount()).toBe(40) // 20% of 200 = 40
    // Total: Subtotal (200) - Discount (40) + Shipping (0, subtotal > 150) + Tax (8.5% of 160 = 13.6)
    // Total = 160 + 0 + 13.6 = 173.6
    expect(state.getTotal()).toBeCloseTo(173.6, 2)
  })
})
