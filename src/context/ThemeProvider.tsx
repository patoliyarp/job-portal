import { ThemeContext } from "./ThemeContext.ts";
import { useEffect, useReducer } from "react";
import type { Theme, Action, themeMode } from "../types/type.ts";

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const loc = localStorage.getItem("theme") as themeMode;

  const initialState: Theme = {
    theme: loc || "light",
  };

  const reducer = (state: Theme, action: Action): Theme => {
    switch (action.type) {
      case "ToggleTheme":
        return { ...state, theme: state.theme == "light" ? "dark" : "light" };
      default:
        return state;
    }
  };

  const [theme, dispatch] = useReducer(reducer, initialState);

  function ToggleTheme() {
    dispatch({ type: "ToggleTheme" });
  }

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme.theme);
  }, [theme.theme]);

  return (
    <ThemeContext.Provider value={{ theme, dispatch, ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
