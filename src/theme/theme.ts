import { createContext } from "react";

export const themes = {
  light: "bg-gray-200 text-black",
  dark: "bg-gray-900 text-white",
} as const;
export interface ThemeContextType {
  theme: string;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  changeTheme: () => {},
});
