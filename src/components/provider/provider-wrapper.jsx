"use client";

import { OrderStoreProvider } from "@/features/orders/store/order-store-provider";
import { ProductStoreProvider } from "@/features/products/store/product-store-provider";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";

const ProviderWrapper = ({ children, products, orders }) => {
  return (
    <>
      <AuthProvider>
        <ProductStoreProvider products={products}>
          <OrderStoreProvider orders={orders}>{children}</OrderStoreProvider>
        </ProductStoreProvider>
      </AuthProvider>
      <Toaster richColors closeButton position="top-right" theme="dark" />
    </>
  );
};

export default ProviderWrapper;
