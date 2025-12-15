import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../features/store";
import { addBlock } from "../features/blockSlice";
import { useGetLatestBlock } from "../features/useExplorerQuery";
import clsx from "clsx";
import { useIsDark } from "../theme/isDark";
import { Link } from "react-router-dom";

export default function BlockList({ chainId }: { chainId: number }) {
  const dispatch = useDispatch();
  const blocks = useSelector((state: RootState) => state.blocks.blocks);
  const latestFive = blocks.slice(0, 5);
  const { data: latestBlock, isLoading, error } = useGetLatestBlock(chainId);
  const isDark = useIsDark();

  useEffect(() => {
    if (latestBlock) {
      if (!blocks.length || blocks[0].hash !== latestBlock.hash) {
        dispatch(addBlock(latestBlock));
      }
    }
  }, [latestBlock, blocks, dispatch]);

  return (
    <div className="w-full flex justify-center  p-4 text-sm lg:text-base h-screen">
      <div
        className={clsx(
          "overflow-x-auto rounded-xl border w-full max-w-6xl h-min",
          isDark
            ? " dark:border-slate-800  dark:bg-slate-900"
            : " border-slate-200 bg-white"
        )}
      >
        <table className="w-full border-collapse ">
          <thead className={clsx(isDark ? "bg-slate-800" : "bg-slate-100 ")}>
            <tr className="text-left text-lg ">
              <th className="px-4 py-3 font-medium">Block</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">
                Hash
              </th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Txns</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center ">
                  Loading latest blocks…
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-red-500">
                  Error fetching blocks
                </td>
              </tr>
            )}

            {latestFive.map((block) => (
              <tr
                key={block.hash}
                className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="px-4 py-3 font-mono">
                  <Link to={`/block/${parseInt(block.number,16)}`}>{parseInt(block.number ?? "0x0", 16)}</Link>
                </td>

                <td className="px-4 py-3 font-mono text-xs hidden md:table-cell truncate max-w-[300px]">
                  {block.hash}
                </td>

                <td className="px-4 py-3 font-mono">
                  {parseInt(block.size ?? "0x0", 16)}
                </td>

                <td className="px-4 py-3 font-mono">
                  {block.transactions?.length || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
