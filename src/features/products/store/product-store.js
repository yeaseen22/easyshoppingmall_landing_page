import { createStore } from "zustand";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/features/products/actions/product";

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
