"use server";

import { connectDB } from "@/config/db";
import SaleCountdown from "@/models/SaleCountdown";
import { localToUtc } from "@/utils/timezone";

export async function getSaleCountDown() {
  try {
    await connectDB();
    const data = await SaleCountdown.findOne({ type: "sale_countdown" }).lean();
    if (data) {
      return {
        title: data.title,
        description: data.description,
        targetDate: data.targetDate,
        timezone: data.timezone || "Asia/Dhaka",
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch sale countdown data:", error);
    return null;
  }
}

export async function updateSaleCountDown(title, description, targetDate, timezone) {
  try {
    if (!targetDate) {
      return { success: false, message: "Target date is required." };
    }

    const parsedDate = localToUtc(targetDate, timezone);

    if (isNaN(parsedDate.getTime())) {
      return { success: false, message: "Invalid date format." };
    }

    const now = new Date();
    if (parsedDate <= now) {
      return {
        success: false,
        message: "Target date must be in the future. Please select a future date and time.",
      };
    }

    await connectDB();
    await SaleCountdown.findOneAndUpdate(
      { type: "sale_countdown" },
      { $set: { title, description, targetDate: parsedDate, timezone } },
      { upsert: true },
    );
    return { success: true, message: "Sale countdown updated successfully." };
  } catch (error) {
    console.error("Failed to update sale countdown data:", error);
    return { success: false, message: "Failed to update sale countdown." };
  }
}
