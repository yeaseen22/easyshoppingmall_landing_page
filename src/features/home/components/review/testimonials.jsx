import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getReviews } from "@/features/reviews/actions/review";
import { Star } from "lucide-react";
import ReviewForm from "./review-form";
import ReviewSlider from "./review-slider";

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
              <ReviewSlider reviews={reviews} />
            )}
          </div>

          <ReviewForm />
        </div>
      </Container>
    </Section>
  );
}
