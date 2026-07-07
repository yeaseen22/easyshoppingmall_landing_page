import { Card } from "@/components/ui/card";

const activityColors = {
  order: "bg-primary/10 text-primary",
  review: "bg-blue-500/10 text-blue-500",
};

export default function ActivityFeed({ activities = [] }) {
  if (!activities || !activities.length) return null;

  return (
    <Card className="p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((a, i) => (
          <div
            key={`${a.id}-${i}`}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-accent/5 transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${activityColors[a.type] || "bg-muted text-muted-foreground"}`}
            >
              {a.type === "order" ? "O" : "R"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-foreground truncate">
                {a.message}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {a.time}
              </p>
            </div>
            {a.status && (
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 bg-muted text-muted-foreground">
                {a.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
