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
      logo: { type: String, default: "" },
      brandName: { type: String, default: "EASYSHOPPINGMALL" },
      tagline: { type: String, default: "Best deals every day" },
      navLinks: [
        {
          label: { type: String, required: true },
          href: { type: String, required: true },
        },
      ],
    },
    features: {
      enabled: { type: Boolean, default: true },
      title: { type: String, default: "Why Choose Us" },
      subtitle: { type: String, default: "We provide the best shopping experience" },
      items: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          icon: { type: String, default: "Package" },
        },
      ],
    },
    about: {
      enabled: { type: Boolean, default: true },
      title: { type: String, default: "About Us" },
      description: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
    },
    footer: {
      copyright: { type: String, default: "© 2025 EasyShoppingMall. All rights reserved." },
      description: { type: String, default: "" },
      socialLinks: [
        {
          platform: { type: String, required: true },
          label: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
      paymentMethods: [{ type: String }],
      contactInfo: [
        {
          icon: { type: String, default: "MapPin" },
          text: { type: String, required: true },
          label: { type: String, default: "" },
        },
      ],
    },
    sections: [
      {
        name: { type: String, required: true },
        order: { type: Number, default: 0 },
        enabled: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model("SiteSettings", siteSettingsSchema);
