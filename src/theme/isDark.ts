import { useContext } from "react";
import { ThemeContext } from "./theme";
import { themes } from "./theme";

export const useIsDark = () => {
  const { theme } = useContext(ThemeContext);
  return theme === themes.light ? false : true;
};
