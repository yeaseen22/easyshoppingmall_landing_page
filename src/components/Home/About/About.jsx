import Image from "next/image";

export default function About({ about }) {
  if (!about?.enabled) return null;

  return (
    <section className="bg-[#080808] px-[4%] py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-color/10 to-secondary/10 rounded-[2.5rem] blur-2xl" />
          <div className="relative bg-[#11151c] border border-accent-content/10 rounded-2xl overflow-hidden">
            {about.imageUrl ? (
              <Image
                src={about.imageUrl}
                alt={about.title || "About Us"}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-[#0a0c12]">
                <p className="text-gray-600">Add an image in site settings</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-content leading-tight">
            {about.title || "About Us"}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            {about.description || "EasyShoppingMall is your premier destination for online shopping in Bangladesh. We offer quality products, competitive prices, and fast delivery."}
          </p>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="text-center p-4 bg-[#11151c] rounded-xl border border-accent-content/5">
              <p className="text-2xl font-bold text-primary-color">10K+</p>
              <p className="text-xs text-gray-500 mt-1">Products</p>
            </div>
            <div className="text-center p-4 bg-[#11151c] rounded-xl border border-accent-content/5">
              <p className="text-2xl font-bold text-primary-color">20K+</p>
              <p className="text-xs text-gray-500 mt-1">Customers</p>
            </div>
            <div className="text-center p-4 bg-[#11151c] rounded-xl border border-accent-content/5">
              <p className="text-2xl font-bold text-primary-color">50+</p>
              <p className="text-xs text-gray-500 mt-1">Cities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
