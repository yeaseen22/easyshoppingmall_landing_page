"use server";

import { connectDB } from "@/lib/mongoose";
import SaleCountdown from "@/models/SaleCountdown";

export async function getSaleCountDown() {
  try {
    await connectDB();
    const data = await SaleCountdown.findOne({ type: "sale_countdown" }).lean();
    if (data) {
      return {
        title: data.title,
        description: data.description,
        targetDate: data.targetDate
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch sale countdown data:", error);
    return null;
  }
}

export async function updateSaleCountDown(title, description, targetDate) {
  try {
    await connectDB();
    await SaleCountdown.findOneAndUpdate(
      { type: "sale_countdown" },
      { $set: { title, description, targetDate } },
      { upsert: true }
    );
    return { success: true, message: "Sale countdown updated successfully." };
  } catch (error) {
    console.error("Failed to update sale countdown data:", error);
    return { success: false, message: "Failed to update sale countdown." };
  }
}
