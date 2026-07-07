"use client";

import Pagination from "@/components/ui/pagination";
import SearchBar from "@/components/ui/search-bar";
import { useTransition } from "react";
import OrderTable from "./order-table";
import StatusTab from "./status-tab";

export default function OrdersComponent({
  orders = [],
  currentPage,
  totalPages,
  activeStatus = "",
  tabs = [],
}) {
  const [isLoading, startTransition] = useTransition();

  return (
    <section className="w-full flex-1 min-w-0 overflow-hidden space-y-5 px-3 sm:px-4 md:px-6">
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
          Order <span className="text-primary">Management</span>
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          সব অর্ডার এখান থেকে ম্যানেজ করুন
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchBar placeholder="Search orders by ID, name, phone or status..." />
      </div>

      <StatusTab
        tabs={tabs}
        activeStatus={activeStatus}
        startTransition={startTransition}
        isLoading={isLoading}
      />
      <OrderTable orders={orders} isLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startTransition={startTransition}
        isLoading={isLoading}
      />
    </section>
  );
}
