"use client";

import DataTable from "@/components/ui/data-table";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ChartSkeleton } from "@/components/ui/skeleton-loader";
import {
  getDashboardStats,
  getRecentActivity,
} from "@/features/dashboard/actions/dashboard";
import {
  deleteOrder,
  updateOrderStatus,
} from "@/features/orders/actions/order";
import {
  Activity,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Package,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Swal from "sweetalert2";
import { getStatusStyle } from "../utils/utils";

const COLORS = {
  primary: "#ffc900",
  secondary: "#f87171cc",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#a855f7",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1f2e] border border-accent-content/10 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}:{" "}
          {p.name === "Revenue" ? `৳${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, color, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-[#11151c] p-7 rounded-2xl border border-accent-content/5 animate-pulse">
        <div className="w-10 h-10 bg-gray-700/50 rounded-xl mb-5" />
        <div className="h-3 w-24 bg-gray-700/50 rounded mb-2" />
        <div className="h-8 w-20 bg-gray-700/50 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-[#11151c] p-7 rounded-2xl border border-accent-content/5 shadow-xl hover:border-[#d4af37]/30 transition-all group">
      <div
        className={`mb-5 p-3 bg-accent-content/5 w-fit rounded-xl group-hover:scale-110 transition-transform ${color}`}
      >
        {icon}
      </div>
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
        {label}
      </p>
      <h3 className="text-3xl font-bold mt-2 text-accent-content">{value}</h3>
    </div>
  );
}

export default function DashboardHome({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#11151c",
      color: "#fff",
    });

    if (confirm.isConfirmed) {
      const result = await deleteOrder(id);
      if (result.success) router.refresh();
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    setIsUpdating(true);
    const result = await updateOrderStatus(id, newStatus);
    if (result.success) {
      router.refresh();
      setSelectedOrder(null);
    }
    setIsUpdating(false);
  };

  const orderHeaders = [
    { label: "Order ID" },
    { label: "Customer" },
    { label: "Date" },
    { label: "Amount" },
    { label: "Phone" },
    { label: "Status" },
    { label: "Action", align: "right" },
  ];

  return (
    <div className="flex-1 w-full p-4 md:p-8 lg:p-10">
      <div className="mb-10">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
          Admin / Dashboard
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-accent-content font-serif">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ErrorBoundary>
          <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-accent-content mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary-color" size={20} />
              Sales Trend (30 days)
            </h3>
            {isLoading ? (
              <ChartSkeleton height="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={stats?.salesTrend || []}>
                  <defs>
                    <linearGradient
                      id="revenueGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={COLORS.primary}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS.primary}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS.primary}
                    fill="url(#revenueGrad)"
                    strokeWidth={2}
                    name="Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-accent-content mb-6 flex items-center gap-2">
              <ShoppingCart className="text-primary-color" size={20} />
              Daily Orders (30 days)
            </h3>
            {isLoading ? (
              <ChartSkeleton height="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stats?.salesTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="orders"
                    fill={COLORS.primary}
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ErrorBoundary>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <ErrorBoundary>
          <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6 lg:col-span-1">
            <h3 className="font-bold text-lg text-accent-content mb-6 flex items-center gap-2">
              <Activity className="text-primary-color" size={20} />
              Recent Activity
            </h3>
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-700/50 rounded-full shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 w-full bg-gray-700/50 rounded" />
                      <div className="h-2 w-20 bg-gray-700/50 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : activities.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No recent activity
              </p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin">
                {activities.map((a, i) => (
                  <div
                    key={`${a.type}-${a.id}-${i}`}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent-content/5 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        a.type === "order"
                          ? "bg-primary-color/10 text-primary-color"
                          : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {a.type === "order" ? "O" : "R"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300 truncate">
                        {a.message}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-0.5">
                        {a.time}
                      </p>
                    </div>
                    {a.status && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          a.status === "Delivered" || a.status === "approved"
                            ? "bg-green-500/10 text-green-500"
                            : a.status === "Pending" || a.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : a.status === "Cancelled"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {a.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ErrorBoundary>

        <ErrorBoundary>
          <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6 lg:col-span-2">
            <h3 className="font-bold text-lg text-accent-content mb-6 flex items-center gap-2">
              <DollarSign className="text-primary-color" size={20} />
              Revenue Overview (30 days)
            </h3>
            {isLoading ? (
              <ChartSkeleton height="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={stats?.salesTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 10 }}
                  />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, r: 3 }}
                    activeDot={{ r: 6 }}
                    name="Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </ErrorBoundary>
      </div>

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
          <DataTable
            headers={orderHeaders}
            data={orders?.slice(0, 10) || []}
            emptyMessage="No orders yet."
            renderRow={(order) => (
              <tr key={order._id} className="hover:bg-accent-content/5">
                <td className="px-6 py-4 text-xs text-primary-color font-mono">
                  {(order._id || "").slice(0, 8)}
                </td>
                <td className="px-6 py-4 text-sm text-accent-content">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-accent-content font-bold">
                  ৳{order.totalPrice}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {order.phone}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-[10px] rounded ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 bg-primary-color rounded-lg"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="p-2 bg-secondary rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
            renderMobileCard={(order) => (
              <div
                key={order._id}
                className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs text-[#d4af37] font-mono">
                    {(order._id || "").slice(0, 8)}
                  </p>
                  <span
                    className={`px-2 py-1 text-[10px] rounded ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-accent-content font-semibold text-sm">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-400">📞 {order.phone}</p>
                <p className="text-xs text-gray-400">
                  📅 {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-accent-content font-bold">
                  ৳{order.totalPrice}
                </p>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 bg-primary-color rounded-lg"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="p-2 bg-secondary rounded-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg sm:max-w-2xl bg-[#11151c] border border-accent-content/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-accent-content/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-accent-content">
                  Order Details
                </h3>
                <p className="text-[10px] sm:text-xs font-mono text-gray-400 mt-1 break-all">
                  ID: {selectedOrder._id}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-accent-content bg-accent-content/5 rounded-full"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#080808] p-4 rounded-xl border border-accent-content/5">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Customer
                  </p>
                  <p className="text-sm text-accent-content">
                    {selectedOrder.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Phone
                  </p>
                  <p className="text-sm text-accent-content">
                    {selectedOrder.phone}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-[10px] text-gray-500 uppercase mb-1">
                    Address
                  </p>
                  <p className="text-sm text-accent-content">
                    {selectedOrder.address}, {selectedOrder.city},{" "}
                    {selectedOrder.district}
                  </p>
                </div>
                {selectedOrder.transactionId && (
                  <div className="sm:col-span-2">
                    <p className="text-[10px] text-gray-500 uppercase mb-1">
                      Transaction ID
                    </p>
                    <p className="text-sm text-[#d4af37] font-mono break-all">
                      {selectedOrder.transactionId}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold text-accent-content mb-3 uppercase">
                  Ordered Item
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center bg-[#080808] p-4 rounded-xl border border-accent-content/5">
                  {selectedOrder.productId?.image && (
                    <img
                      src={selectedOrder.productId.image}
                      alt={selectedOrder.productId.name}
                      className="w-full sm:w-16 h-40 sm:h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-accent-content font-semibold text-sm">
                      {selectedOrder.productId?.name || "Unknown Product"}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                      <p>
                        Qty:{" "}
                        <span className="text-accent-content">
                          {selectedOrder.quantity}
                        </span>
                      </p>
                      <p>
                        Price:{" "}
                        <span className="text-[#d4af37]">
                          ৳{selectedOrder.totalPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-accent-content/10 pt-4">
                <h4 className="text-xs sm:text-sm font-bold text-accent-content mb-3 uppercase">
                  Update Status
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
                  <div className="flex-1 w-full">
                    <label className="text-xs text-gray-500 mb-1 block">
                      Status
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        setSelectedOrder({
                          ...selectedOrder,
                          status: e.target.value,
                        })
                      }
                      className="w-full bg-[#080808] border border-accent-content/10 rounded-lg px-3 py-2 text-sm text-accent-content outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <button
                    disabled={isUpdating}
                    onClick={() =>
                      handleStatusUpdate(
                        selectedOrder._id,
                        selectedOrder.status,
                      )
                    }
                    className={`w-full sm:w-auto px-5 py-2 bg-[#d4af37] text-black font-bold rounded-lg text-sm ${
                      isUpdating ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUpdating ? "Updating..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
