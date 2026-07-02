"use client";

import Pagination from "@/components/ui/pagination";
import { useState } from "react";
import OrderTable from "./shared/order-table";

export default function OrdersComponent({ orders, currentPage, totalPages, total }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      (o._id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.phone || "").includes(searchTerm) ||
      (o.status || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-content">
          Order <span className="text-primary-color">Management</span>
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mt-1">
          সব অর্ডার এখান থেকে ম্যানেজ করুন
        </p>
      </div>

      <OrderTable
        orders={filteredOrders}
        search={searchTerm}
        onSearch={setSearchTerm}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
      />
    </section>
  );
}
