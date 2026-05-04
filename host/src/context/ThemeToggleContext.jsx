import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../themes";

const ThemeToggleContext = createContext(null);

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeToggleProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark((d) => !d);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeToggleContext.Provider value={{ isDark, toggle, theme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};
