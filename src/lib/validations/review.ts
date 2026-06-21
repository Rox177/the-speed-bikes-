import * as z from 'zod'

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5, { message: 'Rating must be between 1 and 5 stars.' }),
  title: z.string().min(2, { message: 'Review title must be at least 2 characters.' }),
  body: z.string().min(10, { message: 'Review description must be at least 10 characters.' }),
  pros: z.string().optional(),
  cons: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
})
