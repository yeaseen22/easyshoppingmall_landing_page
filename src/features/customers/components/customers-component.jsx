"use client";

import DataTable from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import SearchBar from "@/components/ui/search-bar";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTransition } from "react";

export default function CustomersComponent({
  customers = [],
  currentPage,
  totalPages,
}) {
  const [isLoading, startTransition] = useTransition();

  const customerColumns = [
    {
      header: "Customer Info",
      accessor: "name",
      cell: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-transparent flex items-center justify-center text-primary font-bold border border-primary/20">
            {val ? val.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <div className="text-sm font-bold text-foreground whitespace-nowrap">
              {val}
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              ID: {row._id.slice(0, 8)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: "email",
      cell: (val, row) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail size={12} className="text-primary" /> {val}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone size={12} className="text-primary" /> {row.phone}
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: "location",
      className: "text-sm text-muted-foreground whitespace-nowrap",
      cell: (val) => (
        <div className="flex items-center gap-2">
          <MapPin size={14} /> {val}
        </div>
      ),
    },
    {
      header: "Orders",
      accessor: "totalOrders",
      className: "text-right",
      cell: (val) => (
        <span className="bg-muted px-3 py-1 rounded-lg text-xs font-bold text-foreground">
          {val}
        </span>
      ),
    },
    {
      header: "Total Spent",
      accessor: "spent",
      className: "text-sm font-bold text-primary",
      cell: (val) => `৳${val}`,
    },
  ];

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Customer <span className="text-primary">Directory</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            আপনার রেজিস্ট্রিকৃত কাস্টমারদের তালিকা এবং তাদের কেনাকাটার ইতিহাস।
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <SearchBar placeholder="Search by name, email or phone..." />
      </div>

      <DataTable
        columns={customerColumns}
        data={customers}
        isLoading={isLoading}
        emptyMessage="No customers found matching your search."
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startTransition={startTransition}
        isLoading={isLoading}
      />
    </section>
  );
}
