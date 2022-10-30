import React, { useState,useEffect, createContext, useContext } from "react";
import axios from "axios";

// <<<<<<<<< ログイン状態の確認
const LoggedStatus = createContext();

export const useLoggedInStatusContext = () => {
  return useContext(LoggedStatus);
}

export const LoggedInStatusProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});

  const handleLogin = () => {
    setLoggedInStatus('ログイン中');
  }
  const handleLoginError = () => {
    setLoggedInStatus('ログイン失敗');
  }

  useEffect(() => {
    checkLoginStatus();
  },[loggedInStatus])

  const checkLoginStatus = () => {
    axios.get("http://localhost:3000/api/v1/logged_in",
    {
      withCredentials: true
    })
    .then(response => {
      console.log("ログイン状況", response);
    })
    .catch(error => {
      console.log("ログインエラー", error);
    })
  }

  const value = {
    loggedInStatus,
    handleLogin,
    handleLoginError,
    user,
    setUser,
  }

  return(
    <LoggedStatus.Provider value={value}>
      {children}
    </LoggedStatus.Provider>
  );
}