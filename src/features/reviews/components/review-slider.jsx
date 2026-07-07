"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ReviewCard from "./review-card";

const avatarColors = [
  "bg-pink-500/15 text-pink-400",
  "bg-primary/15 text-primary",
  "bg-blue-500/15 text-blue-400",
  "bg-purple-500/15 text-purple-400",
  "bg-teal-500/15 text-teal-400",
  "bg-orange-500/15 text-orange-400",
];

export default function ReviewSlider({ reviews = [] }) {
  return (
    <Carousel
      opts={{ loop: reviews.length > 1, align: "start" }}
      plugins={[Autoplay({ delay: 1500, stopOnInteraction: true, stopOnMouseEnter: true })]}
      className="relative xl:col-span-2"
    >
      <CarouselContent className="items-stretch">
        {reviews.map((review, i) => (
          <CarouselItem key={review._id} className="basis-full sm:basis-1/2 md:basis-full xl:basis-1/2 h-full">
            <ReviewCard review={review} colorClass={avatarColors[i % avatarColors.length]} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-3 size-8" />
      <CarouselNext className="hidden md:flex -right-3 size-8" />
    </Carousel>
  );
}
