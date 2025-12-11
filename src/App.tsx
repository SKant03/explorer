import "./App.css";
import Home from "./pages/Home";
import ThemeButton from "./components/ThemeButton";

function App() {
  return (
    <div className="w-full h-screen p-1">
      <div className="w-full flex justify-end">
        <ThemeButton />
      </div>
      <Home />
    </div>
  );
}

export default App;
