import { Loader2Icon } from "lucide-react";

function StatCard({ icon, label, value, color, isLoading }) {
  return (
    <div className="bg-[#11151c] p-7 rounded-2xl border border-accent-content/5 shadow-xl hover:border-[#d4af37]/30 transition-all group">
      <div
        className={`mb-5 p-3 bg-accent-content/5 w-fit rounded-xl group-hover:scale-110 transition-transform ${color}`}
      >
        {icon}
      </div>
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
        {label}
      </p>
      {isLoading ? (
        <span className="flex">
          <Loader2Icon className="animate-spin w-6 h-6 text-accent-content mt-2" />
        </span>
      ) : (
        <h3 className="text-3xl font-bold mt-2 text-accent-content">{value}</h3>
      )}
    </div>
  );
}

export default StatCard;
