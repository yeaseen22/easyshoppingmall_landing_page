function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-base ${star <= rating ? "text-primary-color" : "text-gray-700"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review, colorClass }) {
  return (
    <div className="px-2">
      <div
        className={`relative rounded-2xl p-7 border transition-all ${
          review.featured
            ? "bg-linear-to-br from-primary-color/8 to-primary-color/3 border-primary-color/25"
            : "bg-accent-content/3 border-accent-content/8 hover:border-primary-color/25"
        }`}
      >
        <div className="text-4xl text-primary-color/30 font-serif leading-none mb-3">
          &ldquo;
        </div>
        <StarRating rating={review.rating || 5} />
        <p className="text-gray-300 text-base leading-relaxed mb-6">
          {review.comment}
        </p>
        <div className="h-px bg-accent-content/7 mb-5" />
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${colorClass}`}
          >
            {review.customerName
              ? review.customerName.slice(0, 2).toUpperCase()
              : "??"}
          </div>
          <div>
            <p className="text-accent-content text-sm font-bold">
              {review.customerName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
