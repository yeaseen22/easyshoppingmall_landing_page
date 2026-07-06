export default function RootLoading() {
  return (
    <div className="w-full min-h-screen bg-[#080808]">
      <div className="flex items-center justify-between px-[4%] py-3 border-b border-accent-content/5 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gray-700/50 rounded-2xl" />
          <div className="hidden sm:block space-y-1">
            <div className="h-4 w-40 bg-gray-700/50 rounded" />
            <div className="h-3 w-24 bg-gray-700/50 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 bg-gray-700/50 rounded-xl" />
        </div>
      </div>

      <div className="px-[6%] pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-pulse">
        <div className="space-y-6">
          <div className="h-5 w-44 bg-gray-700/50 rounded-full" />
          <div className="space-y-3">
            <div className="h-12 w-80 bg-gray-700/50 rounded" />
            <div className="h-12 w-64 bg-gray-700/50 rounded" />
          </div>
          <div className="h-4 w-96 bg-gray-700/50 rounded" />
          <div className="h-14 w-48 bg-gray-700/50 rounded-2xl" />
        </div>
        <div className="relative">
          <div className="w-full h-100 bg-gray-700/50 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
