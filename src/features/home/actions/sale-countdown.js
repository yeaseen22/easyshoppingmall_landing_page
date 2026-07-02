"use server";

import { connectDB } from "@/config/db";
import SaleCountdown from "@/models/SaleCountdown";
import { isPast, parseISO } from "date-fns";

export async function getSaleCountDown() {
  try {
    await connectDB();
    const data = await SaleCountdown.findOne({ type: "sale_countdown" }).lean();
    if (data) {
      return {
        title: data.title,
        description: data.description,
        targetDate: data.targetDate,
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
    const parsedDate = parseISO(targetDate);

    if (isNaN(parsedDate.getTime())) {
      return { success: false, message: "Invalid date format." };
    }

    if (isPast(parsedDate)) {
      return {
        success: false,
        message: "Target date must be in the future. Please select a future date and time.",
      };
    }

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
