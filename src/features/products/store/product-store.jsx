"use client";

import { create } from "zustand";
import { createStore } from "zustand/vanilla";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/features/products/actions/product";

export const useProductStore = create((set) => ({
  products: [],
  isLoaded: false,
  isLoading: false,
  error: null,
  setProducts: (products) => set({ products, isLoaded: true, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoaded: true, isLoading: false }),
  addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? { ...p, ...data } : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    })),
}));

export const fetchProducts = async () => {
  const data = await getProducts();
  return data || [];
};

export const createProduct = async (productData) => {
  return await addProduct(productData);
};

export const editProduct = async (id, productData) => {
  return await updateProduct(id, productData);
};

export const removeProduct = async (id) => {
  return await deleteProduct(id);
};

export const createProductStore = (initialProducts = []) => {
  return createStore((set) => ({
    products: initialProducts,
    isLoading: false,
    editingProduct: null,
    error: null,
    setEditingProduct: (product) => set({ editingProduct: product }),
    clearEditing: () => set({ editingProduct: null }),
    refetch: async () => {
      set({ isLoading: true });
      const products = await fetchProducts();
      set({ products, isLoading: false });
    },
  }));
};
