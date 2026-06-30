import { getProducts } from "@/action/product";
import { ProductStoreProvider } from "@/store/productStoreProvider";
import DashboardShell from "./DashboardShell";

export default async function DashboardLayout({ children }) {
  const products = await getProducts();
  return (
    <ProductStoreProvider products={products}>
      <DashboardShell>{children}</DashboardShell>
    </ProductStoreProvider>
  );
}
