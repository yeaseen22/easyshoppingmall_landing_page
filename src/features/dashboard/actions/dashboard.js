"use server";

import { connectDB } from "@/config/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { subDays, format } from "date-fns";

export async function getDashboardStats() {
  try {
    await connectDB();
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);

    const [
      totalOrders,
      recentOrders,
      totalProducts,
      totalReviews,
      revenueResult,
      ordersByDay,
      ordersByStatus,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.find({ createdAt: { $gte: thirtyDaysAgo } }).lean(),
      Product.countDocuments(),
      Review.countDocuments({ approved: true }),
      Order.aggregate([
        { $match: { status: { $ne: "Cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            revenue: { $sum: "$totalPrice" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Order.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const recentOrderCount = recentOrders.length;
    const totalRevenue = revenueResult[0]?.total || 0;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(now, 29 - i);
      const dateStr = format(date, "yyyy-MM-dd");
      const dayData = ordersByDay.find((d) => d._id === dateStr);
      return {
        date: format(date, "MMM dd"),
        revenue: dayData?.revenue || 0,
        orders: dayData?.count || 0,
      };
    });

    const statusDistribution = [
      { name: "Pending", value: 0, color: "#eab308" },
      { name: "Processing", value: 0, color: "#3b82f6" },
      { name: "Delivered", value: 0, color: "#22c55e" },
      { name: "Cancelled", value: 0, color: "#ef4444" },
    ];

    ordersByStatus.forEach((s) => {
      const item = statusDistribution.find((st) => st.name === s._id);
      if (item) item.value = s.count;
    });

    const avgRating = totalReviews > 0
      ? await Review.aggregate([
          { $match: { approved: true } },
          { $group: { _id: null, avg: { $avg: "$rating" } } },
        ]).then((r) => (r[0]?.avg || 0).toFixed(1))
      : "0.0";

    return {
      totalOrders,
      recentOrderCount,
      totalProducts,
      totalReviews,
      totalRevenue,
      avgOrderValue: avgOrderValue.toFixed(2),
      avgRating,
      salesTrend: last30Days,
      statusDistribution,
    };
  } catch (error) {
    console.error("Failed to get dashboard stats:", error);
    return null;
  }
}

export async function getRecentActivity() {
  try {
    await connectDB();
    const [recentOrders, recentReviews] = await Promise.all([
      Order.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .lean()
        .populate("productId", "name"),
      Review.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const activities = [];

    recentOrders.forEach((o) => {
      activities.push({
        type: "order",
        message: `New order from ${o.customerName} - ৳${o.totalPrice}`,
        status: o.status,
        time: o.createdAt,
        id: o._id.toString(),
      });
    });

    recentReviews.forEach((r) => {
      activities.push({
        type: "review",
        message: `${r.customerName} left a ${r.rating}★ review`,
        status: r.approved ? "approved" : "pending",
        time: r.createdAt,
        id: r._id.toString(),
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    return activities.slice(0, 15).map((a) => ({
      ...a,
      time: format(new Date(a.time), "MMM dd, h:mm a"),
    }));
  } catch (error) {
    console.error("Failed to get recent activity:", error);
    return [];
  }
}
