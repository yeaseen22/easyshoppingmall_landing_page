import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AuthButton } from "@/components/ui/auth-button";
import Container from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";

const Navbar = ({ settings = {} }) => {
  return (
    <header className="fixed top-0 z-100 w-full bg-background/85 backdrop-blur-2xl border-b border-border shadow-2xl shadow-black/40">
      <Container>
        <nav className="flex items-center justify-between py-3">
          <Logo brand={settings.navbar} />

          <div className="flex items-center justify-center gap-4">
            <AnimatedThemeToggler />
            <AuthButton />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
