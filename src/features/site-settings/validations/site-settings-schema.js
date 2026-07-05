import { z } from "zod";

const phoneRegex = /^01[3-9]\d{8}$/;

export const navbarSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  tagline: z.string().optional(),
});

export const footerSchema = z.object({
  description: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
  }),
  contactInfo: z.object({
    email: z.string().email("Valid email is required").optional(),
    phone: z
      .string()
      .regex(phoneRegex, "Please provide a valid Bangladeshi phone number")
      .optional(),
    address: z.string().optional(),
  }),
  businessHours: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const deliverySchema = z.object({
  insideDhaka: z.coerce.number().min(0, "Charge cannot be negative"),
  outsideDhaka: z.coerce.number().min(0, "Charge cannot be negative"),
});

export const mfsProviderSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please provide a valid Bangladeshi phone number"),
  type: z.enum(["Send Money", "Cash Out"], {
    error: ({ input }) => {
      return input === "Send Money" || input === "Cash Out"
        ? undefined
        : "Transaction type is required";
    },
  }),
});

export const paymentMethodsSchema = z.object({
  nagad: mfsProviderSchema,
  bKash: mfsProviderSchema,
});
