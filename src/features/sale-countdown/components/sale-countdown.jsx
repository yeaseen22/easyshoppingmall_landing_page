"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useCallback, useEffect, useState } from "react";

const SaleCountDown = ({ saleCountdown }) => {
  const targetDate = saleCountdown?.targetDate;
  const timezone = saleCountdown?.timezone;

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

  if (!saleCountdown) return null;

  const zonedDate =
    targetDate && timezone ? toZonedTime(new Date(targetDate), timezone) : null;

  const timeBlock = (value, label) => (
    <div className="bg-muted/50 backdrop-blur-md size-12.5 sm:size-18 p-1.5 rounded-md shadow-md flex justify-center flex-col items-center">
      <span className="text-primary text-base sm:text-xl">
        {(value ?? 0).toString().padStart(2, "0")}
      </span>
      <span className="text-[8px] sm:text-xs text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <Section className="text-center min-h-auto py-10 md:py-16 relative">
      <Container className="max-w-4xl">
        <Card className="bg-primary/14 backdrop-blur-md shadow-sm p-5 border-primary items-center gap-2.5">
          <Badge className="inline-flex px-3 py-1 rounded-full text-xs sm:text-sm mb-3 bg-[#622c1c] text-primary hover:bg-[#622c1c] border-0 text-center">
            {timeLeft?.expired ? "Sale Ended" : "Limited Time Only"}
          </Badge>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-foreground">
            {saleCountdown.title}
          </h1>
          <p className="mb-6 text-muted-foreground text-sm sm:text-base md:text-lg">
            {saleCountdown.description}
          </p>

          {timeLeft && !timeLeft.expired && (
            <>
              <div className="grid grid-cols-7 place-items-center gap-1 mb-4 max-w-xs mx-auto">
                {timeBlock(timeLeft.days, "DAYS")}
                <span className="text-xl font-bold text-muted-foreground flex items-center">
                  :
                </span>
                {timeBlock(timeLeft.hours, "HOURS")}
                <span className="text-xl font-bold text-muted-foreground flex items-center">
                  :
                </span>
                {timeBlock(timeLeft.minutes, "MINUTES")}
                <span className="text-xl font-bold text-muted-foreground flex items-center">
                  :
                </span>
                {timeBlock(timeLeft.seconds, "SECONDS")}
              </div>
              {zonedDate && (
                <p className="text-[10px] text-muted-foreground">
                  Ends {format(zonedDate, "MMM d, yyyy 'at' h:mm a")} (
                  {timezone})
                </p>
              )}
            </>
          )}

          {timeLeft?.expired && (
            <div className="text-xl text-muted-foreground font-bold py-6">
              This sale has ended. Stay tuned for new offers!
            </div>
          )}
        </Card>
      </Container>
    </Section>
  );
};

export default SaleCountDown;
