import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../features/store";
import clsx from "clsx";
import { useState } from "react";
import { useIsDark } from "../theme/isDark";
import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
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

  // Copy state for toast
  const [copied, setCopied] = useState<string | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full flex flex-col items-center p-4 text-sm lg:text-base min-h-screen gap-4">
      {transactions.length === 0 && (
        <div className="text-center py-6 text-slate-500">
          No transactions in this block.
        </div>
      )}

      {transactions.map((tx: any) => (
        <div
          key={tx.hash}
          className={clsx(
            "w-full max-w-6xl p-4 rounded-xl border flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 transition hover:shadow-lg",
            isDark
              ? "border-slate-800 bg-slate-900 hover:bg-slate-800/50"
              : "border-slate-200 bg-white hover:bg-slate-50"
          )}
        >
          {/* Hash */}
          <div className="flex items-center gap-2">
            <Link
              to={`/tx/${tx.hash}`}
              className="font-mono font-medium text-blue-600 hover:underline truncate max-w-[200px] md:max-w-[300px] lg:max-w-[400px]"
              title={tx.hash}
            >
              {truncate(tx.hash)}
            </Link>
            <Copy
              className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={() => handleCopy(tx.hash)}
            />
          </div>


          {/* From */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span
              className="font-mono text-xs truncate max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
              title={tx.from}
            >
              From:{truncate(tx.from)}
            </span>
            <Copy
              className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={() => handleCopy(tx.from)}
            />
          </div>

          {/* To */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span
              className="font-mono text-xs truncate max-w-[150px] md:max-w-[200px] lg:max-w-[250px]"
              title={tx.to}
            >
              To:{truncate(tx.to)}
            </span>
            <Copy
              className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={() => handleCopy(tx.to)}
            />
          </div>

          {/* Value */}
          <div className=" font-mono font-medium mt-2 md:mt-0 ">
            {formatEth(tx.value)}
          </div>
        </div>
      ))}

      {copied && (
        <div className="fixed left-4 bottom-4 bg-gray-800 text-white px-3 py-2 rounded shadow-lg z-50 text-sm animate-slide-in">
          Copied to clipboard!
        </div>
      )}

      <style>
        {`
          @keyframes slide-in {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}
