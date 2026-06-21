import { useEffect, useState } from 'react'
import { useWishlistStore, WishlistItem } from '@/store/wishlist-store'

export function useWishlist() {
  const store = useWishlistStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return {
    ...store,
    items: isHydrated ? store.items : ([] as WishlistItem[]),
    itemCount: isHydrated ? store.items.length : 0,
    isHydrated,
  }
}
