"use server";

import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

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

export const getOrders = async (page, limit = 10) => {
  try {
    await connectDB();

    if (page === undefined) {
      const orders = await Order.find()
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
      Order.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .populate("productId", "name description image"),
      Order.countDocuments(),
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

export const getCustomers = async (page = 1, limit = 10) => {
  try {
    await connectDB();
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean()
      .populate("productId", "name description image");

    const customersMap = {};
    orders.forEach((order) => {
      const key = order.email;
      if (!key) return;

      if (!customersMap[key]) {
        customersMap[key] = {
          _id: order._id.toString(),
          name: order.customerName || order.name || "Unknown Customer",
          email: order.email || "N/A",
          phone: order.phone,
          location: order.district
            ? `${order.city || ""}, ${order.district}`
            : order.address || "Unknown",
          totalOrders: 0,
          spent: 0,
        };
      }

      customersMap[key].totalOrders += 1;
      customersMap[key].spent += Number(order.totalPrice) || 0;

      if (customersMap[key].email === "N/A" && order.email) {
        customersMap[key].email = order.email;
      }
    });

    const allCustomers = Object.values(customersMap).sort(
      (a, b) => b.spent - a.spent,
    );
    const total = allCustomers.length;
    const totalPages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const data = allCustomers.slice(skip, skip + limit);

    return { data, total, totalPages, currentPage: page };
  } catch (error) {
    console.error("Failed to get customers:", error);
    return { data: [], total: 0, totalPages: 0, currentPage: 1 };
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
