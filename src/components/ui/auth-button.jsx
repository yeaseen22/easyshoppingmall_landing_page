"use client";

import { LayoutDashboardIcon, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) {
    return (
      <button
        onClick={() => push("/dashboard")}
        className="flex items-center gap-2 bg-primary-color/80 hover:bg-primary-color text-white px-4 py-2 rounded-lg transition-colors"
      >
        <LayoutDashboardIcon className="w-4 h-4" />
        Dashboard
      </button>
    );
  }

  return (
    <button
      onClick={() => push("/login")}
      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
    >
      <LogIn className="w-4 h-4" />
      Sign In
    </button>
  );
};
