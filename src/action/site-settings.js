"use server";

import { connectDB } from "@/lib/mongoose";
import SiteSettings from "@/models/SiteSettings";

export async function getSiteSettings() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ type: "global" }).lean();
    if (settings) {
      return {
        ...settings,
        _id: settings._id.toString(),
      };
    }
    return getDefaultSettings();
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return getDefaultSettings();
  }
}

export async function updateSiteSettings(data) {
  try {
    await connectDB();
    await SiteSettings.findOneAndUpdate(
      { type: "global" },
      { $set: data },
      { upsert: true }
    );
    return { success: true, message: "Site settings updated successfully." };
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return { success: false, message: "Failed to update site settings." };
  }
}

export async function updateNavbar(data) {
  return updateSiteSettings({ navbar: data });
}

export async function updateFeatures(data) {
  return updateSiteSettings({ features: data });
}

export async function updateAbout(data) {
  return updateSiteSettings({ about: data });
}

export async function updateFooter(data) {
  return updateSiteSettings({ footer: data });
}

export async function updateSections(data) {
  return updateSiteSettings({ sections: data });
}

function getDefaultSettings() {
  return {
    navbar: {
      brandName: "EASYSHOPPINGMALL",
      tagline: "Best deals every day",
      navLinks: [],
    },
    features: {
      enabled: true,
      title: "Why Choose Us",
      subtitle: "We provide the best shopping experience",
      items: [
        {
          title: "Quality Products",
          description: "Premium quality items at wholesale prices",
          icon: "Package",
        },
        {
          title: "Fast Delivery",
          description: "Lightning-fast delivery across Bangladesh",
          icon: "Truck",
        },
        {
          title: "Secure Payment",
          description: "Multiple secure payment options available",
          icon: "Shield",
        },
        {
          title: "24/7 Support",
          description: "Round-the-clock customer support",
          icon: "Headphones",
        },
      ],
    },
    about: {
      enabled: true,
      title: "About Us",
      description: "EasyShoppingMall is your premier destination for online shopping in Bangladesh. We offer quality products, competitive prices, and fast delivery.",
      imageUrl: "",
    },
    footer: {
      copyright: "© 2025 EasyShoppingMall. All rights reserved.",
      description: "Awesome grocery store website. Quality products, unbeatable prices, fast delivery across Bangladesh.",
      socialLinks: [
        { platform: "facebook", label: "Facebook", url: "#" },
        { platform: "twitter", label: "Twitter", url: "#" },
        { platform: "instagram", label: "Instagram", url: "#" },
      ],
      paymentMethods: ["bKash", "Nagad", "Visa", "MasterCard", "COD"],
      contactInfo: [
        { icon: "MapPin", text: "Dhaka, Bangladesh", label: "" },
        { icon: "Phone", text: "+880 1700-000000", label: "Call Us:" },
        { icon: "Mail", text: "info@easyshoppingmall.com", label: "Email:" },
        { icon: "Clock", text: "Mon–Sat: 9am – 6pm", label: "" },
      ],
    },
    sections: [
      { name: "hero", order: 0, enabled: true },
      { name: "features", order: 1, enabled: true },
      { name: "saleCountdown", order: 2, enabled: true },
      { name: "featuredProducts", order: 3, enabled: true },
      { name: "about", order: 4, enabled: true },
      { name: "reviews", order: 5, enabled: true },
      { name: "order", order: 6, enabled: true },
      { name: "footer", order: 7, enabled: true },
    ],
  };
}
