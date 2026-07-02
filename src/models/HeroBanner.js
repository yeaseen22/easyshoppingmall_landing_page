import mongoose from "mongoose";

const heroBannerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "main_banner",
      trim: true,
    },
    tagLine: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      required: [true, "Banner title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Banner description is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Banner image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Hero_Banner ||
  mongoose.model("Hero_Banner", heroBannerSchema);
