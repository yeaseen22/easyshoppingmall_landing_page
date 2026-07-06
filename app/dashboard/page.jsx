export const dynamic = "force-dynamic";
import DashboardOverview from "@/features/dashboard-overview/components/dashboard-overview";
import { getOrders } from "@/features/orders/actions/order";

const DashboardPage = async () => {
  const data = await getOrders({});
  const orders = data?.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));

  return <DashboardOverview orders={orders} />;
};

export default DashboardPage;
