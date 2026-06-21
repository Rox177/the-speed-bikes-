"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validations/auth"
import { z } from "zod"

type RegisterFormValues = z.infer<typeof registerSchema>
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/ui-store"
import { createClient } from "@/lib/supabase/client"
import { Loader2, AlertCircle, Check } from "lucide-react"

export function RegisterForm() {
  const supabase = createClient()
  const setAuthModal = useUIStore((state) => state.setAuthModal)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-4 text-center py-6">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <Check className="h-6 w-6 stroke-[2.5]" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Verify Your Email</h3>
        <p className="text-xs text-muted-foreground/80 leading-relaxed font-semibold max-w-sm mx-auto">
          We have sent a verification link to your email address. Please click it to finalize registration.
        </p>
        <Button onClick={() => setAuthModal("login")} variant="outline" className="w-full">
          Proceed to Sign In
        </Button>
      </div>
    )
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
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Full Name</label>
        <Input placeholder="John Doe" {...register("fullName")} />
        {errors.fullName && <p className="text-xs font-bold text-red-500">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Email Address</label>
        <Input placeholder="name@domain.com" type="email" {...register("email")} />
        {errors.email && <p className="text-xs font-bold text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Password</label>
          <Input placeholder="••••••••" type="password" {...register("password")} />
          {errors.password && <p className="text-xs font-bold text-red-500">{errors.password.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Confirm Password</label>
          <Input placeholder="••••••••" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs font-bold text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full h-11 gap-2 cursor-pointer shadow-sm text-sm">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span>Sign Up</span>
      </Button>

      <div className="text-center text-xs font-semibold text-muted-foreground pt-2">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setAuthModal("login")}
          className="text-primary hover:underline font-bold"
        >
          Sign In
        </button>
      </div>
    </form>
  )
}
export default RegisterForm
