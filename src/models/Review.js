import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
