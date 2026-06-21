"use client"

import { DollarSign, ShoppingBag, Star, Package, ArrowRight, UserPlus } from "lucide-react"
import { formatCurrency } from "@/lib/utils/format"

const STATS = [
  { label: "Total Revenue", value: 148900, icon: DollarSign, change: "+12.5% this month", variant: "primary" },
  { label: "Total Orders", value: 42, icon: ShoppingBag, change: "+8% this week", variant: "secondary" },
  { label: "Avg Rating", value: "4.7 / 5.0", icon: Star, change: "18 verified reviews", variant: "accent" },
  { label: "Gear Listings", value: 3, icon: Package, change: "3 e-bikes, 0 accessories", variant: "outline" }
]

const RECENT_ORDERS = [
  { id: "VT-10042", customer: "John Doe", items: "1x Apex Peak-9", total: 4999.00, status: "processing", date: "June 19, 2026" },
  { id: "VT-10041", customer: "Alice Smith", items: "1x UrbanFlow Carbon S", total: 2899.00, status: "confirmed", date: "June 18, 2026" },
  { id: "VT-10040", customer: "Marcus Thorne", items: "1x Nomad Ranger Cargo", total: 3599.00, status: "delivered", date: "June 15, 2026" }
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-foreground font-display">Console Dashboard</h2>
          <p className="text-xs text-muted-foreground/80 font-semibold">Store health, sales conversions, and customer logs.</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card border border-border p-5 rounded-xl shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-muted-foreground/85 uppercase tracking-wider">{stat.label}</span>
                <div className="p-2 bg-muted rounded-lg text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-extrabold text-foreground">
                  {typeof stat.value === "number" ? formatCurrency(stat.value) : stat.value}
                </div>
                <div className="text-[10px] text-green-600 font-bold">{stat.change}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* SVG Chart Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-foreground font-display">Revenue Metrics (Last 6 Months)</h3>
          
          {/* Stunning minimalist SVG chart */}
          <div className="relative h-64 w-full flex items-end">
            <svg className="w-full h-full" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#d8e0b7" strokeOpacity="0.4" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#d8e0b7" strokeOpacity="0.4" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="600" y2="160" stroke="#d8e0b7" strokeOpacity="0.4" strokeDasharray="4 4" />
              
              {/* Path area fill */}
              <path
                d="M 50 200 L 150 180 L 250 140 L 350 160 L 450 100 L 550 50 L 550 200 Z"
                fill="url(#gradient-fill)"
                opacity="0.15"
              />
              
              {/* Line path */}
              <path
                d="M 50 200 L 150 180 L 250 140 L 350 160 L 450 100 L 550 50"
                stroke="#6B7A3D"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              <circle cx="50" cy="200" r="5" fill="#6B7A3D" stroke="#fff" strokeWidth="2" />
              <circle cx="150" cy="180" r="5" fill="#6B7A3D" stroke="#fff" strokeWidth="2" />
              <circle cx="250" cy="140" r="5" fill="#6B7A3D" stroke="#fff" strokeWidth="2" />
              <circle cx="350" cy="160" r="5" fill="#6B7A3D" stroke="#fff" strokeWidth="2" />
              <circle cx="450" cy="100" r="5" fill="#6B7A3D" stroke="#fff" strokeWidth="2" />
              <circle cx="550" cy="50" r="5" fill="#6B7A3D" stroke="#fff" strokeWidth="2" />

              <defs>
                <linearGradient id="gradient-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B7A3D" />
                  <stop offset="100%" stopColor="#6B7A3D" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Chart Labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-6 text-[10px] font-bold text-muted-foreground/80 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Panel */}
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-foreground font-display">Recent Activity Log</h3>
          <div className="space-y-4 text-xs font-semibold text-muted-foreground/90">
            <div className="flex gap-3 items-start border-l-2 border-primary pl-3 py-1">
              <div className="space-y-0.5">
                <div className="text-foreground">New review submitted on Peak-9</div>
                <div className="text-[10px] text-muted-foreground/80">1 hour ago &bull; Approved automatically</div>
              </div>
            </div>
            <div className="flex gap-3 items-start border-l-2 border-accent pl-3 py-1">
              <div className="space-y-0.5">
                <div className="text-foreground">Stock warning: Peak-9 S-size</div>
                <div className="text-[10px] text-red-500">Only 2 items left in inventory</div>
              </div>
            </div>
            <div className="flex gap-3 items-start border-l-2 border-primary pl-3 py-1">
              <div className="space-y-0.5">
                <div className="text-foreground">Discount codeWELCOME10 applied</div>
                <div className="text-[10px] text-muted-foreground/80">3 hours ago &bull; VT-10042 Checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders table list */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h3 className="text-base font-bold text-foreground font-display">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-xs font-bold text-muted-foreground/85 uppercase tracking-wider">
                <th className="p-4 pl-6">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Gear Items</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 font-medium">
                  <td className="p-4 pl-6 font-bold text-foreground">{order.id}</td>
                  <td className="p-4 text-foreground/80">{order.customer}</td>
                  <td className="p-4 text-foreground/80">{order.items}</td>
                  <td className="p-4 text-primary font-bold">{formatCurrency(order.total)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-muted-foreground/80 text-xs font-semibold">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
