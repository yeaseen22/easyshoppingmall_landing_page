export const OrderTableCardSkeleton = () => {
  return (
    <>
      <div className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-20 bg-gray-700 rounded"></div>
          <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
        </div>

        <div className="h-4 w-40 bg-gray-700 rounded"></div>

        <div className="h-3 w-32 bg-gray-700 rounded"></div>
        <div className="h-3 w-28 bg-gray-700 rounded"></div>

        <div className="h-4 w-24 bg-gray-700 rounded"></div>

        <div className="flex justify-end gap-2 pt-2">
          <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </>
  );
};
