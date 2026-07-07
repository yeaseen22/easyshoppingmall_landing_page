"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export function NotFound({
  title = "Page Not Found",
  description = "The page you are looking for does not exist or has been moved.",
  showHome = true,
  showBack = true,
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="text-5xl font-black text-primary">404</span>
        </div>
      </div>
      <h1 className="mb-3 text-3xl font-bold text-foreground">{title}</h1>
      <p className="mb-8 max-w-md text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-4">
        {showBack && (
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft size={16} />
            Go Back
          </Button>
        )}
        {showHome && (
          <Link href="/">
            <Button>
              <Home size={16} />
              Back to Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
