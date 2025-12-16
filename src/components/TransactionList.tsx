import { useSelector } from "react-redux";
import type { RootState } from "../features/store";
import clsx from "clsx";
import { useState } from "react";
import { useIsDark } from "../theme/isDark";
import { Link } from "react-router-dom";
import useTruncate from "../utils/TruncateMiddle";

export default function TransactionList() {
  const blocks = useSelector((state: RootState) => state.blocks.blocks);
  const isDark = useIsDark();
  const truncate = useTruncate();

  if (!blocks.length) {
    return (
      <div className="px-4 py-6 text-center text-slate-500 h-full min-h-screen">
        Loading transactions…
      </div>
    );
  }

  function formatEth(valueHex?: string) {
    if (!valueHex) return " ETH";
    const wei = BigInt(valueHex);
    if (wei === 0n) return "    000 ETH";
    const eth = Number(wei) / 1e18;
    if (eth < 0.0001) return "< 0.0001 ETH";
    if (eth < 1) return eth.toFixed(6) + " ETH";
    return eth.toFixed(6) + " ETH";
  }
  const transactions = blocks[0].transactions ?? [];
  return (
    <div className="w-full flex flex-col items-center p-4 text-sm lg:text-base min-h-screen gap-1">
      <p className="text-xl m-2 font-semibold w-full max-w-6xl">
        Latest Transactions
      </p>
      <div
        className={clsx(
          "w-full max-w-6xl p-4 rounded-xl border flex transition hover:shadow-lg font-semibold",
          isDark
            ? "border-slate-800 bg-slate-900 hover:bg-slate-800/50"
            : "border-slate-200 bg-white hover:bg-slate-50"
        )}
      >
        <p className="w-4/12 ">Transactions</p>
        <p className="w-3/12 text">From</p>
        <p className="w-3/12">To</p>
        <p>Value</p>
      </div>
      {transactions.length === 0 && (
        <div className="text-center py-6 text-slate-500">
          No transactions in this block.
        </div>
      )}

      {transactions.map((tx: any) => (
        <div
          key={tx.hash}
          className={clsx(
            "w-full max-w-6xl p-4 rounded-xl border flex justify-between gap-2 md:gap-0 transition hover:shadow-lg",
            isDark
              ? "border-slate-800 bg-slate-900 hover:bg-slate-800/50"
              : "border-slate-200 bg-white hover:bg-slate-50"
          )}
        >
          <div className="flex items-center gap-2 w-4/12">
            <Link
              to={`/tx/${tx.hash}`}
              className="font-mono font-medium hover:text-blue-600 hover:underline truncate max-w-[200px] md:max-w-[300px] lg:max-w-[400px]"
              title={tx.hash}
            >
              {truncate(tx.hash)}
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0 w-3/12">
            <span
              className="font-mono text-xs truncate max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
              title={tx.from}
            >
              {truncate(tx.from)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0 w-3/12">
            <span
              className="font-mono text-xs truncate max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
              title={tx.to}
            >
              {truncate(tx.to)}
            </span>
          </div>
          <div className="truncate font-mono font-medium mt-2 md:mt-0  w-2/12">
            {formatEth(tx.value)}
          </div>
        </div>
      ))}
    </div>
  );
}
