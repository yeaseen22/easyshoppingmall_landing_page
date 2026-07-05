const selectClass =
  "w-full bg-[#1c2128] border border-gray-700 rounded-lg px-4 py-3 text-accent-content text-xs sm:text-sm outline-none focus:border-primary-color transition-all appearance-none capitalize";

export default function VariantSelector({ label, options = [], selected, onSelect, error }) {
  if (!options?.length) return null;

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase text-gray-500">{label}</label>
      <div className="relative">
        <select
          value={selected || ""}
          onChange={(e) => onSelect(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-400 text-[10px]">{error}</p>}
    </div>
  );
}
