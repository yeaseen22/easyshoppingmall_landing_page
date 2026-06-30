export const dynamic = 'force-dynamic';
import OrdersComponent from '@/components/Dashboard/OrdersComponent/OrdersComponent'
import { getOrders } from '@/action/order';

const OrdersPage = async () => {
  const data = await getOrders();
  const orders = data?.map((order) => ({
    ...order,
    _id: order._id.toString(),
  }));
  return <OrdersComponent orders={orders}/>
}

export default OrdersPage
