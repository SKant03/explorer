import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../features/store";
import { addBlock } from "../features/blockSlice";
import { useGetLatestBlock } from "../features/useExplorerQuery";

export default function BlockList({ chainId }: { chainId: number }) {
  const dispatch = useDispatch();

  // Read blocks from Redux
  const blocks = useSelector((state: RootState) => state.blocks.blocks);
  const latestFive = blocks.slice(0, 5);

  // Call hook at top level
  const { data: latestBlock, isLoading, error } = useGetLatestBlock(chainId);

  // When a new block arrives, add to Redux if it’s not already in the list
  useEffect(() => {
    if (latestBlock) {
      if (!blocks.length || blocks[0].hash !== latestBlock.hash) {
        dispatch(addBlock(latestBlock));
      }
    }
  }, [latestBlock, blocks, dispatch]);

  return (
    <div className="w-full flex flex-col p-2 text-sm lg:text-lg items-center">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching block</div>}
      {latestFive.map((block) => (
        <div key={block.hash} className="w-full md:w-[95%] lg:w-[90%] m-1">
          <div className="w-full flex justify-between p-2 rounded px-10 bg-gray-200">
            <p>{parseInt(block.number ?? "0x0", 16)}</p>
            <p className="hidden md:table-cell">{block.hash}</p>
            <p>{parseInt(block.size ?? "0x0", 16)}</p>
            <p>{block.transactions?.length || 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
