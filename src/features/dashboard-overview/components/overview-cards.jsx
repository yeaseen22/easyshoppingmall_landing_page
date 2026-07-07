import { Banknote, ShoppingBag, Star, TrendingUp, Users } from "lucide-react";
import StatCard from "./stat-card";

export default function OverviewCards({ stats = {} }) {
  if (!stats || Object.keys(stats).length === 0) return null;

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders ?? 0,
      icon: ShoppingBag,
      change: 0,
    },
    {
      title: "Revenue",
      value: stats.totalRevenue ?? 0,
      icon: Banknote,
      prefix: "৳",
      change: 0,
    },
    {
      title: "Total Products",
      value: stats.totalProducts ?? 0,
      icon: TrendingUp,
      change: 0,
    },
    {
      title: "Approved Reviews",
      value: stats.totalReviews ?? 0,
      icon: Star,
      change: 0,
    },
    {
      title: "Avg Order Value",
      value: Number(stats.avgOrderValue || 0),
      icon: Banknote,
      prefix: "৳",
      change: 0,
    },
    {
      title: "Avg Rating",
      value: Number(stats.avgRating || 0),
      icon: Users,
      suffix: " ★",
      change: 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
}
