"use client"

import { useUIStore } from "@/store/ui-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { SocialAuthButtons } from "./social-auth-buttons"

export function AuthModal() {
  const { authModal, setAuthModal } = useUIStore()

  const handleOpenChange = (open: boolean) => {
    if (!open) setAuthModal(null)
  }

  const isOpen = authModal !== null
  const isLogin = authModal === "login"

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-6 bg-white text-foreground dark:bg-card">
        <DialogHeader className="space-y-1 text-center">
          <DialogTitle className="text-2xl font-bold font-display">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground/80 font-medium">
            {isLogin ? "Sign in to manage your orders, settings, and wishlist." : "Join VoltTrail to unlock exclusive benefits and tracking."}
          </DialogDescription>
        </DialogHeader>

        <SocialAuthButtons />

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-card">Or continue with</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </DialogContent>
    </Dialog>
  )
}
export default AuthModal
