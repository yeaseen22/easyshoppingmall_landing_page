import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { getHeroBanner } from "@/features/home/actions/hero-banner";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const banner = await getHeroBanner();

  return (
    <Section className="bg-[#080808] relative overflow-hidden font-sans">
      <div className="pointer-events-none absolute -top-32 right-[-5%] w-150 h-150 rounded-full bg-primary-color/10 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-[-10%] -left-20 w-125 h-125 rounded-full bg-secondary/5 blur-[120px]" />

      <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-3.5">
            {banner?.tagLine && (
              <span className="inline-flex items-center gap-2 bg-linear-to-r from-primary-color/20 to-transparent border-l-2 border-primary-color text-primary-color text-[10px] sm:text-xs font-bold px-4 py-2 uppercase tracking-[0.2em]">
                <Zap className="size-3.5 fill-current" />
                {banner.tagLine}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-accent-content leading-[1.05] tracking-tight">
              {banner.title || "Shop Smarter, Save Big."}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-120">
              {banner.description ||
                "Experience the future of online shopping. Premium products, wholesale prices, and lightning-fast delivery at your doorstep."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#products"
              className="group flex items-center gap-3 bg-primary-color hover:bg-accent-content text-accent font-bold px-5 py-2 rounded-md transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.5)] hover:-translate-y-1 text-sm sm:text-base xl:text-lg"
            >
              <ShoppingBag className="size-5 hidden md:inline-block" />
              Start Shopping
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform hidden md:inline-block" />
            </Link>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary-color to-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-[#0f0f0f] border border-accent-content/10 rounded-md overflow-hidden shadow-2xl">
            <div className="relative aspect-3/2 h-56 sm:h-80 xl:100 w-full rounded-md overflow-hidden">
              <Image
                src={
                  banner.imageUrl ||
                  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
                }
                alt="New Arrivals"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={840}
                height={500}
                loading="eager"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
