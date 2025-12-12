import { useSelector } from "react-redux";
import type { RootState } from "../features/store";

export default function TransactionList() {
  const blocks = useSelector((state: RootState) => state.blocks.blocks);

  if (!blocks.length) {
    return <p>loading transaction</p>;
  }

  const transactions = blocks[0].transactions;

  return (
    <div className="p-4">
      {transactions.length === 0 && <p>No transactions in this block.</p>}

      <table className="w-full">
        <thead>
          <tr>
            <th>Hash</th>
            <th>BlockNumber</th>
            <th>From:</th>
            <th>To:</th>
            <th>Value:</th>
          </tr>
        </thead>
        <tbody className="w-full">

        {transactions.map((tx: any, i: number) => (
            <tr className="w-full">
              <td>
                <p>{tx.hash}</p>
              </td>
              <td>
                <p>{parseInt(tx.blockNumber, 16)}</p>
              </td>
              <td>
                <p>{tx.from}</p>
              </td>
              <td>
                <p>{tx.to}</p>
              </td>
              <td>
                <p>{parseInt(tx.value ?? "0x0", 16)}</p>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
