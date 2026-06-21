import * as z from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  tagline: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  shortDescription: z.string().optional(),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  comparePrice: z.coerce.number().positive().optional().nullable(),
  sku: z.string().min(3, { message: 'SKU is required.' }),
  barcode: z.string().optional(),
  brandId: z.string().uuid({ message: 'Select a brand.' }),
  categoryId: z.string().uuid({ message: 'Select a category.' }),
  weightKg: z.coerce.number().positive().optional().nullable(),
  color: z.string().optional(),
  frameMaterial: z.string().optional(),
  
  motorPowerW: z.coerce.number().int().positive().optional().nullable(),
  batteryVoltageV: z.coerce.number().positive().optional().nullable(),
  batteryCapacityWh: z.coerce.number().positive().optional().nullable(),
  maxRangeKm: z.coerce.number().positive().optional().nullable(),
  maxSpeedKmh: z.coerce.number().positive().optional().nullable(),
  chargeTimeHours: z.coerce.number().positive().optional().nullable(),
  motorType: z.string().optional(),
  assistLevels: z.coerce.number().int().positive().optional().nullable(),
  displayType: z.string().optional(),
  brakeType: z.string().optional(),
  suspension: z.string().optional(),
  wheelSizeIn: z.coerce.number().positive().optional().nullable(),
  gearCount: z.coerce.number().int().positive().optional().nullable(),
  frameSizes: z.array(z.string()).default([]),
  ipRating: z.string().optional(),
  
  thumbnailUrl: z.string().url({ message: 'Provide a valid thumbnail image URL.' }),
  imageUrls: z.array(z.string()).default([]),
  videoUrl: z.string().optional().nullable(),
  
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  
  stockQuantity: z.coerce.number().int().nonnegative({ message: 'Stock must be non-negative.' }),
  lowStockThreshold: z.coerce.number().int().nonnegative().default(5),
  trackInventory: z.boolean().default(true),
  
  warrantyYears: z.coerce.number().int().nonnegative().default(2),
  warrantyNotes: z.string().optional(),
  
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
})
