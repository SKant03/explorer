import { useSelector } from "react-redux";
import type { RootState } from "../features/store";
import clsx from "clsx";
import { useIsDark } from "../theme/isDark";
import { Link } from "react-router-dom";

export default function TransactionList() {
  const blocks = useSelector((state: RootState) => state.blocks.blocks);
  const isDark = useIsDark();

  if (!blocks.length) {
    return (
      <div className="px-4 py-6 text-center text-slate-500 h-full min-h-screen">
        Loading transactions…
      </div>
    );
  }

  const transactions = blocks[0].transactions ?? [];

  return (
    <div className="w-full flex justify-center p-4 text-sm lg:text-base min-h-screen h-full">
      <div
        className={clsx(
          "overflow-x-auto rounded-xl border w-full max-w-6xl",
          isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
        )}
      >
        <table className="w-full border-collapse">
          <thead className={clsx(isDark ? "bg-slate-800" : "bg-slate-100")}>
            <tr className="text-left text-lg">
              <th className="px-4 py-3 font-medium hidden md:table-cell">
                Hash
              </th>
              <th className="px-4 py-3 font-medium">Block</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">
                From
              </th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">To</th>
              <th className="px-4 py-3 font-medium">Value</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No transactions in this block.
                </td>
              </tr>
            )}

            {transactions.map((tx: any) => (
              <tr
                key={tx.hash}
                className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="px-4 py-3 font-mono text-xs hidden md:table-cell truncate max-w-[260px]">
                  <Link to={`/tx/${tx.hash}`}>{tx.hash}</Link>
                </td>

                <td className="px-4 py-3 font-mono">
                  {parseInt(tx.blockNumber, 16)}
                </td>

                <td className="px-4 py-3 font-mono text-xs hidden lg:table-cell truncate max-w-[200px]">
                  {tx.from}
                </td>

                <td className="px-4 py-3 font-mono text-xs hidden lg:table-cell truncate max-w-[200px]">
                  {tx.to}
                </td>

                <td className="px-4 py-3 font-mono">
                  {parseInt(tx.value ?? "0x0", 16)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
