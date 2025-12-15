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
    <div>
      <header
        className={clsx(
          "w-full flex justify-between p-3 items-center font-semibold text-2xl",
          isDark ? "bg-gray-900/20" : "bg-gray-200"
        )}
      >
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-2xl">Explorer</h1>
          <nav className="flex gap-4 text-lg">
            <Link
              to="/"
              className={clsx(
                "hover:underline",
                isDark ? "text-slate-200" : "text-slate-800"
              )}
            >
              Block List
            </Link>
            <Link
              to="/transaction"
              className={clsx(
                "hover:underline",
                isDark ? "text-slate-200" : "text-slate-800"
              )}
            >
              Transactions
            </Link>
          </nav>
        </div>
        <ThemeButton />
      </header>

      <Routes>
        <Route path="/" element={<BlockList chainId={chainId} />} />
        <Route path="/transaction" element={<TransactionList />} />
        <Route path="/block/:blockNo" element={<Block chainId={chainId} />} />
        <Route path="/tx/:txHash" element={<Transaction chainId={chainId} />} />
      </Routes>
    </div>
  );
}

export default App;
