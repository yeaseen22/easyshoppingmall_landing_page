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
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    targetDate: {
      type: Date,
      trim: true,
    },
    timezone: {
      type: String,
      default: "Asia/Dhaka",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Sale_Countdown ||
  mongoose.model("Sale_Countdown", saleCountdownSchema);
