import React, { useState, createContext, useContext } from "react";

// <<<<<<<<< ログイン状態の確認
const LoggedStatus = createContext();

export const useLoggedInStatusContext = () => {
  return useContext(LoggedStatus);
}

export const LoggedInStatusProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');

  const handleLogin = () => {
    setLoggedInStatus('ログイン中');
  }
  const value = {
    loggedInStatus,
    setLoggedInStatus,
    handleLogin,
  }

  return(
    <LoggedStatus.Provider value={value}>
      {children}
    </LoggedStatus.Provider>
  );
}