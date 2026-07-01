import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../app/api/auth/[...nextauth]/route";
import AuthButton from "@/components/Shared/Buttons/AuthButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const user = session?.user || null
  return (
    <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-2xl border-b border-accent-content/8 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between px-[4%] py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 bg-linear-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center border border-accent-content/10 shadow-lg shadow-black/50">
            <ShoppingCart className="w-5 h-5 text-primary-color" />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-bold leading-tight">
              <span className="text-accent-content">EASY</span>
              <span className="text-primary-color">SHOPPINGMALL</span>
            </div>
            <div className="text-[11px] text-gray-500">Best deals every day</div>
          </div>
        </Link>

        <AuthButton user={user} />

      </div>
    </nav>
  );
}
