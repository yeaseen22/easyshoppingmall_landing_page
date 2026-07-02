import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getReviews } from "@/features/reviews/actions/review";
import { Star } from "lucide-react";
import ReviewForm from "./review-form";

const avatarColors = [
  "bg-pink-500/15 text-pink-400",
  "bg-primary-color/15 text-primary-color",
  "bg-blue-500/15 text-blue-400",
  "bg-purple-500/15 text-purple-400",
  "bg-teal-500/15 text-teal-400",
  "bg-orange-500/15 text-orange-400",
];

function StarRating({ rating, size = "base" }) {
  const sizeClass = size === "sm" ? "text-sm" : "text-base";

  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`${sizeClass} ${star <= rating ? "text-primary-color" : "text-gray-700"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const reviews = await getReviews(true);
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <Section className="bg-[#080808]">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color px-4 py-1.5 rounded-full uppercase mb-4 text-xs sm:text-sm">
            Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent-content mb-4">
            What Our <span className="text-primary-color">Customers</span> Say
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Trusted by
            {reviews.length > 0
              ? ` ${reviews.length.toLocaleString()}+`
              : " 0"}{" "}
            happy shoppers across Bangladesh
          </p>
        </div>

        <div className="flex justify-center gap-6 bg-accent-content/2 border border-accent-content/7 rounded-2xl px-6 py-4 max-w-xs mx-auto mb-12">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary-color">
              {avgRating}★
            </p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary-color">
              {reviews.length}+
            </p>
            <p className="text-sm text-gray-500 mt-1">Verified Reviews</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {reviews.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-[#11151c] rounded-2xl border border-accent-content/5">
                <Star className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p className="text-lg font-semibold mb-1">No reviews yet</p>
                <p className="text-sm">Be the first to leave a review!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviews.map((t, i) => {
                  const colorClass = avatarColors[i % avatarColors.length];
                  return (
                    <div
                      key={t._id}
                      className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${
                        t.featured
                          ? "bg-linear-to-br from-primary-color/8 to-primary-color/3 border-primary-color/25"
                          : "bg-accent-content/3 border-accent-content/8 hover:border-primary-color/25"
                      }`}
                    >
                      <div className="text-4xl text-primary-color/30 font-serif leading-none mb-3">
                        &ldquo;
                      </div>
                      <StarRating rating={t.rating || 5} />
                      <p className="text-gray-300 text-base leading-relaxed mb-6">
                        {t.comment}
                      </p>
                      <div className="h-px bg-accent-content/7 mb-5" />
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${colorClass}`}
                        >
                          {t.customerName
                            ? t.customerName.slice(0, 2).toUpperCase()
                            : "??"}
                        </div>
                        <div>
                          <p className="text-accent-content text-sm font-bold">
                            {t.customerName}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <ReviewForm />
        </div>
      </Container>
    </Section>
  );
}
