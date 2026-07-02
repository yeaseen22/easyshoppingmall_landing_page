"use client";

import { addReview } from "@/features/reviews/actions/review";
import { publicReviewSchema } from "@/features/reviews/validations/review-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Send, Star } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const inputClass =
  "w-full bg-[#1c2128] border border-gray-700 rounded-xl px-4 py-3.5 text-accent-content placeholder-gray-500 focus:outline-none focus:border-primary-color transition-colors text-sm";

export default function ReviewForm() {
  const [submitState, setSubmitState] = useState("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(publicReviewSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      rating: 0,
      comment: "",
    },
  });

  const currentRating = useWatch({ name: "rating", control });

  const onSubmit = async (data) => {
    setSubmitState("submitting");
    const result = await addReview({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      rating: data.rating,
      comment: data.comment,
    });

    if (result.success) {
      setSubmitState("success");
      reset();
      setTimeout(() => setSubmitState("idle"), 5000);
    } else {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  };

  return (
    <div className="bg-[#11151c] border border-accent-content/5 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-accent-content mb-2">
        Leave a Review
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Share your experience with our products
      </p>

      {submitState === "success" ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
          <p className="text-green-500 font-bold text-lg">Thank you!</p>
          <p className="text-gray-400 text-sm">
            Your review has been submitted and will appear after moderation.
          </p>
        </div>
      ) : submitState === "error" ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
          <p className="text-red-500 font-bold text-lg">Something went wrong</p>
          <p className="text-gray-400 text-sm">Please try again later.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm text-gray-400">Your Rating</label>
            <div className="flex gap-1" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue("rating", star, { shouldValidate: true })
                  }
                  className={`p-1 transition-all hover:scale-110 ${star <= currentRating ? "text-primary-color" : "text-gray-700"}`}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    size={28}
                    fill={star <= currentRating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-400 text-xs">{errors.rating.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                {...register("customerName")}
                placeholder="Your Name *"
                className={inputClass}
                aria-invalid={!!errors.customerName}
              />
              {errors.customerName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.customerName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("customerEmail")}
                type="email"
                placeholder="Your Email *"
                className={inputClass}
                aria-invalid={!!errors.customerEmail}
              />
              {errors.customerEmail && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.customerEmail.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <textarea
              {...register("comment")}
              rows={4}
              placeholder="Write your review here... *"
              className={`${inputClass} resize-none`}
              aria-invalid={!!errors.comment}
            />
            {errors.comment && (
              <p className="text-red-400 text-xs mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary-color hover:bg-primary-color/90 text-black font-semibold text-base md:text-lg py-2 px-4 rounded-xl transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send size={16} /> Submit Review
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
