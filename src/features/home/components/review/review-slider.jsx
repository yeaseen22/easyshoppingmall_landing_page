"use client";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useRef } from "react";
import Slider from "react-slick";
import ReviewCard from "./review-card";

const avatarColors = [
  "bg-pink-500/15 text-pink-400",
  "bg-primary-color/15 text-primary-color",
  "bg-blue-500/15 text-blue-400",
  "bg-purple-500/15 text-purple-400",
  "bg-teal-500/15 text-teal-400",
  "bg-orange-500/15 text-orange-400",
];

export default function ReviewSlider({ reviews }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: reviews.length > 1,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {reviews.map((review, i) => (
          <ReviewCard
            key={review._id}
            review={review}
            colorClass={avatarColors[i % avatarColors.length]}
          />
        ))}
      </Slider>
    </div>
  );
}
