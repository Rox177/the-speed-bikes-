"use client"

import Link from "next/link"
import { X, Search, ChevronRight, Heart, ShoppingBag, LayoutDashboard, LogOut, User } from "lucide-react"
import { useUIStore } from "@/store/ui-store"
import { useAuth } from "@/hooks/use-auth"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { NAV_LINKS } from "@/lib/constants/nav-links"

export function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useUIStore()
  const { user, profile, signOut, isAdmin } = useAuth()

  const handleSearchClick = () => {
    setMobileMenuOpen(false)
    setSearchOpen(true)
  }

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetContent side="right" className="w-full max-w-sm flex flex-col p-6 bg-white text-foreground dark:bg-card">
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold font-display text-primary flex items-center gap-1.5">
            <span>⚡ VoltTrail</span>
          </Link>
        </div>

        <button
          onClick={handleSearchClick}
          className="flex items-center gap-3 w-full bg-muted border border-border rounded-xl p-3 text-left text-muted-foreground/80 hover:text-foreground mb-6 transition-all cursor-pointer"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-semibold">Search e-bikes, gear...</span>
        </button>

        <nav className="flex-1 overflow-y-auto space-y-6 pr-2">
          <div className="space-y-4">
            {NAV_LINKS.map((link) => (
              <div key={link.title} className="space-y-2">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </Link>
                {link.items && (
                  <div className="pl-4 border-l border-border/85 space-y-2">
                    {link.items.map((sublink) => (
                      <Link
                        key={sublink.title}
                        href={sublink.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-foreground font-medium transition-colors"
                      >
                        {sublink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-border pt-6 mt-auto space-y-4">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-muted rounded-xl">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {(profile?.fullName || user.email).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{profile?.fullName || user.email.split('@')[0]}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{user.email}</div>
                </div>
              </div>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold p-2 hover:bg-muted rounded-lg text-primary"
                >
                  <LayoutDashboard className="h-4.5 w-4.5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-semibold p-2 hover:bg-muted rounded-lg"
              >
                <User className="h-4.5 w-4.5" />
                <span>My Account</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  signOut()
                }}
                className="flex items-center gap-3 text-sm font-semibold p-2 hover:bg-muted rounded-lg text-destructive w-full text-left cursor-pointer"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  useUIStore.getState().setAuthModal('login')
                }}
                className="w-full h-11 border border-border text-foreground hover:bg-muted font-bold rounded-lg transition-all text-sm cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  useUIStore.getState().setAuthModal('register')
                }}
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-olive-600 font-bold rounded-lg transition-all text-sm cursor-pointer shadow-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
