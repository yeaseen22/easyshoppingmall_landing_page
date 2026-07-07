"use server";

import { connectDB } from "@/config/db";
import Review from "@/models/Review";

export const addReview = async (reviewData) => {
  try {
    await connectDB();
    const data = {
      customerName: reviewData.customerName,
      customerEmail: reviewData.customerEmail,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      approved: false,
      featured: false,
    };
    const review = await Review.create(data);
    return {
      success: true,
      message: "Review submitted successfully and pending approval.",
      id: review._id.toString(),
    };
  } catch (error) {
    console.error("Failed to add review:", error);
    return { success: false, message: "Failed to add review." };
  }
};

export const getReviews = async ({
  status = "all",
  page = 1,
  limit = 10,
  search = "",
} = {}) => {
  try {
    await connectDB();
    const filter = {};

    if (status === "approved") {
      filter.approved = true;
    } else if (status === "pending") {
      filter.approved = false;
    } else if (status === "featured") {
      filter.featured = true;
    }

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { comment: { $regex: search, $options: "i" } },
        { customerEmail: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Review.countDocuments(filter),
    ]);

    const data = reviews.map((review) => ({
      ...review,
      _id: review._id.toString(),
    }));

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } catch (error) {
    console.log("Failed to get reviews:", error);
    return [];
  }
};

export const getApprovedReviews = async () => {
  return getReviews({ status: "approved" });
};

export const updateReview = async (id, data) => {
  try {
    await connectDB();
    const result = await Review.findByIdAndUpdate(id, { $set: data });
    if (result) {
      return { success: true, message: "Review updated successfully." };
    }
    return { success: false, message: "Review not found." };
  } catch (error) {
    console.error("Failed to update review:", error);
    return { success: false, message: "Failed to update review." };
  }
};

export const deleteReview = async (id) => {
  try {
    await connectDB();
    const result = await Review.findByIdAndDelete(id);
    if (result) {
      return { success: true, message: "Review deleted successfully." };
    }
    return { success: false, message: "Review not found." };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { success: false, message: "Failed to delete review." };
  }
};
