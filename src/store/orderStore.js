import { createStore } from "zustand";
import { getOrders, placeOrder, updateOrderStatus, deleteOrder } from "@/action/order";

export const fetchOrders = async () => {
  const data = await getOrders();
  return data || [];
};

export const placeNewOrder = async (orderData) => {
  return await placeOrder(orderData);
};

export const changeOrderStatus = async (id, status) => {
  return await updateOrderStatus(id, status);
};

export const removeOrder = async (id) => {
  return await deleteOrder(id);
};

export const createOrderStore = (initialOrders = []) => {
  return createStore((set) => ({
    orders: initialOrders,
    isLoading: false,
    selectedOrder: null,

    setSelectedOrder: (order) => set({ selectedOrder: order }),
    clearSelectedOrder: () => set({ selectedOrder: null }),

    refetch: async () => {
      set({ isLoading: true });
      const orders = await fetchOrders();
      set({ orders, isLoading: false });
    },
  }));
};
