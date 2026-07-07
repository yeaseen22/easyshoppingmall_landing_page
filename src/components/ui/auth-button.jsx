"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutDashboardIcon, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") {
    return <Skeleton className="w-20 h-6" />;
  }

  if (session) {
    return (
      <Button size="sm" asChild>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-1"
        >
          <LayoutDashboardIcon className="size-4" />
          <span className="hidden sm:inline-block">Dashboard</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button onClick={() => push("/login")} size="sm" variant="secondary">
      <LogIn className="size-4" />
      <span className="hidden sm:inline-block">Sign In</span>
    </Button>
  );
};
