"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, ShoppingBag, Settings, LogOut, ShieldAlert } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils/cn"

export function AccountSidebar() {
  const pathname = usePathname()
  const { signOut, isAdmin } = useAuth()

  const links = [
    { name: "Profile Details", href: "/account", icon: User },
    { name: "Order History", href: "/account/orders", icon: ShoppingBag },
    { name: "Account Settings", href: "/account/settings", icon: Settings },
  ]

  return (
    <aside className="w-full md:w-64 bg-card border border-border rounded-xl p-5 space-y-6">
      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">My Account</div>
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all hover:bg-muted cursor-pointer",
                isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:text-foreground"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{link.name}</span>
            </Link>
          )
        })}

        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-primary/5 transition-all cursor-pointer"
          >
            <ShieldAlert className="h-4.5 w-4.5" />
            <span>Admin Panel</span>
          </Link>
        )}

        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-destructive hover:bg-destructive/5 transition-all cursor-pointer w-full text-left"
        >
          <LogOut className="h-4.5 w-4.5" />
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  )
}
export default AccountSidebar
