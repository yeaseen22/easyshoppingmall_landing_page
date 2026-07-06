"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ErrorPage({ error, reset }) {
  const router = useRouter();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-4 text-center">
      <div className="mb-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
          <AlertTriangle className="h-10 w-10 text-secondary" />
        </div>
      </div>
      <h1 className="mb-2 text-3xl font-bold text-accent-content">
        Oops! Something went wrong
      </h1>
      <p className="mb-8 max-w-md text-gray-400">
        {error?.message ||
          "An unexpected error occurred. Please try again later."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => (reset ? reset() : router.refresh())}
          className="flex items-center gap-2 rounded-xl bg-primary-color px-6 py-3 text-sm font-bold text-black transition-all hover:bg-primary-color/90"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-accent-content/10 px-6 py-3 text-sm font-bold text-gray-300 transition-all hover:bg-accent-content/5"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
