import { Card } from "@/components/ui/card";

export default function StatusPieChart({ distribution = [] }) {
  if (!distribution || !distribution.length) return null;
  const total = distribution.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
        Order Status
      </h3>
      <div className="flex flex-wrap gap-3">
        {distribution.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 min-w-28 flex-1"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground truncate">{d.name}</p>
              <p className="text-sm font-bold text-foreground">
                {d.value}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  ({total ? Math.round((d.value / total) * 100) : 0}%)
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
