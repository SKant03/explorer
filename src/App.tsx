import "./App.css";
import { useState } from "react";
import ThemeButton from "./components/ThemeButton";
import { Routes, Route, Link } from "react-router-dom";
import BlockList from "./components/BlockList";
import TransactionList from "./components/TransactionList";

function App() {
  const [chainId, setChainId] = useState<number>(11155111);
  return (
    <>
      <div className="w-full flex justify-end">
        <ThemeButton />
        <div>
          <nav>
            <Link to="/">List</Link>
            <Link to="/transaction">Transaction</Link>
          </nav>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<BlockList chainId={chainId} />} />
        <Route path="/transaction" element={<TransactionList />} />
      </Routes>
    </>
  );

}

export default App;
