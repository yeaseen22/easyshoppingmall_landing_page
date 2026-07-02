"use client";

import Sidebar from "@/features/dashboard/components/sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#080808]">
      <div className="md:hidden fixed top-0 w-full h-16 bg-[#11151c] border-b border-accent-content/5 flex items-center px-4 z-40">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-400 hover:text-accent-content"
        >
          <Menu size={24} />
        </button>
        <span className="ml-4 text-gray-400 font-bold">Admin / Dashboard</span>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 w-full md:w-64 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      <div className="flex-1 md:pl-64 pt-16 md:pt-0 w-full">
        <main className="p-4 md:p-6 w-full max-w-full overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
