import { Card } from "@/components/ui/card";

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <Card className="bg-card border border-border p-3 shadow-lg">
      <p className="text-foreground font-bold text-sm mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-muted-foreground text-xs">
          {entry.name}:{" "}
          <span className="text-primary font-bold">
            ৳{Number(entry.value).toLocaleString()}
          </span>
        </p>
      ))}
    </Card>
  );
};
