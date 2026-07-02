"use client";

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
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar({ onClose }) {
  const pathname = usePathname();
  const { push } = useRouter();

  const menuItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Orders",
      href: "/dashboard/orders",
      icon: <ShoppingBag size={20} />,
    },
    {
      label: "Customers",
      href: "/dashboard/customers",
      icon: <Users size={20} />,
    },
    {
      label: "Hero Banner",
      href: "/dashboard/hero-banner",
      icon: <ImageIcon size={20} />,
    },
    {
      label: "Sale Countdown",
      href: "/dashboard/sale-countdown",
      icon: <Timer size={20} />,
    },
    {
      label: "Featured Products",
      href: "/dashboard/featured-products",
      icon: <Star size={20} />,
    },
    {
      label: "Reviews",
      href: "/dashboard/reviews",
      icon: <MessageSquare size={20} />,
    },
    {
      label: "Site Settings",
      href: "/dashboard/site-settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="h-full bg-[#11151c] border-r border-accent-content/5 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between pr-4 px-6 py-3.5">
        <div className="flex flex-col ">
          <span className="text-accent-content font-bold uppercase">
            Admin Panel
          </span>
          <pre className="text-xs text-gray-400 whitespace-break-spaces">
            Manage your store and products with ease.
          </pre>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 text-gray-400 hover:text-accent-content transition-colors"
          >
            <X size={24} />
          </button>
        )}
      </div>
      <nav className="flex-1 px-6 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
              pathname === item.href
                ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                : "text-gray-400 hover:bg-accent-content/5 hover:text-accent-content"
            }`}
          >
            {item.icon} <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-6 py-3 border-t border-accent-content/5">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-4 px-4 py-2 w-full text-gray-500 hover:text-primary-color transition-colors font-bold text-sm"
        >
          <HomeIcon size={20} /> <span>Back to Home</span>
        </Link>
        <button
          onClick={() => {
            signOut({
              redirect: false,
            });
            onClose();
            push("/");
          }}
          className="flex items-center gap-4 px-4 py-2 w-full text-gray-500 hover:text-secondary transition-colors font-bold text-sm"
        >
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
