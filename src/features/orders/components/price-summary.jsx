import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const PriceRow = ({ label, value, highlight, isLoading }) => (
  <div className="flex justify-between text-muted-foreground">
    <span>{label}</span>
    {isLoading ? <Skeleton className="w-12 h-4" /> : <span className={highlight}>{value}</span>}
  </div>
);

const PriceSummary = ({ unitPrice, quantity, deliveryCharge, zilla, isLoading }) => {
  const subtotal = unitPrice * quantity;
  const total = subtotal + (zilla ? deliveryCharge : 0);

  return (
    <div className="space-y-4">
      <PriceRow label="Subtotal" value={`৳${subtotal}`} isLoading={isLoading} />
      <PriceRow
        label="Delivery Fee"
        value={zilla ? `৳${deliveryCharge}` : "—"}
        highlight={zilla ? "text-primary" : "text-muted-foreground"}
        isLoading={isLoading}
      />
      <Separator className="bg-border" />
      <div className="flex justify-between text-xl sm:text-2xl font-bold">
        <span className="text-foreground">Total</span>
        {isLoading ? <Skeleton className="w-16 h-6" /> : <span className="text-primary">৳{total}</span>}
      </div>
    </div>
  );
};

export default PriceSummary;
