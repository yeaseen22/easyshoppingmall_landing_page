"use client";

import DataTable from "@/components/ui/data-table";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function CustomersComponent({ customers = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone || "").includes(searchTerm),
  );

  const headers = [
    { label: "Customer Info" },
    { label: "Contact" },
    { label: "Location" },
    { label: "Orders", align: "right" },
    { label: "Total Spent" },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-accent-content font-serif">
            Customer <span className="text-[#d4af37]">Directory</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            আপনার রেজিস্ট্রিকৃত কাস্টমারদের তালিকা এবং তাদের কেনাকাটার ইতিহাস।
          </p>
        </div>
      </div>

      <DataTable
        headers={headers}
        data={filteredCustomers}
        search={searchTerm}
        onSearch={setSearchTerm}
        searchPlaceholder="Search by name, email or phone..."
        emptyMessage="No customers found matching your search."
        renderRow={(customer) => (
          <tr
            key={customer._id}
            className="hover:bg-accent-content/2 transition-colors group"
          >
            <td className="px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#d4af37]/20 to-transparent flex items-center justify-center text-primary-color font-bold border border-[#d4af37]/20">
                  {customer.name ? customer.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <div className="text-sm font-bold text-accent-content">
                    {customer.name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    ID: {customer._id.slice(0, 8)}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-8 py-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail size={12} className="text-[#d4af37]" /> {customer.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Phone size={12} className="text-[#d4af37]" />{" "}
                  {customer.phone}
                </div>
              </div>
            </td>
            <td className="px-8 py-5">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={14} /> {customer.location}
              </div>
            </td>
            <td className="px-8 py-5 text-right">
              <span className="bg-accent-content/5 px-3 py-1 rounded-lg text-xs font-bold text-accent-content">
                {customer.totalOrders}
              </span>
            </td>
            <td className="px-8 py-5 text-sm font-bold text-primary-color">
              ৳{customer.spent}
            </td>
          </tr>
        )}
      />
    </div>
  );
}
