import { useEffect } from "react";
import clsx from "clsx";
import {
  blockDetailsQuery,
  blockListQuery,
} from "../features/useExplorerQuery";
import { isDark } from "../theme/isDark";

interface GetBlockProp {
  chainId: number;
  blockNumber: number;
}

function GetBlock({ chainId, blockNumber }: GetBlockProp) {
  const { data, isLoading, error } = blockDetailsQuery(chainId, blockNumber);
  const block = data?.result;
  return (
    <div className="w-full md:w-[95%] lg:w-[90%] m-1">
      {block && (
        <div
          className={clsx(
            "w-full flex justify-between p-2 rounded px-10",
            isDark() ? "bg-gray-800 shadow" : "bg-white/20 shadow "
          )}
        >
          <p>{parseInt(block.number, 16)}</p>
          <p className="hidden md:table-cell">{block.hash}</p>
          <p>{parseInt(block.size, 16)}</p>
          <p>{block.transactions?.length || 0}</p>
        </div>
      )}
    </div>
  );
}

export default function BlockList({ chainId }: { chainId: number }) {
  const { data, isLoading, error } = blockListQuery(chainId, 2);
  return (
    <div className="w-full flex flex-col p-2 text-sm lg:text-lg items-center ">
      {isLoading && <div>Loading</div>}
      {data &&
        data.map((dt, index) => (
          <GetBlock chainId={chainId} blockNumber={dt} />
        ))}
    </div>
  );
}
