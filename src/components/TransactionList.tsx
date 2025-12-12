import { useSelector } from "react-redux";
import type { RootState } from "../features/store";

export default function TransactionList() {
  const blocks = useSelector((state:RootState)=> state.blocks.blocks)

  if(!blocks.length) {
    return <p>loading transaction</p>
  }

  const transactions = blocks[0].transactions;

  return (
    <div className="p-4">

      {transactions.length === 0 && <p>No transactions in this block.</p>}

      {transactions.map((tx: any, i: number) => (
        <div key={i} className="p-2 mb-2 border rounded">
          <p>
            <strong>Hash:</strong> {tx.hash}
          </p>
          <p>
            <strong>Number:</strong>{parseInt(tx.blockNumber, 16)}
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
