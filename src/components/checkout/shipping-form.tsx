"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema } from "@/lib/validations/checkout"
import { z } from "zod"

type AddressFormValues = z.infer<typeof addressSchema>
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ShippingFormProps {
  initialValues?: any
  onSubmit: (values: any) => void
}

export function ShippingForm({ initialValues, onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialValues || {
      fullName: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-bold text-foreground border-b border-border pb-3 font-display">Shipping Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Full Name</label>
          <Input placeholder="John Doe" {...register("fullName")} />
          {errors.fullName && <p className="text-xs font-bold text-red-500">{errors.fullName.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Phone Number</label>
          <Input placeholder="(555) 000-0000" {...register("phone")} />
          {errors.phone && <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Address Line 1</label>
        <Input placeholder="123 Trailhead Path" {...register("line1")} />
        {errors.line1 && <p className="text-xs font-bold text-red-500">{errors.line1.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Address Line 2 (Optional)</label>
        <Input placeholder="Apt, Suite, Unit" {...register("line2")} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">City</label>
          <Input placeholder="Boulder" {...register("city")} />
          {errors.city && <p className="text-xs font-bold text-red-500">{errors.city.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">State/Region</label>
          <Input placeholder="CO" {...register("state")} />
          {errors.state && <p className="text-xs font-bold text-red-500">{errors.state.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">ZIP/Postal Code</label>
          <Input placeholder="80301" {...register("postalCode")} />
          {errors.postalCode && <p className="text-xs font-bold text-red-500">{errors.postalCode.message}</p>}
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full h-12 mt-4 cursor-pointer shadow-sm text-sm">
        Continue to Payment
      </Button>
    </form>
  )
}
export default ShippingForm
