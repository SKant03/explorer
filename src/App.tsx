import "./App.css";
import { useState } from "react";
import ThemeButton from "./components/ThemeButton";
import { Routes, Route, Link } from "react-router-dom";
import BlockList from "./components/BlockList";
import TransactionList from "./components/TransactionList";
import { useIsDark } from "./theme/isDark";
import clsx from "clsx";
import Block from "./pages/Block";
import Transaction from "./pages/Transaction";

function App() {
  const [chainId, setChainId] = useState<number>(11155111);
  const isDark = useIsDark();
  return (
    <>
      <div
        className={clsx(
          "w-full flex justify-between py-2 items-center font-semibold text-2xl",
          isDark ? "" : ""
        )}
      >
        <h2>Explorer</h2>
        <div>
          <nav>
            <Link to="/" className="mx-3">
              List
            </Link>
            <Link to="/transaction" className="mx-3">
              Transaction
            </Link>
          </nav>
        </div>
        <ThemeButton />
      </div>

      <Routes>
        <Route path="/" element={<BlockList chainId={chainId} />} />
        <Route path="/transaction" element={<TransactionList />} />
        <Route path="/block/:blockNo" element={<Block chainId={chainId} />} />
        <Route path ="/tx/:txHash" element={<Transaction chainId={chainId}/>} />
      </Routes>
    </>
  );
}

export default App;
