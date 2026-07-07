import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero({ banner = {} }) {
  return (
    <Section className="relative flex items-center bg-background overflow-hidden hero-banner">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8">
            <div className="space-y-5">
              {banner.tagLine && (
                <Badge
                  variant="outline"
                  className="inline-flex items-center gap-2 bg-primary/10 border-primary/25 text-primary text-[10px] sm:text-xs px-4 py-2 rounded-full uppercase tracking-[0.15em] whitespace-pre-wrap"
                >
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
            <div className="relative bg-card border border-border rounded-md overflow-hidden shadow-2xl">
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
