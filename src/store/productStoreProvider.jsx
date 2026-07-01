"use client";

import { createContext, useContext, useState } from "react";
import { useStore } from "zustand";
import { createProductStore } from "./productStore";

const ProductStoreContext = createContext(null);

export function ProductStoreProvider({ children, products = [] }) {
  const [store] = useState(() => createProductStore(products));
  return (
    <ProductStoreContext.Provider value={store}>
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
