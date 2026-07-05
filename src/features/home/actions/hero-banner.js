"use server";

import { connectDB } from "@/config/db";
import HeroBanner from "@/models/HeroBanner";

export async function getHeroBanner() {
  try {
    await connectDB();
    const banner = await HeroBanner.findOne({ type: "main_banner" }).lean();
    if (banner) {
      return {
        title: banner.title,
        description: banner.description,
        imageUrl: banner.imageUrl,
        tagLine: banner.tagLine,
      };
    }

    return getDefaultHeroBanner();
  } catch (error) {
    console.error("Failed to fetch hero banner data:", error);
    return getDefaultHeroBanner();
  }
}

export async function updateHeroBanner({
  title,
  description,
  imageUrl,
  tagLine,
}) {
  try {
    await connectDB();
    await HeroBanner.findOneAndUpdate(
      { type: "main_banner" },
      { $set: { title, description, imageUrl, tagLine } },
      { upsert: true },
    );
    return { success: true, message: "Hero banner updated successfully." };
  } catch (error) {
    console.error("Failed to update hero banner data:", error);
    return { success: false, message: "Failed to update hero banner." };
  }
}

function getDefaultHeroBanner() {
  return {
    title: "Welcome to our Online Store!",
    description: "Shop for the latest fashion trends and accessories.",
    imageUrl:
      "https://res.cloudinary.com/dqh5dajig/image/upload/v1777375085/samples/coffee.jpg",
    tagLine: "Save up to 50% on your first order",
  };
}
