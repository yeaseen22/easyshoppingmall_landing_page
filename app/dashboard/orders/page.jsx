export const dynamic = "force-dynamic";
import { getOrders } from "@/features/orders/actions/order";
import OrdersComponent from "@/features/orders/components/orders-component";
import { OrderStatus } from "@/features/orders/validations/order-schema";

const orderTabs = [
  { label: "All", value: "" },
  ...Object.values(OrderStatus).map((s) => ({ label: s, value: s })),
];

const OrdersPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const status = params?.status || "";
  const result = await getOrders(page, 10, status || undefined);

  if (!result?.data) {
    return (
      <OrdersComponent
        orders={[]}
        currentPage={1}
        totalPages={1}
        activeStatus={status}
        tabs={orderTabs}
      />
    );
  }

  return (
    <OrdersComponent
      orders={result.data}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      activeStatus={status}
      tabs={orderTabs}
    />
  );
};

export default OrdersPage;
