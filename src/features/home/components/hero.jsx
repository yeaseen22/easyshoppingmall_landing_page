import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ banner = {} }) {
  return (
    <Section className="relative flex items-center bg-background overflow-hidden hero-banner">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,201,0,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(248,113,113,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.04)_0%,transparent_50%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-125 h-125 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,201,0,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-32 w-100 h-100 rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(248,113,113,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 left-1/4 w-112.5 h-112.5 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,201,0,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="space-y-5">
              {banner.tagLine && (
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-2 bg-primary/10 border-primary/25 text-primary text-[10px] sm:text-xs px-4 py-2 rounded-full uppercase tracking-[0.15em] whitespace-pre-wrap"
                >
                  <Sparkles className="size-3" />
                  {banner.tagLine}
                </Badge>
              )}

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight">
                {banner.title || (
                  <>
                    Shop Smarter,
                    <br />
                    <span className="bg-linear-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                      Save Big
                    </span>
                  </>
                )}
              </h1>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                {banner.description ||
                  "Experience the future of online shopping. Premium products, wholesale prices, and lightning-fast delivery at your doorstep."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="#products">
                  <span className="relative flex items-center gap-3">
                    <ShoppingBag className="size-5" />
                    Start Shopping
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-2 bg-linear-to-r from-primary/30 via-amber-500/20 to-secondary/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-all duration-700" />

            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-transparent to-secondary/20 rounded-3xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500" />

            <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

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

                <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
