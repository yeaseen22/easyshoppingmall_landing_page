import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ChartSkeleton } from "@/components/ui/skeleton-loader";
import {
  ActivityIcon,
  DollarSignIcon,
  ShoppingCart,
  TrendingUpIcon,
} from "lucide-react";
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
import CustomTooltip from "./custom-tooltip";

export const COLORS = {
  primary: "#ffc900",
  secondary: "#f87171cc",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#a855f7",
};

const Charts = ({ activities = [], stats = {}, isLoading }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <ErrorBoundary>
          <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-accent-content mb-6 flex items-center gap-2">
              <TrendingUpIcon className="text-primary-color" size={20} />
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
              <ActivityIcon className="text-primary-color" size={20} />
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
              <div className="space-y-3 max-h-100 overflow-y-auto scrollbar-thin">
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
              <DollarSignIcon className="text-primary-color" size={20} />
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
    </>
  );
};

export default Charts;
