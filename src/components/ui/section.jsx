"use client";

import { cn } from "@/utils/utils";

const Section = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "pt-26 md:pt-32 pb-14 min-h-dvh grid place-items-center w-full h-full clear-both",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
