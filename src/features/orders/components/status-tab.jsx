"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    if (value) params.set("status", value);
    else params.delete("status");
    params.delete("page");

    startTransition(() => {
      setOptimisticTab(value);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  if (!tabs.length) return null;

  return (
    <>
      <div className="sm:hidden">
        <Select
          value={optimisticTab}
          onValueChange={handleTabChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full max-w-62.5 bg-card border border-border px-4 py-2 h-auto text-sm font-bold text-foreground">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-card border border-border">
            {tabs.map((tab) => (
              <SelectItem
                key={tab.value || "all"}
                value={tab.value}
                className="text-sm font-bold text-foreground data-[state=checked]:text-primary"
              >
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:block">
        <Tabs value={optimisticTab} onValueChange={handleTabChange}>
          <TabsList className="bg-card border border-border p-1.5 h-auto gap-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value || "all"}
                value={tab.value}
                disabled={isLoading}
                title={isLoading ? "Loading orders..." : tab.label}
                className="px-4 py-2 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default StatusTab;
