import { Card } from "@/components/ui/card";

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  prefix = "",
  suffix = "",
}) => {
  const isPositive = change >= 0;

  return (
    <Card className="bg-card border border-border p-3 sm:p-5 transition-all duration-300 hover:border-primary/30">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-muted-foreground text-[10px] sm:text-xs font-bold tracking-tight truncate">
          {title}
        </span>
        <div className="bg-primary/10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl shrink-0">
          <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-1">
        <p className="text-lg sm:text-2xl xl:text-3xl font-black text-foreground tracking-tight truncate">
          {prefix}
          {typeof value === "number" ? value.toLocaleString() : value}
          {suffix}
        </p>
        {change !== 0 && (
          <span
            className={`text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg shrink-0 ${
              isPositive
                ? "bg-green-500/15 text-green-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
