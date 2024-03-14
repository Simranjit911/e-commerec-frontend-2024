import { createContext, useState } from "react";
export const DarkModeContext = createContext({});

export const DarkModeProvider = ({ children }) => {
  let [isDark, setIsDark] = useState(false);
  function handleDark() {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ handleDark, isDark,setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};
