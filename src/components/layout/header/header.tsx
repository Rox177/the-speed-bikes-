"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search } from "lucide-react"
import { useUIStore } from "@/store/ui-store"
import { cn } from "@/lib/utils/cn"
import { AnnouncementBar } from "../announcement-bar"
import { NavMenu } from "./nav-menu"
import { CartIcon } from "./cart-icon"
import { WishlistIcon } from "./wishlist-icon"
import { UserMenu } from "./user-menu"
import { MobileMenu } from "./mobile-menu"
import { SearchBar } from "./search-bar"

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { setMobileMenuOpen, setSearchOpen } = useUIStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHome = pathname === "/"
  const isDarkHeader = scrolled || !isHome

  return (
    <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300">
      <AnnouncementBar />
      <div
        className={cn(
          "w-full h-20 transition-all duration-300 border-b flex items-center px-4 md:px-8",
          isDarkHeader
            ? "bg-black border-black shadow-md"
            : "bg-white border-white shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 rounded-full transition-all cursor-pointer active:scale-95",
                isDarkHeader
                  ? "hover:bg-gray-800 text-white"
                  : "hover:bg-gray-100 text-black"
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5.5 w-5.5 stroke-[2]" />
            </button>
            <Link
              href="/"
              className={cn(
                "text-xl md:text-2xl font-extrabold font-display flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98] transition-all",
                isDarkHeader ? "text-white" : "text-black"
              )}
            >
              <span>⚡ VoltTrail</span>
            </Link>
          </div>

          <NavMenu isDarkHeader={isDarkHeader} />

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className={cn(
                "p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95",
                isDarkHeader
                  ? "hover:bg-gray-800 text-white"
                  : "hover:bg-gray-100 text-black"
              )}
              aria-label="Search items"
            >
              <Search className="h-5.5 w-5.5 stroke-[2]" />
            </button>
            
            <WishlistIcon isDarkHeader={isDarkHeader} />
            <CartIcon isDarkHeader={isDarkHeader} />
            <UserMenu isDarkHeader={isDarkHeader} />
          </div>
        </div>
      </div>

      <MobileMenu />
      <SearchBar />
    </header>
  )
}
export default Header
