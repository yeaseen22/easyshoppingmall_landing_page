"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useOptimistic } from "react";

const StatusTab = ({ tabs, activeStatus, startTransition, isLoading }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [optimisticTab, setOptimisticTab] = useOptimistic(activeStatus);

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    params.delete("page");

    startTransition(() => {
      setOptimisticTab(value);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <>
      {tabs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 bg-[#11151c] border border-accent-content/5 rounded-xl p-1.5 w-fit">
          {tabs.map((tab) => {
            const isActive = tab.value === optimisticTab;

            return (
              <button
                key={tab.value || "all"}
                onClick={() => handleTabChange(tab.value)}
                disabled={isLoading}
                title={isLoading ? `Loading ${tab.label}...` : tab.label}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary-color text-black shadow-sm"
                    : "text-gray-500 hover:text-accent-content hover:bg-accent-content/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default StatusTab;
