"use server"

import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";

export const placeOrder = async (orderData) => {
    try {
        await connectDB();
        const order = await Order.create({
            ...orderData,
            date: new Date().toISOString()
        });
        return { success: true, message: "Order placed successfully.", id: order._id.toString() };
    } catch (error) {
        console.error("Failed to place order:", error);
        return { success: false, message: "Failed to place order." };
    }
}

export const getOrders = async () => {
    try {
        await connectDB();
        const orders = await Order.find().sort({ date: -1 }).lean();
        return orders.map(order => ({
            ...order,
            _id: order._id.toString()
        }));
    } catch (error) {
        console.log("Failed to get orders:", error);
        return [];
    }
}

export const updateOrderStatus = async (id, status) => {
    try {
        await connectDB();
        const result = await Order.findByIdAndUpdate(id, { $set: { status } });
        if (result) {
            return { success: true, message: "Order status updated successfully." };
        }
        return { success: false, message: "Order not found." };
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { success: false, message: "Failed to update order status." };
    }
}

export const deleteOrder = async (id) => {
    try {
        await connectDB();
        const result = await Order.findByIdAndDelete(id);
        if (result) {
            return { success: true, message: "Order deleted successfully." };
        }
        return { success: false, message: "Order not found." };
    } catch (error) {
        console.error("Failed to delete order:", error);
        return { success: false, message: "Failed to delete order." };
    }
}
