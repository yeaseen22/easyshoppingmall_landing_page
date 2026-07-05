export const OrderTableRowSkeleton = () => (
  <>
    <tr className="border-b border-accent-content/5">
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
  </>
);
