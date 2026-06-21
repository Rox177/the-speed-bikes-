"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function AccountProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const [fullName, setFullName] = useState(profile?.fullName || "")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone,
        })
        .eq("id", user.id)

      if (updateError) {
        setError(updateError.message)
      } else {
        setSuccess(true)
        await refreshProfile()
      }
    } catch (err) {
      setError("Failed to update profile details.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 bg-card border border-border p-6 rounded-xl shadow-sm">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold text-foreground font-display">Profile Details</h2>
        <p className="text-xs text-muted-foreground/80 font-semibold">Update your account coordinates and contact details.</p>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold rounded-lg">
          <CheckCircle2 className="h-4 w-4" />
          <span>Profile coordinates successfully updated!</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">Email Address</label>
          <Input value={user?.email || ""} disabled className="bg-muted opacity-80 cursor-not-allowed font-medium" />
          <p className="text-[10px] text-muted-foreground font-semibold">Email address is managed via auth configuration settings.</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">Full Name</label>
          <Input placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">Phone Number</label>
          <Input placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <Button type="submit" disabled={loading} className="h-11 px-6 shadow-sm text-sm cursor-pointer">
          {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          <span>Save Changes</span>
        </Button>
      </form>
    </div>
  )
}
