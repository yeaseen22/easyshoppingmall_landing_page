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
      default: "Save up to 50% on your first order",
    },
    title: {
      type: String,
      required: [true, "Banner title is required"],
      trim: true,
      default: "Shop Smarter, Save Big",
    },
    description: {
      type: String,
      required: [true, "Banner description is required"],
      trim: true,
      default:
        "Experience the future of online shopping. Premium products, wholesale prices, and lightning-fast delivery at your doorstep.",
    },
    imageUrl: {
      type: String,
      required: [true, "Banner image URL is required"],
      trim: true,
      default:
        "https://res.cloudinary.com/dqh5dajig/image/upload/v1777375085/samples/coffee.jpg",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Hero_Banner ||
  mongoose.model("Hero_Banner", heroBannerSchema);
