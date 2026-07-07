export const OrderTableRowSkeleton = () => (
  <>
    <tr className="border-b border-border">
      <td className="px-6 py-4"><div className="h-3 w-16 bg-muted rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-32 bg-muted rounded"></div></td>
      <td className="px-6 py-4"><div className="h-3 w-24 bg-muted rounded"></div></td>
      <td className="px-6 py-4"><div className="h-4 w-20 bg-muted rounded"></div></td>
      <td className="px-6 py-4"><div className="h-3 w-28 bg-muted rounded"></div></td>
      <td className="px-6 py-4"><div className="h-5 w-16 bg-muted rounded-full"></div></td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <div className="h-8 w-8 bg-muted rounded-lg"></div>
          <div className="h-8 w-8 bg-muted rounded-lg"></div>
        </div>
      </td>
    </tr>
  </>
);
