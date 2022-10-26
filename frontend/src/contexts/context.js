import React, { useState, createContext, useContext } from "react";




// <<<<<<<<< ログイン状態の確認
const LoggedInStatus = createContext();

export const useLoggedInStatusContext = () => {
  return useContext(LoggedInStatus);
}

export const LoggedInStatusProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');

  const value = {
    loggedInStatus,
    setLoggedInStatus,
  }

  return(
    <LoggedInStatus.Provider value={value}>
      {children}
    </LoggedInStatus.Provider>
  );
}