import { getHeroBanner } from "@/features/home/actions/hero-banner";
import { ArrowRight, ShoppingBag, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const banner = await getHeroBanner();

  return (
    <section className="bg-[#080808] relative overflow-hidden font-sans">
      <div className="pointer-events-none absolute -top-32 right-[-5%] w-150 h-150 rounded-full bg-primary-color/10 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute bottom-[-10%] -left-20 w-125 h-125 rounded-full bg-secondary/5 blur-[120px]" />

      <div className="relative z-10 px-[6%] pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 bg-linear-to-r from-primary-color/20 to-transparent border-l-2 border-primary-color text-primary-color text-[12px] font-bold px-4 py-2 uppercase tracking-[0.2em]">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Mega Sale is Live Now
            </span>

            {banner?.title ? (
              <h1
                className="text-5xl md:text-7xl font-black text-accent-content leading-[1.05] tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: banner.title.replace(/className=/g, "class="),
                }}
              />
            ) : (
              <h1 className="text-5xl md:text-7xl font-black text-accent-content leading-[1.05] tracking-tight">
                Shop{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-color to-primary-color">
                  Smarter
                </span>
                ,<br />
                Save Big.
              </h1>
            )}

            <p className="text-gray-400 text-lg leading-relaxed max-w-120">
              {banner?.description ||
                "Experience the future of online shopping. Premium products, wholesale prices, and lightning-fast delivery at your doorstep."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#products"
              className="group flex items-center gap-3 bg-primary-color hover:bg-accent-content text-accent font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.5)] hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-primary-color to-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative bg-[#0f0f0f] border border-accent-content/10 rounded-2xl p-4 overflow-hidden shadow-2xl">
            <div className="relative h-100 w-full rounded-2xl overflow-hidden">
              <Image
                src={
                  banner?.imageUrl ||
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
      </div>
    </section>
  );
}
