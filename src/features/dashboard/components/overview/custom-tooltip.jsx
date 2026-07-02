function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#1a1f2e] border border-accent-content/10 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold" style={{ color: p.color }}>
          {p.name}:{" "}
          {p.name === "Revenue" ? `৳${p.value.toLocaleString()}` : p.value}
        </p>
      ))}
    </div>
  );
}

export default CustomTooltip;
