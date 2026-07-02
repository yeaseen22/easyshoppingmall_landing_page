const loading = () => {
  return (
    <div className="space-y-5 animate-pulse">
      {/* ================= HEADER ================= */}
      <div>
        <div className="h-6 sm:h-7 md:h-8 w-56 bg-gray-700 rounded"></div>
        <div className="h-3 w-40 bg-gray-700 rounded mt-2"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-[#11151c] p-7 rounded-2xl border border-accent-content/5 shadow-xl"
            >
              {/* Icon */}
              <div className="mb-5 p-3 bg-accent-content/5 w-fit rounded-xl">
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
              </div>

              {/* Title */}
              <div className="h-3 w-24 bg-gray-700 rounded mb-2"></div>

              {/* Value */}
              <div className="h-8 w-20 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE SKELETON ================= */}
      <div className="block xl:hidden space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-[#11151c] border border-accent-content/5 rounded-xl p-4 space-y-3"
          >
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
        ))}
      </div>

      {/* ================= DESKTOP TABLE SKELETON ================= */}
      <div className="hidden xl:block bg-[#11151c] border border-accent-content/5 rounded-xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0a0c12] border-b border-accent-content/5">
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-3 w-20 bg-gray-700 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="border-b border-accent-content/5">
                  <td className="px-6 py-4">
                    <div className="h-3 w-16 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-3 w-24 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-4 w-20 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-3 w-28 bg-gray-700 rounded"></div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
                      <div className="h-8 w-8 bg-gray-700 rounded-lg"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default loading;
