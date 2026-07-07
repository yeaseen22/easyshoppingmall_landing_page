"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addReview } from "@/features/reviews/actions/review";
import { publicReviewSchema } from "@/features/reviews/validations/review-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Send, Star } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const ReviewForm = () => {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Leave a Review</CardTitle>
        <CardDescription className="text-muted-foreground">
          Share your experience with our products
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitState === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-green-500 font-bold text-lg">Thank you!</p>
            <p className="text-muted-foreground text-sm">
              Your review has been submitted and will appear after moderation.
            </p>
          </div>
        ) : submitState === "error" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mb-3" />
            <p className="text-destructive font-bold text-lg">
              Something went wrong
            </p>
            <p className="text-muted-foreground text-sm">
              Please try again later.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">Your Rating</p>
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setValue("rating", star, { shouldValidate: true })
                    }
                    className={`p-1 transition-all hover:scale-110 ${star <= currentRating ? "text-primary" : "text-muted"}`}
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
                <p className="text-destructive text-xs">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register("customerName")}
                  placeholder="Your Name *"
                  className="bg-muted border-border px-2"
                  aria-invalid={!!errors.customerName}
                />
                {errors.customerName && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.customerName.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("customerEmail")}
                  type="email"
                  placeholder="Your Email *"
                  className="bg-muted border-border px-2"
                  aria-invalid={!!errors.customerEmail}
                />
                {errors.customerEmail && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.customerEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Textarea
                {...register("comment")}
                rows={4}
                placeholder="Write your review here... *"
                className="bg-muted border-border resize-none px-2"
                aria-invalid={!!errors.comment}
              />
              {errors.comment && (
                <p className="text-destructive text-xs mt-1">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-base md:text-lg"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send size={16} /> Submit Review
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
