"use client";

import { cn } from "@/utils/cn";

const Section = ({ children, className, ...props }) => {
  return (
    <section
      className={cn(
        "py-16 md:py-20 min-h-[calc(100vh-70px)] grid place-items-center",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default Section;
