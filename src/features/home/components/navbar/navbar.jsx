import { AuthButton } from "@/components/ui/auth-button";
import { Logo } from "@/components/ui/logo";

export default function Navbar({ settings = {} }) {
  return (
    <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-2xl border-b border-accent-content/8 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between px-[4%] py-3">
        <Logo brand={settings.navbar} />
        <AuthButton />
      </div>
    </nav>
  );
}
