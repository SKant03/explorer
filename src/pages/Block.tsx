import { useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { useIsDark } from "../theme/isDark";
import { blockDetailsQuery } from "../features/useExplorerQuery";
import useTruncate from "../utils/TruncateMiddle";
import { Ribbon } from "lucide-react";

export default function Block({ chainId }: { chainId: number }) {
  const { blockNo } = useParams<{ blockNo: string }>();
  const [showMore, setShowMore] = useState(false);
  const isDark = useIsDark();
  const truncate = useTruncate();

  if (!blockNo) return <div>Invalid block number</div>;

  const { data, isLoading, isError } = blockDetailsQuery(chainId, blockNo);

  if (isLoading)
    return <div className="min-h-screen text-center">Loading…</div>;
  if (isError) return <div>Error loading block</div>;

  const block = data.result;

  const blockNumber = parseInt(block.number ?? "0x0", 16);
  const timestampMs = parseInt(block.timestamp ?? "0x0", 16) * 1000;
  const date = new Date(timestampMs);
  const timeAgoMins = Math.floor((Date.now() - timestampMs) / 60000);

  return (
    <div className="w-full h-full min-h-screen">
      <div
        className={clsx(
          "max-w-6xl mx-auto p-6 space-y-2",
          isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"
        )}
      >
        <p className="text-lg font-semibold w-full max-w-6xl">Block Details</p>
        <div
          className={clsx(
            "border rounded-lg p-4 space-y-3",
            isDark
              ? "border-slate-800 bg-slate-800"
              : "border-slate-200 bg-gray-50"
          )}
        >
          <Row label="Block Height" value={blockNumber} isDark={isDark} />
          <Row label="Status" value="Finalized" isDark={isDark} />
          <Row
            label="Timestamp"
            value={`${timeAgoMins} mins ago (${date.toUTCString()})`}
            isDark={isDark}
          />
          <Row
            label="Transactions"
            value={`${block.transactions.length} txns`}
            isDark={isDark}
          />
          <Row
            label="Withdrawals"
            value={block.withdrawals?.length ?? 0}
            isDark={isDark}
          />
          <Row
            label="Fee Recipient"
            value={<span className="font-mono">{truncate(block.miner)}</span>}
            isDark={isDark}
          />
          <Row
            label="Block Reward"
            value={`${(parseInt(block.reward ?? "0x0", 16) / 1e18).toFixed(
              6
            )} ETH`}
            isDark={isDark}
          />
          <Row
            label="Size"
            value={`${parseInt(
              block.size ?? "0x0",
              16
            ).toLocaleString()} bytes`}
            isDark={isDark}
          />
          <Row
            label="Gas Used"
            value={`${parseInt(
              block.gasUsed ?? "0x0",
              16
            ).toLocaleString()} (${(
              (parseInt(block.gasUsed ?? "0x0", 16) /
                parseInt(block.gasLimit ?? "0x1", 16)) *
              100
            ).toFixed(2)}%)`}
            isDark={isDark}
          />
          <Row
            label="Gas Limit"
            value={parseInt(block.gasLimit ?? "0x0", 16).toLocaleString()}
            isDark={isDark}
          />
          <Row
            label="Base Fee Per Gas"
            value={`${parseInt(block.baseFeePerGas ?? "0x0", 16)} wei`}
            isDark={isDark}
          />
          <Row label="Burnt Fees" value={`🔥 0 ETH`} isDark={isDark} />
          <Row
            label="Extra Data"
            value={
              <span className="font-mono break-all">
                {truncate(block.extraData)}
              </span>
            }
            isDark={isDark}
          />
        </div>
        <div className="mt-1">
          <button
            onClick={() => setShowMore(!showMore)}
            className={clsx(
              "px-4 py-2 border rounded",
              isDark
                ? "border-slate-700 bg-slate-700 hover:bg-slate-600 text-white"
                : "border-slate-300 bg-gray-100 hover:bg-gray-200 text-black"
            )}
          >
            {showMore ? "Hide More Details" : "Show More Details"}
          </button>

          {showMore && (
            <div
              className={clsx(
                "mt-2 border rounded-lg p-4 space-y-2",
                isDark
                  ? "border-slate-800 bg-slate-800"
                  : "border-slate-200 bg-gray-50"
              )}
            >
              <Row
                label="Hash"
                value={
                  <span className="font-mono break-all">
                    {truncate(block.hash)}
                  </span>
                }
                isDark={isDark}
              />
              <Row
                label="Parent Hash"
                value={
                  <span className="font-mono break-all">
                    {truncate(block.parentHash)}
                  </span>
                }
                isDark={isDark}
              />
              <Row
                label="State Root"
                value={
                  <span className="font-mono break-all">
                    {truncate(block.stateRoot)}
                  </span>
                }
                isDark={isDark}
              />
              <Row
                label="Withdrawals Root"
                value={
                  <span className="font-mono break-all">
                    {truncate(block.withdrawalsRoot)}
                  </span>
                }
                isDark={isDark}
              />
              <Row label="Nonce" value={block.nonce} isDark={isDark} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Label-value row
function Row({
  label,
  value,
  isDark,
}: {
  label: string;
  value: React.ReactNode;
  isDark?: boolean;
}) {
  return (
    <div
      className={clsx(
        "grid grid-cols-2 gap-4 py-1 text-sm",
        isDark ? "border-b border-slate-700" : "border-b border-slate-200"
      )}
    >
      <div className={clsx(isDark ? "text-slate-300" : "text-slate-800")}>
        {label}
      </div>
      <div
        className={clsx(
          isDark ? "text-slate-300" : "text-slate-800",
          "text-right"
        )}
      >
        {value}
      </div>
    </div>
  );
}
