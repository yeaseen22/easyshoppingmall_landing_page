export const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg ${color || "bg-emerald-100"}`}>
            <Icon className={`w-6 h-6 ${color ? "text-white" : "text-emerald-600"}`} />
          </div>
        )}
      </div>
    </div>
  );
};
