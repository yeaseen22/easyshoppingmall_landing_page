import { ProductStatus } from "@/features/products/validations/product-schema";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    productSizes: {
      type: [String],
      default: [],
    },
    productColors: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    discountedPrice: {
      type: Number,
      default: 0,
      min: [0, "Discounted price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    productStatus: {
      type: [
        {
          type: String,
          enum: {
            values: Object.values(ProductStatus),
            message: `Product Status must be ${Object.values(ProductStatus).join(", ")}`,
          },
        },
      ],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save", function () {
  if (this.price && this.discount > 0) {
    this.discountedPrice = parseFloat(
      (this.price - (this.price * this.discount) / 100).toFixed(2),
    );
    console.log("From pre if block", this.discount);
  } else {
    this.discountedPrice = this.price || 0;
  }
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
