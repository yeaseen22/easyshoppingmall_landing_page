"use server";

import { connectDB } from "@/config/db";
import HeroBanner from "@/models/HeroBanner";

export async function getHeroBanner() {
  try {
    await connectDB();
    const banner = await HeroBanner.findOne({ type: "main_banner" }).lean();
    if (banner) {
      return { title: banner.title, description: banner.description, imageUrl: banner.imageUrl };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch hero banner data:", error);
    return null;
  }
}

export async function updateHeroBanner(title, description, imageUrl) {
  try {
    await connectDB();
    await HeroBanner.findOneAndUpdate(
      { type: "main_banner" },
      { $set: { title, description, imageUrl } },
      { upsert: true }
    );
    return { success: true, message: "Hero banner updated successfully." };
  } catch (error) {
    console.error("Failed to update hero banner data:", error);
    return { success: false, message: "Failed to update hero banner." };
  }
}
