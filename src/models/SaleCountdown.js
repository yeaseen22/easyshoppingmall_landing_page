import mongoose from "mongoose";

const saleCountdownSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "sale_countdown",
      trim: true,
      immutable: true,
    },
    title: {
      type: String,
      required: [true, "Sale title is required"],
      trim: true,
      default: "Sale Countdown",
    },
    description: {
      type: String,
      required: [true, "Sale description is required"],
      trim: true,
      default: "Get discounts on your favorite products",
    },
    targetDate: {
      type: Date,
      required: [true, "Target date is required"],
      trim: true,
      default: new Date("2023-12-31T23:59:59.999Z"),
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Sale_Countdown ||
  mongoose.model("Sale_Countdown", saleCountdownSchema);
