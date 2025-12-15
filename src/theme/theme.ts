import { createContext } from "react";

export const themes = {
  light: "bg-slate-50 text-slate-900 border-slate-200",
  dark: "bg-slate-950 text-slate-100 border-slate-800",
} as const;
export interface ThemeContextType {
  theme: string;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  changeTheme: () => {},
});
