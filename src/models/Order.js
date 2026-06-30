import { OrderStatus, PaymentMethod } from "@/lib/validations/order";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Product ID is required"],
      ref: "Product",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    deliveryCharge: {
      type: Number,
      required: [true, "Delivery charge is required"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: Object.values(PaymentMethod),
        message: `Payment method must be ${Object.values(PaymentMethod).join(", ")}`,
      },
    },
    selectedSize: {
      type: String,
      trim: true,
    },
    selectedColor: {
      type: String,
      trim: true,
    },
    selectedStatus: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: OrderStatus.PENDING,
      enum: {
        values: Object.values(OrderStatus),
        message: `Status must be ${Object.values(OrderStatus).join(", ")}`,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
