"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabButton = ({ tabs, activeTab, onTabChange }) => (
  <>
    <div className="md:hidden">
      <Select value={activeTab} onValueChange={onTabChange}>
        <SelectTrigger className="w-full bg-card border border-border px-4 py-2.5 h-auto text-sm font-bold text-foreground">
          <SelectValue placeholder="Select section" />
        </SelectTrigger>
        <SelectContent className="bg-card border border-border">
          {tabs.map((tab) => (
            <SelectItem
              key={tab.value}
              value={tab.value}
              className="text-sm font-bold text-foreground data-[state=checked]:text-primary"
            >
              {tab.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="hidden md:block">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="bg-card border border-border p-1.5 h-auto gap-1.5">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-2.5 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  </>
);
