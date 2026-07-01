import DashboardShell from "./DashboardShell";
import { ProductStoreProvider } from "@/features/products/store/product-store-provider";
import { OrderStoreProvider } from "@/features/orders/store/order-store-provider";
import { getProducts } from "@/features/products/actions/product";
import { getOrders } from "@/features/orders/actions/order";

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
