import { z } from "zod";

export const saleCountdownSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Section title is required")
    .max(200, "Title must be under 200 characters"),
  description: z
    .string()
    .trim()
    .min(1, "Section description is required")
    .max(500, "Description must be under 500 characters"),
  targetDate: z.string().trim().min(1, "Target date is required"),
  timezone: z.string().trim().min(1, "Timezone is required"),
});
