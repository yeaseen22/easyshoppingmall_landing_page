import { Package, Truck, Shield, Headphones, Star, Heart, Zap, Award } from "lucide-react";

const iconMap = {
  Package, Truck, Shield, Headphones, Star, Heart, Zap, Award,
};

export default function Features({ features }) {
  if (!features?.enabled || !features?.items?.length) return null;

  return (
    <section className="bg-[#0a0c12] px-[4%] py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-color/10 border border-primary-color/30 text-primary-color text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Why Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-accent-content mb-4">
            {features.title || "Why Choose Us"}
          </h2>
          {features.subtitle && (
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              {features.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Package;
            return (
              <div
                key={i}
                className="group bg-[#11151c] border border-accent-content/5 rounded-2xl p-8 transition-all duration-300 hover:border-primary-color/30 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-primary-color/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-color/20 transition-all">
                  <Icon className="w-7 h-7 text-primary-color" />
                </div>
                <h3 className="text-lg font-bold text-accent-content mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
