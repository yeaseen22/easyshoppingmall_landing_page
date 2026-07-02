import { AuthButton } from "@/components/ui/auth-button";
import Container from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

export default function Navbar({ settings = {} }) {
  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-2xl border-b border-accent-content/8 shadow-2xl shadow-black/40">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <Logo brand={settings.navbar} />
          <AuthButton />
        </nav>
      </Container>
    </header>
  );
}
