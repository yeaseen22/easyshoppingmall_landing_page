import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/features/products/actions/product";
import { createStore } from "zustand";

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
    currentPage: 1,
    totalPages: 1,
    total: 0,

    setEditingProduct: (product) => set({ editingProduct: product }),
    clearEditing: () => set({ editingProduct: null }),

    setPage: (page) => set({ currentPage: page }),

    refetch: async () => {
      set({ isLoading: true });
      const products = await fetchProducts();
      set({ products, isLoading: false });
    },

    fetchPage: async (page = 1) => {
      set({ isLoading: true });
      const result = await getProducts(page);
      if (result?.data) {
        set({
          products: result.data,
          totalPages: result.totalPages,
          total: result.total,
          currentPage: result.currentPage,
          isLoading: false,
        });
      } else {
        set({
          products: [],
          totalPages: 0,
          total: 0,
          currentPage: 1,
          isLoading: false,
        });
      }
    },
  }));
};
