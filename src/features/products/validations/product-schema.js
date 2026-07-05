import z from "zod";

export const ProductStatus = {
  HOT: "hot",
  COLD: "cold",
};

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce
    .number()
    .min(1, {
      error: ({ input }) => {
        return input < 0
          ? "Price cannot be negative"
          : input === 0
            ? "Price cannot be 0"
            : "Price is required";
      },
    })
    .transform((value) => parseFloat(value.toFixed(2))),
  discount: z.coerce
    .number()
    .min(0)
    .max(100, "Discount cannot exceed 100%")
    .transform((value) => Number(value))
    .default(0),
  image: z.string().url("Valid image URL is required").min(1, "Image URL is required"),
  productSizes: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((s) => s.trim().toUpperCase())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().min(1)).default([])),
  productColors: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean),
    )
    .pipe(z.array(z.string().min(1)).default([])),
  stock: z.coerce
    .number()
    .min(1, {
      error: ({ input }) => {
        return input < 0
          ? "Stock cannot be negative"
          : input === 0
            ? "Stock must be greater than 0"
            : "Stock is required";
      },
    })
    .transform((value) => Number(value))
    .default(1),
  productStatus: z.array(z.enum(Object.values(ProductStatus))).default([]),
});

export const reviewSchema = z.object({
  name: z.string().min(1, "Reviewer name is required"),
  location: z.string().optional().default(""),
  rating: z.coerce.number().min(1).max(5).default(5),
  category: z.string().optional().default(""),
  review: z.string().min(1, "Review content is required"),
  featured: z.boolean().default(false),
});

export const heroBannerSchema = z.object({
  title: z.string().min(1, "Banner title is required"),
  description: z.string().min(1, "Banner description is required"),
  imageUrl: z.string().url("Valid image URL is required").min(1, "Image URL is required"),
});

export const saleCountdownSchema = z.object({
  title: z.string().min(1, "Sale title is required"),
  description: z.string().min(1, "Sale description is required"),
  targetDate: z.string().min(1, "Target date is required"),
});
