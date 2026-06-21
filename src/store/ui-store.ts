import { create } from 'zustand'

type AuthModalType = 'login' | 'register' | 'forgot-password' | null

interface UIState {
  isCartOpen: boolean
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  authModal: AuthModalType
  setCartOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setMobileMenuOpen: (open: boolean) => void
  setAuthModal: (modal: AuthModalType) => void
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  authModal: null,

  setCartOpen: (open) => set({ isCartOpen: open }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setAuthModal: (modal) => set({ authModal: modal }),
}))
