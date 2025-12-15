import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../features/store";
import { addBlock } from "../features/blockSlice";
import { useGetLatestBlock } from "../features/useExplorerQuery";
import clsx from "clsx";
import { useIsDark } from "../theme/isDark";
import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import useTruncate from "../utils/TruncateMiddle";
import { timeAgo } from "../utils/Time";

export default function BlockList({ chainId }: { chainId: number }) {
  const dispatch = useDispatch();
  const blocks = useSelector((state: RootState) => state.blocks.blocks);
  const latestFive = blocks.slice(0, 5);
  const { data: latestBlock, isLoading, error } = useGetLatestBlock(chainId);
  const isDark = useIsDark();
  const truncate = useTruncate();

  // Copy state to show temporary feedback
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (latestBlock) {
      if (!blocks.length || blocks[0].hash !== latestBlock.hash) {
        dispatch(addBlock(latestBlock));
      }
    }
  }, [latestBlock, blocks, dispatch]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="w-full flex flex-col items-center p-4 text-sm lg:text-base h-screen gap-4">
      {isLoading && (
        <div className="text-center py-6">Loading latest blocks…</div>
      )}

      {error && (
        <div className="text-center py-6 text-red-500">
          Error fetching blocks
        </div>
      )}

      {latestFive.map((block) => {
        const blockNumber = parseInt(block.number ?? "0x0", 16);
        const blockSize = parseInt(block.size ?? "0x0", 16);
        const timestamp = parseInt(
          block.timestamp ?? `${Math.floor(Date.now() / 1000)}`,
          16
        );

        return (
          <div
            key={block.hash}
            className={clsx(
              "w-full max-w-4xl p-4 rounded-xl border transition hover:shadow-lg flex justify-between gap-2 md:gap-0",
              isDark
                ? "border-slate-800 bg-slate-900 hover:bg-slate-800/50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            )}
          >
            <div className="flex flex-col relati group">
              <div className="flex items-center gap-2">
                <Link
                  to={`/block/${blockNumber}`}
                  className="font-medium text-lg text-blue-600 hover:underline"
                >
                  Block #{blockNumber}
                </Link>
                <Copy
                  className="text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer w-4 "
                  onClick={() => handleCopy(block.number ?? 0)}
                />
              </div>
              <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                {timeAgo(timestamp)}
              </span>
            </div>
            <div className="hidden md:table-cell">
            <div className=" flex  justify-center  md:gap-2 mt-2 md:mt-0  group">
              <span >Miner: {truncate(block.miner)}</span>
              <Copy
                className=" w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-pointer"
                onClick={() => handleCopy(block.miner)}
              />
            </div>
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              <div>
                <span className="font-medium">Size: </span>
                <span className="font-mono">{blockSize} bytes</span>
              </div>
              <div>
                <span className="font-medium">Txns: </span>
                <span className="font-mono">
                  {block.transactions?.length || 0}
                </span>
              </div>
            </div>
          </div>
        );
      })}
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
