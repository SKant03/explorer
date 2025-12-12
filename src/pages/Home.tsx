import BlockList from "../components/BlockList";
import { useState } from "react";
import TransactionList from "../components/TransactionList";
export default function Home() {
  const [chainId, setChainId] = useState<number>(11155111);

  return (
    <div>
      <BlockList chainId={chainId} />
      <TransactionList />
    </div>
  );
}
