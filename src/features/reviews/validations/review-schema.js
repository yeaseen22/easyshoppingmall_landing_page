import z from "zod";

export const reviewSchema = z.object({
  name: z.string().min(1, "Reviewer name is required"),
  location: z.string().optional().default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  category: z.string().optional().default(""),
  review: z.string().min(1, "Review content is required"),
  featured: z.boolean().default(false),
});

export const publicReviewSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  rating: z.coerce.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});
