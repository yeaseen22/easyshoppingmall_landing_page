"use client";
import { getSaleCountDown } from "@/features/home/actions/sale-countdown";
import { useCallback, useEffect, useState } from "react";

const SaleCountDown = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [title, setTitle] = useState("Limited Time Offer - Up to 40% Off!");
  const [description, setDescription] = useState(
    "Don't miss out on this exclusive offer. Hurry, the clock is ticking!",
  );

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
    <div className="flex flex-col items-center">
      <div className="bg-[#2C2B30] px-6 py-4 rounded-lg shadow-md text-primary-color text-2xl font-mono min-w-15">
        {(value ?? 0).toString().padStart(2, "0")}
      </div>
      <div className="text-xs text-[#AAAAAA] mt-1">{label}</div>
    </div>
  );

  return (
    <div className="w-full bg-[#1C1A18] py-16 px-4 text-center">
      <div className="max-w-6xl mx-auto rounded-xl">
        <p className="inline-block px-3 py-1 rounded-full text-sm mb-3 bg-[#622c1c] text-primary-color">
          {timeLeft?.expired ? "🎉 Sale Ended" : "🔥 Limited Time Only"}
        </p>
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-accent-content">
          {title}
        </h1>
        <p className="mb-8 text-[#B0B0B0] text-lg">{description}</p>

        {timeLeft && !timeLeft.expired && (
          <div className="flex justify-center flex-wrap gap-4 mb-8">
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
    </div>
  );
};

export default SaleCountDown;
