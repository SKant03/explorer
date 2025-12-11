import { useLatestTransactions } from "../features/useExplorerQuery"
export default function TransactionList({ chainId }: { chainId: number }) {
  const { transactions, isLoading } =
    useLatestTransactions(chainId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">

      {transactions.length === 0 && <p>No transactions in this block.</p>}

      {transactions.map((tx: any, i: number) => (
        <div key={i} className="p-2 mb-2 border rounded">
          <p>
            <strong>Hash:</strong> {tx.hash}
          </p>
          <p>
            <strong>From:</strong> {tx.from}
          </p>
          <p>
            <strong>To:</strong> {tx.to}
          </p>
          <p>
            <strong>Value:</strong> {parseInt(tx.value ?? "0x0", 16)}
          </p>
        </div>
      ))}
    </div>
  );
}
