import { connectDB } from "@/config/db";
import Order from "@/models/Order";

export const getCustomers = async (page = 1, limit = 10, search = "") => {
  try {
    await connectDB();

    const orderFilter = search
      ? {
          $or: [
            { customerName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const orders = await Order.find(orderFilter)
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
          location: order.zilla
            ? `${order.thana || ""}, ${order.zilla}`
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
