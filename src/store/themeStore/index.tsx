import type { TProvider } from "@/types/provider.types";
import { Theme } from "@/types/theme.types";
import { createContext, useEffect, useState } from "react";
import isEqual from "lodash/isEqual";

type TThemeContext = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const defaultState: TThemeContext = {
  theme: Theme.light,
  changeTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultState);

const getTheme = (current: Theme) => {
  if (isEqual(current, Theme.light)) return Theme.dark;
  else return Theme.light;
};

const ThemeProvider = ({ children }: TProvider) => {
  const [theme, setTheme] = useState<Theme>(Theme.light);

  useEffect(() => {
    setTheme((localStorage.getItem("theme") as Theme) ?? Theme.light);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => getTheme(prev));
    localStorage.setItem("theme", getTheme(theme));
  };

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
