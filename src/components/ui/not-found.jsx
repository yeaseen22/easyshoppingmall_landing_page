"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function NotFound({
  title = "Page Not Found",
  description = "The page you are looking for does not exist or has been moved.",
  showHome = true,
  showBack = true,
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary-color/10">
          <span className="text-5xl font-black text-primary-color">404</span>
        </div>
      </div>
      <h1 className="mb-3 text-3xl font-bold text-accent-content">{title}</h1>
      <p className="mb-8 max-w-md text-gray-400">{description}</p>
      <div className="flex flex-wrap gap-4">
        {showBack && (
          <button
            onClick={() => window.history.back()}
            className={cn(
              "flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all",
              "border border-accent-content/10 text-gray-300 hover:bg-accent-content/5",
            )}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        )}
        {showHome && (
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-primary-color px-6 py-3 text-sm font-bold text-black transition-all hover:bg-primary-color/90"
          >
            <Home size={16} />
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
}
