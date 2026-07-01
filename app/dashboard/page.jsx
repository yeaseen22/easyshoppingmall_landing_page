export const dynamic = 'force-dynamic';
import { getOrders } from "@/action/order";
import { getProducts } from "@/action/product";
import DashboardHome from "@/components/Dashboard/DashboardHome/DashboardHome";

const DashboardPage = async () => {
  const [data, products] = await Promise.all([getOrders(), getProducts()]);
  const orders = data?.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));

  return <DashboardHome orders={orders} products={products} />;
};

export default DashboardPage;
