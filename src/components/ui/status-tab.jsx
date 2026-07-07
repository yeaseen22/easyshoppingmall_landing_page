"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  if (!tabs.length) return null;

  return (
    <Tabs value={optimisticTab} onValueChange={handleTabChange}>
      <TabsList className="bg-card border border-border rounded-xl p-1.5 h-auto gap-1.5">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value || "all"}
            value={tab.value}
            disabled={isLoading}
            title={isLoading ? `Loading ${tab.label}...` : tab.label}
            className="px-4 py-2 text-xs font-bold rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default StatusTab;
