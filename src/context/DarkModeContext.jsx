import { createContext, useState } from "react";
export const DarkModeContext = createContext({});

export const DarkModeProvider = ({ children }) => {
  let [isDark, setIsDark] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    desc: "",
    rating: "",
    category: "",
    isRecom: "",
    isNew: "",
    isLatest: "",
    price: "",
    resultsPerPage: 9,
    page: 1,
  });
  const [orderData, setOrderData] = useState({});
  function handleDark() {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider
      value={{
        handleDark,
        isDark,
        setIsDark,
        filters,
        setFilters,
        orderData,
        setOrderData,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
