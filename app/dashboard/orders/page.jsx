export const dynamic = "force-dynamic";
import { getOrders } from "@/action/order";
import OrdersComponent from "@/components/Dashboard/OrdersComponent/OrdersComponent";

const OrdersPage = async () => {
  const orders = await getOrders();

  console.log(orders);

  return <OrdersComponent orders={orders} />;
};

export default OrdersPage;
