"use server";

import { connectDB } from "@/config/db";
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
      { upsert: true },
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

export async function updateFooter(data) {
  return updateSiteSettings({ footer: data });
}

export async function updateDeliveryCharge(data) {
  return updateSiteSettings({ deliveryCharge: data });
}

function getDefaultSettings() {
  return {
    navbar: {
      brandName: "EASYSHOPPINGMALL",
      tagline: "Best deals every day",
    },
    footer: {
      description:
        "Awesome grocery store website. Quality products, unbeatable prices, fast delivery across Bangladesh.",
      socialLinks: {
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
        instagram: "https://www.instagram.com",
      },
      contactInfo: {
        email: "info@easyshoppingmall.com",
        phone: "+880 1234 567890",
        address: "Dhaka, Bangladesh",
      },
      businessHours: {
        startDate: "Monday",
        endDate: "Friday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
      },
    },
    deliveryCharge: {
      insideDhaka: 60,
      outsideDhaka: 120,
    },
  };
}
