export const dynamic = 'force-dynamic';
import { getOrders } from "@/features/orders/actions/order";
import DashboardHome from "@/features/dashboard/components/dashboard-home";

const DashboardPage = async () => {
  const data = await getOrders();
  const orders = data?.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));

  return <DashboardHome orders={orders} />;
};

export default DashboardPage;
