import z from "zod";

export const OrderStatus = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const PaymentMethod = {
  COD: "cod",
  BKASH: "bkash",
  NAGAD: "nagad",
};

export const createOrderSchema = ({product, paymentMethod}) => {
  const hasColor = product?.productColors?.length > 0;
  const hasSize = product?.productSizes?.length > 0;
  const hasStatus = product?.productStatus?.length > 0;
  const notCOD = paymentMethod !== PaymentMethod.COD;

  const schema = {
    customerName: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone number is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Valid email is required"),
    paymentMethod: z.enum(Object.values(PaymentMethod)),
    quantity: z.coerce
      .number()
      .min(1, "Quantity must be at least 1")
      .max(
        product?.stock || 99,
        product?.stock > 0
          ? `Only ${product.stock} items in stock`
          : "Product is out of stock",
      ),
  };

  if (notCOD) {
    schema.transactionId = z.string().min(1, "Transaction ID is required");
  } else {
    schema.transactionId = z.string().optional();
  }

  if (hasSize) {
    schema.selectedSize = z.string().min(1, "Please select a size");
  } else {
    schema.selectedSize = z.string().optional();
  }

  if (hasColor) {
    schema.selectedColor = z.string().min(1, "Please select a color");
  } else {
    schema.selectedColor = z.string().optional();
  }

  if (hasStatus) {
    schema.selectedStatus = z.string().min(1, "Please select a status option");
  } else {
    schema.selectedStatus = z.string().optional();
  }

  return z.object(schema);
};
