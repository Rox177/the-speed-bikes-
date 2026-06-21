"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations/auth"
import { z } from "zod"

type LoginFormValues = z.infer<typeof loginSchema>
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/ui-store"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle } from "lucide-react"

export function LoginForm() {
  const supabase = createClient()
  const setAuthModal = useUIStore((state) => state.setAuthModal)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) {
        setError(signInError.message)
      } else {
        setAuthModal(null) // Close modal on success
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Email Address</label>
        <Input placeholder="name@domain.com" type="email" {...register("email")} />
        {errors.email && <p className="text-xs font-bold text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Password</label>
          <button
            type="button"
            onClick={() => setAuthModal("forgot-password")}
            className="text-xs text-primary hover:underline font-bold"
          >
            Forgot Password?
          </button>
        </div>
        <Input placeholder="••••••••" type="password" {...register("password")} />
        {errors.password && <p className="text-xs font-bold text-red-500">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full h-11 gap-2 cursor-pointer shadow-sm text-sm">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Sign In</span>
      </Button>

      <div className="text-center text-xs font-semibold text-muted-foreground pt-2">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => setAuthModal("register")}
          className="text-primary hover:underline font-bold"
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}
export default LoginForm
