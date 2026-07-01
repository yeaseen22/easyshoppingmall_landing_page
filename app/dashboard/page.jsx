export const dynamic = "force-dynamic";
import DashboardHome from "@/features/dashboard/components/dashboard-home";
import { getOrders } from "@/features/orders/actions/order";

const DashboardPage = async () => {
  const data = await getOrders();
  const orders = data?.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));

  return <DashboardHome orders={orders} />;
};

export default DashboardPage;
