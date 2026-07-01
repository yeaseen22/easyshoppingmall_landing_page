"use client";

import {
  deleteOrder,
  getOrders,
  placeOrder,
  updateOrderStatus,
} from "@/features/orders/actions/order";
import { create } from "zustand";
import { createStore } from "zustand/vanilla";

export const useOrderStore = create((set) => ({
  orders: [],
  isLoaded: false,
  isLoading: false,
  error: null,
  setOrders: (orders) =>
    set({ orders, isLoaded: true, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoaded: true, isLoading: false }),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o._id === id ? { ...o, status } : o)),
    })),
}));

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
