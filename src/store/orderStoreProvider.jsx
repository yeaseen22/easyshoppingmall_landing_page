"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createOrderStore } from "./orderStore";

const OrderStoreContext = createContext(null);

export function OrderStoreProvider({ children, orders = [] }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createOrderStore(orders);
  }
  return (
    <OrderStoreContext.Provider value={storeRef.current}>
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
