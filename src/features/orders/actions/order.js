"use server";

import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { Types } from "mongoose";

export const placeOrder = async (orderData) => {
  try {
    await connectDB();

    const product = await Product.findById(orderData.productId);
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    if (product.stock < orderData.quantity) {
      return {
        success: false,
        message:
          product.stock === 0
            ? "Product is out of stock."
            : `Only ${product.stock} items in stock.`,
      };
    }

    const order = await Order.create(orderData);
    product.stock -= orderData.quantity;
    await product.save();

    return {
      success: true,
      message: "Order placed successfully.",
      id: order._id.toString(),
    };
  } catch (error) {
    console.error("Failed to place order:", error);
    return { success: false, message: "Failed to place order." };
  }
};

export const getOrders = async (page, limit = 10, status, search = "") => {
  try {
    await connectDB();

    const filter = status ? { status } : {};

    if (search) {
      const searchConditions = [
        { customerName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
      
      if (Types.ObjectId.isValid(search)) {
        searchConditions.push({ _id: new Types.ObjectId(search) });
      }
      filter.$or = searchConditions;
    }

    if (page === undefined) {
      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .lean()
        .populate("productId", "name description image");

      return orders.map((order) => ({
        ...order,
        _id: order._id.toString(),
        productId: {
          name: order.productId.name,
          description: order.productId.description,
          image: order.productId.image,
        },
      }));
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .populate("productId", "name description image"),
      Order.countDocuments(filter),
    ]);

    const data = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      productId: {
        name: order.productId.name,
        description: order.productId.description,
        image: order.productId.image,
      },
    }));

    return { data, total, totalPages: Math.ceil(total / limit), currentPage: page };
  } catch (error) {
    console.log("Failed to get orders:", error);
    return [];
  }
};

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
};



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
};
