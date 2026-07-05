export const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
      active
        ? "bg-primary-color text-black shadow-lg shadow-primary-color/20"
        : "bg-card-bg text-gray-400 hover:text-accent-content border border-accent-content/5"
    }`}
  >
    {children}
  </button>
);
