"use client";

import { LayoutDashboardIcon, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") {
    return (
      <>
        <div className="w-20 h-6 rounded-lg bg-gray-500 animate-pulse"></div>
      </>
    );
  }

  if (session) {
    return (
      <button
        onClick={() => push("/dashboard")}
        type="button"
        aria-label="Dashboard"
        title="Dashboard"
        className="flex items-center gap-2 bg-primary-color/80 hover:bg-primary-color text-neutral-900 px-2 md:px-4 py-2 rounded-lg transition-colors"
      >
        <LayoutDashboardIcon className="size-4" />
        <span className="hidden sm:inline-block">Dashboard</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => push("/login")}
      type="button"
      aria-label="Sign In"
      title="Sign In"
      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-2 md:px-4 py-2 rounded-lg transition-colors"
    >
      <LogIn className="size-4" />
      <span className="hidden sm:inline-block">Sign In</span>
    </button>
  );
};
