"use client";

import {
  getDashboardStats,
  getRecentActivity,
} from "@/features/dashboard/actions/dashboard";
import OrderTable from "@/features/dashboard/components/shared/order-table";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Charts from "./charts";
import StatCard from "./stat-card";

export default function DashboardOverview({ orders }) {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const [dashboardStats, recentActivities] = await Promise.all([
        getDashboardStats(),
        getRecentActivity(),
      ]);
      setStats(dashboardStats);
      setActivities(recentActivities);
      setIsLoading(false);
    }

    loadDashboard();
  }, []);

  const totalRevenue = useMemo(() => {
    return orders?.reduce((total, order) => total + order.totalPrice, 0);
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders?.filter((order) => order.status === "Pending").length;
  }, [orders]);

  const completedOrders = useMemo(() => {
    return orders?.filter((order) => order.status === "Delivered").length;
  }, [orders]);

  const totalOrders = useMemo(() => {
    return orders?.length;
  }, [orders]);

  const quickStats = [
    {
      id: 1,
      name: "Total Revenue",
      value: stats
        ? `৳${(stats.totalRevenue || 0).toLocaleString()}`
        : `৳${totalRevenue}`,
      icon: <DollarSign size={24} />,
      color: "text-green-500",
    },
    {
      id: 2,
      name: "Total Orders",
      value: stats?.totalOrders ?? totalOrders,
      icon: <ShoppingCart size={24} />,
      color: "text-primary-color",
    },
    {
      id: 3,
      name: "Products",
      value: stats?.totalProducts ?? 0,
      icon: <Package size={24} />,
      color: "text-blue-500",
    },
    {
      id: 4,
      name: "Avg. Rating",
      value: stats ? `${stats.avgRating}★` : "—",
      icon: <Star size={24} />,
      color: "text-yellow-500",
    },
    {
      id: 5,
      name: "Pending Orders",
      value: pendingOrders,
      icon: <Clock size={24} />,
      color: "text-yellow-500",
    },
    {
      id: 6,
      name: "Delivered Orders",
      value: completedOrders,
      icon: <CheckCircle2 size={24} />,
      color: "text-btn-color",
    },
  ];

  return (
    <section className="flex-1 w-full p-4 md:p-8 lg:p-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent-content">
          Welcome to your <span className="text-[#d4af37]">Dashboard</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          আপনার সব অর্ডার এবং দোকানের আপডেট এখানে দেখতে পারবেন।
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 mb-12">
        {quickStats.map((item) => (
          <StatCard
            key={item.id}
            icon={item.icon}
            label={item.name}
            value={item.value}
            color={item.color}
            isLoading={isLoading}
          />
        ))}
      </div>

      <Charts stats={stats} isLoading={isLoading} activities={activities} />

      <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-accent-content/5 flex justify-between items-center bg-[#0d1016]">
          <h3 className="font-bold text-xl text-accent-content">
            Recent Orders
          </h3>
          <Link
            href="/dashboard/orders"
            className="text-[#d4af37] text-xs font-bold hover:underline tracking-widest uppercase"
          >
            View All
          </Link>
        </div>

        <div className="p-6">
          <OrderTable orders={orders} />
        </div>
      </div>
    </section>
  );
}
