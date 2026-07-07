import ActivityFeed from "./activity-feed";
import ChartSection from "./chart-section";
import OverviewCards from "./overview-cards";
import RecentOrdersSection from "./recent-orders-section";
import StatusPieChart from "./status-pie-chart";

export default function DashboardOverview({
  stats = {},
  activities = [],
  recentOrders = [],
}) {
  return (
    <section className="space-y-4 md:space-y-5 px-3 sm:px-0">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          Dashboard <span className="text-primary">Overview</span>
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Welcome back! Here&apos;s the latest update.
        </p>
      </div>

      <OverviewCards stats={stats} />
      <ChartSection salesTrend={stats?.salesTrend} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-5">
        <div className="xl:col-span-1">
          <StatusPieChart distribution={stats?.statusDistribution} />
        </div>
        <div className="xl:col-span-2">
          <ActivityFeed activities={activities} />
        </div>
      </div>

      <RecentOrdersSection orders={recentOrders} />
    </section>
  );
}
