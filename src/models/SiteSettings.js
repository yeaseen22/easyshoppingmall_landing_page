import mongoose from "mongoose";

const mfsProviderSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^01[3-9]\d{8}$/,
        "Please provide a valid Bangladeshi phone number",
      ],
    },
    type: {
      type: String,
      required: [true, "Transaction type is required"],
      enum: {
        values: ["Send Money", "Cash Out"],
        message: "{VALUE} is not supported. Must be SendMoney or CashOut",
      },
    },
  },
  { _id: false },
);

const siteSettingsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "global",
      unique: true,
      trim: true,
      immutable: true,
    },
    navbar: {
      brandName: {
        type: String,
        default: "EASYSHOPPINGMALL",
        trim: true,
        uppercase: true,
        required: [true, "Brand name is required"],
      },
      tagline: { type: String, trim: true },
    },
    footer: {
      description: { type: String, default: "", trim: true },
      socialLinks: {
        facebook: { type: String, default: "", trim: true },
        twitter: { type: String, default: "", trim: true },
        instagram: { type: String, default: "", trim: true },
      },
      contactInfo: {
        email: {
          type: String,
          default: "easyshoppingmall@gmail.com",
          trim: true,
          lowercase: true,
        },
        phone: { type: String, default: "+880 1234 567890", trim: true },
        address: { type: String, default: "Dhaka, Bangladesh", trim: true },
      },
      businessHours: {
        startDate: { type: String, default: "Monday", trim: true },
        endDate: { type: String, default: "Friday", trim: true },
        startTime: { type: String, default: "9:00 AM", trim: true },
        endTime: { type: String, default: "5:00 PM", trim: true },
      },
    },
    deliveryCharge: {
      insideDhaka: {
        type: Number,
        default: 60,
        min: [0, "Charge cannot be negative"],
      },
      outsideDhaka: {
        type: Number,
        default: 120,
        min: [0, "Charge cannot be negative"],
      },
    },

    paymentMethods: {
      nagad: {
        type: mfsProviderSchema,
        required: false,
      },
      bKash: {
        type: mfsProviderSchema,
        required: false,
      },
    },
  },
  { timestamps: true, collection: "site_settings" },
);

const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
