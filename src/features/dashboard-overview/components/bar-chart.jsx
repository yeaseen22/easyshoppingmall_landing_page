"use client";

import { CustomTooltip } from "@/features/dashboard-overview/components/custom-tooltip";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function BarChartComponent({ chartData = [] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="date" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
        <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="orders" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Orders" />
      </BarChart>
    </ResponsiveContainer>
  );
}
