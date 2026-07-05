"use client";

import DataTable from "@/components/ui/data-table";
import Pagination from "@/components/ui/pagination";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, useTransition } from "react";

export default function CustomersComponent({
  customers = [],
  currentPage,
  totalPages,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, startTransition] = useTransition();

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone || "").includes(searchTerm),
  );

  const customerColumns = [
    {
      header: "Customer Info",
      accessor: "name",
      cell: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#d4af37]/20 to-transparent flex items-center justify-center text-primary-color font-bold border border-[#d4af37]/20">
            {val ? val.charAt(0).toUpperCase() : "?"}
          </div>
          <div>
            <div className="text-sm font-bold text-accent-content whitespace-nowrap">
              {val}
            </div>
            <div className="text-[10px] text-gray-500 font-mono">
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
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Mail size={12} className="text-[#d4af37]" /> {val}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Phone size={12} className="text-[#d4af37]" /> {row.phone}
          </div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: "location",
      className: "text-sm text-gray-400 whitespace-nowrap",
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
        <span className="bg-accent-content/5 px-3 py-1 rounded-lg text-xs font-bold text-accent-content">
          {val}
        </span>
      ),
    },
    {
      header: "Total Spent",
      accessor: "spent",
      className: "text-sm font-bold text-primary-color",
      cell: (val) => `৳${val}`,
    },
  ];

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-accent-content">
            Customer <span className="text-[#d4af37]">Directory</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            আপনার রেজিস্ট্রিকৃত কাস্টমারদের তালিকা এবং তাদের কেনাকাটার ইতিহাস।
          </p>
        </div>
      </div>

      <DataTable
        columns={customerColumns}
        data={filteredCustomers}
        search={searchTerm}
        onSearch={setSearchTerm}
        isLoading={isLoading}
        searchPlaceholder="Search by name, email or phone..."
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
