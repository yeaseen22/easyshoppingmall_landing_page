import { Card } from "@/components/ui/card";
import { BarChartComponent } from "./bar-chart";
import { RevenueChart } from "./revenue-chart";

export default function ChartSection({ salesTrend }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
          Revenue Trend (30 days)
        </h3>
        <RevenueChart chartData={salesTrend || []} />
      </Card>
      <Card className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
          Orders Trend (30 days)
        </h3>
        <BarChartComponent chartData={salesTrend || []} />
      </Card>
    </div>
  );
}
