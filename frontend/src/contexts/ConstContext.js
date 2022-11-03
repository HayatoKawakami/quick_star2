import React, { createContext, useContext } from 'react';

const ConstContext = createContext();

export const useConstContext = () => {
  return useContext(ConstContext);
}

export const ConstContextProvider = ({children}) => {

  const baseURL = "http://localhost:3000"
  const baseApiURL = "http://localhost:3000/api/v1"

  const value = {
    baseURL,
    baseApiURL,
  }

  return(
    <ConstContext.Provider value={value}>
      {children}
    </ConstContext.Provider>
  );
}
