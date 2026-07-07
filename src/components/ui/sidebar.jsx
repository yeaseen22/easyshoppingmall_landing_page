"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  HomeIcon,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingBag,
  Star,
  Timer,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Hero Banner", href: "/dashboard/hero-banner", icon: ImageIcon },
  { label: "Sale Countdown", href: "/dashboard/sale-countdown", icon: Timer },
  { label: "Featured Products", href: "/dashboard/featured-products", icon: Star },
  { label: "Reviews", href: "/dashboard/reviews", icon: MessageSquare },
  { label: "Site Settings", href: "/dashboard/site-settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col overflow-y-auto">
      <div className="px-6 py-3.5">
        <div className="flex flex-col">
          <span className="text-sidebar-foreground font-bold uppercase">Admin Panel</span>
          <span className="text-xs text-muted-foreground whitespace-break-spaces">
            Manage your store and products with ease.
          </span>
        </div>
      </div>
      <nav className="flex-1 px-6 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 transition-all text-sm font-bold ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <Separator className="bg-sidebar-border" />
      <div className="px-6 py-3 space-y-2">
        <Button variant="ghost" asChild className="w-full justify-start gap-4 text-muted-foreground hover:text-primary">
          <Link href="/">
            <HomeIcon size={20} /> Back to Home
          </Link>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            signOut({ redirect: false });
            push("/");
          }}
          className="w-full justify-start gap-4 text-muted-foreground hover:text-destructive"
        >
          <LogOut size={20} /> Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
