import { useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext, themes } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(themes.light);

  const changeTheme = () => {
    setTheme((prev) => (prev === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
