"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Bike, Users, Settings, LogOut, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils/cn"

export function AdminSidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Bike },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  ]

  return (
    <aside className="w-full md:w-64 bg-card border border-border rounded-xl p-5 space-y-6">
      <div className="space-y-1.5 border-b border-border pb-4">
        <h3 className="text-sm font-extrabold text-primary flex items-center gap-1.5 font-display">
          <span>⚡ VoltTrail Admin</span>
        </h3>
        <p className="text-[10px] text-muted-foreground font-semibold">Management Console</p>
      </div>
      
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

        <div className="border-t border-border/80 my-4 pt-4"></div>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          <span>Back to Storefront</span>
        </Link>

        <button
          onClick={signOut}
