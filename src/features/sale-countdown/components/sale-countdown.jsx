"use client";

import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getSaleCountDown } from "@/features/sale-countdown/actions/sale-countdown";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SaleCountDown = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      const data = await getSaleCountDown();
      if (data) {
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
        if (data.targetDate) setTargetDate(data.targetDate);
      }
    }

    fetchConfig();
  }, []);

  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) return null;
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDate) return;
    const update = () => setTimeLeft(calculateTimeLeft());
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  const timeBlock = (value, label) => (
    <div className="bg-[#2C2B30] size-12.5 sm:size-18 p-1.5 rounded-lg shadow-md flex justify-center flex-col items-center">
      <span className="text-primary-color text-base sm:text-xl">
        {(value ?? 0).toString().padStart(2, "0")}
      </span>
      <span className="text-[8px] sm:text-xs text-[#AAAAAA] mt-1">{label}</span>
    </div>
  );

  return (
    <Section className="text-center min-h-auto py-10 md:py-16 relative">
      {/* Background stars */}
      <div className="absolute w-full h-full top-0 left-0">
        <Image
          src={"/glowing_stars.svg"}
          alt="Glowing Stars"
          width={1200}
          height={600}
          sizes="100vw"
          loading="eager"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <Container className="max-w-2xl z-1">
        <div className=" rounded-xl bg-white/7 backdrop-blur-md shadow-3xl shadow-primary-color/40 p-5">
          <p className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm mb-3 bg-[#622c1c] text-primary-color">
            {timeLeft?.expired ? "🎉 Sale Ended" : "🔥 Limited Time Only"}
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-accent-content">
            {title}
          </h1>
          <p className="mb-8 text-[#B0B0B0] text-sm sm:text-base md:text-lg">
            {description}
          </p>

          {timeLeft && !timeLeft.expired && (
            <div className="grid grid-cols-7 place-items-center gap-1 mb-8 max-w-xs mx-auto">
              {timeBlock(timeLeft.days, "DAYS")}
              <span className="text-xl font-bold text-[#AAAAAA] flex items-center">
                :
              </span>
              {timeBlock(timeLeft.hours, "HOURS")}
              <span className="text-xl font-bold text-[#AAAAAA] flex items-center">
                :
              </span>
              {timeBlock(timeLeft.minutes, "MINUTES")}
              <span className="text-xl font-bold text-[#AAAAAA] flex items-center">
                :
              </span>
              {timeBlock(timeLeft.seconds, "SECONDS")}
            </div>
          )}

          {timeLeft?.expired && (
            <div className="text-xl text-gray-500 font-bold py-6">
              This sale has ended. Stay tuned for new offers!
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default SaleCountDown;
