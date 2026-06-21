"use client"

import Link from "next/link"
import { User, LogOut, LayoutDashboard, Settings, ShoppingCart } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useUIStore } from "@/store/ui-store"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function UserMenu({ isDarkHeader }: { isDarkHeader: boolean }) {
  const { user, profile, isAdmin, signOut } = useAuth()
  const setAuthModal = useUIStore((state) => state.setAuthModal)

  if (!user) {
    return (
      <button
        onClick={() => setAuthModal("login")}
        className={`p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center ${
          isDarkHeader
            ? "hover:bg-gray-800 text-white"
            : "hover:bg-gray-100 text-black"
        }`}
        aria-label="Account Login"
      >
        <User className="h-5.5 w-5.5 stroke-[2]" />
      </button>
    )
  }

  const displayName = profile?.fullName || user.email?.split("@")[0] || "Rider"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`p-1 rounded-full transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center border ${
            isDarkHeader
              ? "hover:bg-gray-800 text-white border-gray-600"
              : "hover:bg-gray-100 text-black border-gray-300"
          }`}
          aria-label="User Menu"
        >
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={displayName}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-primary">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2">
        <div className="px-3 py-2 text-sm font-semibold border-b border-border">
          <div className="truncate text-foreground">{displayName}</div>
          <div className="truncate text-[11px] text-muted-foreground/80 font-normal">{user.email}</div>
        </div>
        
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center w-full gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center w-full gap-2">
            <User className="h-4 w-4" />
            <span>Profile Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="flex items-center w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Order History</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="flex items-center w-full gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={signOut}
          className="flex items-center gap-2 text-destructive hover:bg-destructive/10 focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
