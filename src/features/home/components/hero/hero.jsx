import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getHeroBanner } from "@/features/home/actions/hero-banner";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const banner = (await getHeroBanner()) || {};

  return (
    <Section className="relative min-h-[90vh] flex items-center bg-[#07070a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,201,0,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(248,113,113,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.04)_0%,transparent_50%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-125 h-125 rounded-full opacity-30 animate-orb-float"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,201,0,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-100 h-100 rounded-full opacity-25 animate-orb-float-slow"
          style={{
            background:
              "radial-gradient(circle at center, rgba(248,113,113,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-112.5 h-112.5 rounded-full opacity-20 animate-orb-float-reverse"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-10 animate-orb-float"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,201,0,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-color/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-color/20 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="space-y-5">
              {banner.tagLine && (
                <span className="inline-flex items-center gap-2 bg-primary-color/10 border border-primary-color/25 text-primary-color text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full uppercase tracking-[0.15em] animate-glow-pulse">
                  <Sparkles className="size-3" />
                  {banner.tagLine}
                </span>
              )}

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-accent-content leading-[1.05] tracking-tight">
                {banner.title || (
                  <>
                    Shop Smarter,
                    <br />
                    <span className="bg-linear-to-r from-primary-color to-amber-400 bg-clip-text text-transparent">
                      Save Big
                    </span>
                  </>
                )}
              </h1>

              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                {banner.description ||
                  "Experience the future of online shopping. Premium products, wholesale prices, and lightning-fast delivery at your doorstep."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="group relative inline-flex items-center gap-3 bg-primary-color hover:bg-accent-content text-accent font-bold px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 text-sm sm:text-base overflow-hidden"
              >
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                <span className="relative flex items-center gap-3">
                  <ShoppingBag className="size-5" />
                  Start Shopping
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-2 bg-linear-to-r from-primary-color/30 via-amber-500/20 to-secondary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-all duration-700 animate-glow-pulse" />

            <div className="absolute -inset-1 bg-linear-to-r from-primary-color/20 via-transparent to-secondary/20 rounded-3xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500" />

            <div className="relative bg-[#0c0c12] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-color/40 to-transparent" />

              <div className="relative aspect-4/3 md:aspect-5/4 w-full overflow-hidden">
                <Image
                  src={
                    banner?.imageUrl ||
                    "https://res.cloudinary.com/dqh5dajig/image/upload/v1777375085/samples/coffee.jpg"
                  }
                  alt="Premium Shopping Experience"
                  className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                  width={840}
                  height={600}
                  loading="eager"
                  priority
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#07070a]/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
