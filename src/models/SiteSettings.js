import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "global",
      unique: true,
      trim: true,
    },
    navbar: {
      brandName: {
        type: String,
        default: "EASYSHOPPINGMALL",
        trim: true,
        unique: true,
        uppercase: true,
      },
      tagline: { type: String, default: "Best deals every day", trim: true },
    },
    footer: {
      description: { type: String, default: "" },
      socialLinks: {
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
      },
      contactInfo: {
        email: { type: String, default: "easyshoppingmall@gmail.com" },
        phone: { type: String, default: "+880 1234 567890" },
        address: { type: String, default: "Dhaka, Bangladesh" },
      },
      businessHours: {
        startDate: { type: String, default: "Monday" },
        endDate: { type: String, default: "Friday" },
        startTime: { type: String, default: "9:00 AM" },
        endTime: { type: String, default: "5:00 PM" },
      },
    },
    deliveryCharge: {
      insideDhaka: { type: Number, default: 60 },
      outsideDhaka: { type: Number, default: 120 },
    },
  },
  { timestamps: true },
);

export default mongoose.models.Site_Settings ||
  mongoose.model("Site_Settings", siteSettingsSchema);
