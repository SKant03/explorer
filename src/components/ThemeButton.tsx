import { useContext } from "react";
import clsx from "clsx";
import { ThemeContext } from "../theme/theme";
import { isDark } from "../theme/isDark";
import { MoonStar, Sun } from "lucide-react";
export default function ThemeButton() {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <div className={clsx("p-1 m-1", "rounded-full")}>
      <button
        className=" rounded-full p-2 hover:scale-120 "
        onClick={() => {
          changeTheme();
        }}
      >
        {isDark() ? (
          <MoonStar color="yellow" size={30} />
        ) : (
          <Sun color="orange" size={30} />
        )}
      </button>
    </div>
  );
}
