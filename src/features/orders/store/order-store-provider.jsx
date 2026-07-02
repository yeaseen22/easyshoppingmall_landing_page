"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createOrderStore } from "./order-store";

const OrderStoreContext = createContext(null);

export function OrderStoreProvider({ children, orders = [] }) {
  const [store] = useState(() => createOrderStore(orders));

  return (
    <OrderStoreContext.Provider value={store}>
      {children}
    </OrderStoreContext.Provider>
  );
}

export function useOrderStore(selector) {
  const store = useContext(OrderStoreContext);

  if (!store) {
    throw new Error("useOrderStore must be used within an OrderStoreProvider");
  }

  return useStore(store, selector);
}
