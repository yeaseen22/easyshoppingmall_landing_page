export const dynamic = "force-dynamic";
import { getOrders } from "@/features/orders/actions/order";
import OrdersComponent from "@/features/dashboard/components/orders-component";

const OrdersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const result = await getOrders(page, 10);

  if (!result?.data) {
    return <OrdersComponent orders={[]} currentPage={1} totalPages={1} total={0} />;
  }

  return (
    <OrdersComponent
      orders={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      total={result.total}
    />
  );
};

export default OrdersPage;
