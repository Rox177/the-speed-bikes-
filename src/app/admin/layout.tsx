"use client"

import { useAuth } from "@/hooks/use-auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/")
    }
  }, [user, isAdmin, loading, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] pt-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user || !isAdmin) return null

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <AdminSidebar />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </div>
  )
}

