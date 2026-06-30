"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createProductStore } from "./productStore";

const ProductStoreContext = createContext(null);

export function ProductStoreProvider({ children, products = [] }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    storeRef.current = createProductStore(products);
  }
  return (
    <ProductStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductStoreContext.Provider>
  );
}

export function useProductStore(selector) {
  const store = useContext(ProductStoreContext);
  if (!store) {
    throw new Error("useProductStore must be used within a ProductStoreProvider");
  }
  return useStore(store, selector);
}
