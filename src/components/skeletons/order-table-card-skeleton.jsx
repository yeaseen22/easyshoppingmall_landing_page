export const OrderTableCardSkeleton = () => (
  <>
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex justify-between">
        <div className="h-3 w-20 bg-muted rounded"></div>
        <div className="h-5 w-16 bg-muted rounded-full"></div>
      </div>
      <div className="h-4 w-40 bg-muted rounded"></div>
      <div className="h-3 w-32 bg-muted rounded"></div>
      <div className="h-3 w-28 bg-muted rounded"></div>
      <div className="h-4 w-24 bg-muted rounded"></div>
      <div className="flex justify-end gap-2 pt-2">
        <div className="h-8 w-8 bg-muted rounded-lg"></div>
        <div className="h-8 w-8 bg-muted rounded-lg"></div>
      </div>
    </div>
  </>
);
