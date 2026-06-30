import DashboardShell from "./DashboardShell";
import { ProductStoreProvider } from "@/store/productStoreProvider";
import { OrderStoreProvider } from "@/store/orderStoreProvider";
import { getProducts } from "@/action/product";
import { getOrders } from "@/action/order";

export default async function DashboardLayout({ children }) {
  const [products, orders] = await Promise.all([getProducts(), getOrders()]);

  return (
    <ProductStoreProvider products={products}>
      <OrderStoreProvider orders={orders}>
        <DashboardShell>{children}</DashboardShell>
      </OrderStoreProvider>
    </ProductStoreProvider>
  );
}
