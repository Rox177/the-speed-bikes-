import * as z from 'zod'

export const addressSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phone: z.string().min(8, { message: 'Phone number must be at least 8 digits.' }),
  line1: z.string().min(5, { message: 'Address line 1 must be at least 5 characters.' }),
  line2: z.string().optional(),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  state: z.string().min(2, { message: 'State/Region is required.' }),
  postalCode: z.string().min(3, { message: 'Postal code must be at least 3 characters.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
})

export const checkoutSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }).optional(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  billingSameAsShipping: z.boolean().default(true),
  paymentMethod: z.enum(['stripe', 'paypal'], { message: 'Please select a payment method.' }),
  shippingMethod: z.string().min(1, { message: 'Please select a shipping method.' }),
  customerNotes: z.string().optional(),
})
