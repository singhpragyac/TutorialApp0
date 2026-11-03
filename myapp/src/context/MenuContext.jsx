import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menuid, setMenuId] = useState(null);

  return (
    <MenuContext.Provider value={{ menuid, setMenuId }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);