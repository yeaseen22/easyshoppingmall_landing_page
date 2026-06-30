"use server"

import { connectDB } from "@/lib/mongoose";
import Review from "@/models/Review";

export const addReview = async (reviewData) => {
    try {
        await connectDB();
        const review = await Review.create(reviewData);
        return { success: true, message: "Review added successfully.", id: review._id.toString() };
    } catch (error) {
        console.error("Failed to add review:", error);
        return { success: false, message: "Failed to add review." };
    }
}

export const getReviews = async () => {
    try {
        await connectDB();
        const reviews = await Review.find().sort({ createdAt: -1 }).lean();
        return reviews.map(review => ({
            ...review,
            _id: review._id.toString()
        }));
    } catch (error) {
        console.log("Failed to get reviews:", error);
        return [];
    }
}

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
}

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
}
