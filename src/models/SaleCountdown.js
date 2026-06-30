import mongoose from "mongoose";

const saleCountdownSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "sale_countdown",
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Sale title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Sale description is required"],
      trim: true,
    },
    targetDate: {
      type: String,
      required: [true, "Target date is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Sale_Countdown || mongoose.model("Sale_Countdown", saleCountdownSchema);
