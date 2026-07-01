export const dynamic = "force-dynamic";
import { getOrders } from "@/features/orders/actions/order";
import OrdersComponent from "@/features/dashboard/components/orders-component";

const OrdersPage = async () => {
  const orders = await getOrders();

  return <OrdersComponent orders={orders} />;
};

export default OrdersPage;
