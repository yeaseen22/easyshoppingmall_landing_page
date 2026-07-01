import { z } from "zod/v4";

export const publicReviewSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  rating: z.coerce.number().min(1, "Rating is required").max(5),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review cannot exceed 500 characters"),
});

export const adminReviewSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Valid email is required"),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(1, "Review comment is required"),
  approved: z.boolean().default(false),
  featured: z.boolean().default(false),
});
