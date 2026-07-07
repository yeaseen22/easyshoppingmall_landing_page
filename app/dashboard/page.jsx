export const dynamic = "force-dynamic";
import { getDashboardStats, getRecentActivity, getRecentOrders } from "@/features/dashboard-overview/actions/dashboard";
import DashboardOverview from "@/features/dashboard-overview/components/dashboard-overview";

const DashboardPage = async () => {
  const [stats, activities, recentOrders] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(),
    getRecentOrders(5),
  ]);

  return <DashboardOverview stats={stats} activities={activities} recentOrders={recentOrders} />;
};

export default DashboardPage;
