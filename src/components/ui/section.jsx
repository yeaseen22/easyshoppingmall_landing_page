"use client";

import { cn } from "@/utils/cn";

const Section = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "py-26 md:py-32 min-h-dvh grid place-items-center w-full h-full clear-both",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
