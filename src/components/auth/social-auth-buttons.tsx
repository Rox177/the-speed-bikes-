"use client"

import { createClient } from "@/lib/supabase/client"

export function SocialAuthButtons() {
  const supabase = createClient()

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => handleOAuth('google')}
        className="flex items-center justify-center gap-2 h-11 border border-border rounded-lg hover:bg-muted font-bold text-xs transition-all cursor-pointer text-foreground"
      >
        <span>Google</span>
      </button>
      <button
        onClick={() => handleOAuth('github')}
        className="flex items-center justify-center gap-2 h-11 border border-border rounded-lg hover:bg-muted font-bold text-xs transition-all cursor-pointer text-foreground"
      >
        <span>GitHub</span>
      </button>
    </div>
  )
}
export default SocialAuthButtons
