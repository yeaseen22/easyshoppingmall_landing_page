import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-base ${star <= rating ? "text-primary" : "text-muted"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, colorClass }) {
  return (
    <div className="px-2">
      <Card
        className={`relative p-7 h-full border transition-all gap-0 [--card-spacing:--spacing(0)] ${
          review.featured
            ? "bg-linear-to-br from-primary/8 to-primary/3 border-primary/25"
            : "bg-card border-border hover:border-primary/25"
        }`}
      >
        <div className="text-4xl text-primary/30 font-serif leading-none mb-3">&ldquo;</div>
        <StarRating rating={review.rating || 5} />
        <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-1">{review.comment}</p>
        <Separator className="bg-border/50 mb-5" />
        <div className="flex items-center gap-3 mt-auto">
          <Avatar className={`size-11 ${colorClass}`}>
            <AvatarFallback className="text-sm font-bold bg-transparent">
              {review.customerName ? review.customerName.slice(0, 2).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-foreground text-sm font-bold">{review.customerName}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ReviewCard;
