export default function VariantSelector({ label, options = [], selected, onSelect, error, colorPicker, badge }) {
  if (!options?.length) return null;

  const btnBase = "text-xs font-bold px-3 py-1.5 rounded-md border transition-all";

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          if (colorPicker) {
            return (
              <button key={opt} type="button" onClick={() => onSelect(opt)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${selected === opt ? "border-primary-color scale-110" : "border-gray-600 hover:border-gray-400"}`}
                style={{ backgroundColor: opt.toLowerCase() }} title={opt} />
            );
          }
          if (badge) {
            return (
              <button key={opt} type="button" onClick={() => onSelect(opt)}
                className={`${btnBase} ${selected === opt
                  ? opt === "hot" ? "border-red-500 bg-red-500/20 text-red-400" : "border-blue-500 bg-blue-500/20 text-blue-400"
                  : "border-gray-700 bg-[#1c2128] text-gray-300 hover:border-gray-500"}`}>
                {opt.toUpperCase()}
              </button>
            );
          }
          return (
            <button key={opt} type="button" onClick={() => onSelect(opt)}
              className={`${btnBase} ${selected === opt
                ? "border-primary-color bg-primary-color/20 text-primary-color"
                : "border-gray-700 bg-[#1c2128] text-gray-300 hover:border-gray-500"}`}>
              {opt}
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-400 text-[10px]">{error}</p>}
    </div>
  );
}
