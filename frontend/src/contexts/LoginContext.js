import React, { useState,useEffect, createContext, useContext } from "react";
import axios from "axios";

import { useConstContext } from "./ConstContext";

// <<<<<<<<< ログイン状態の確認
const LoggedStatus = createContext();

export const useLoggedInStatusContext = () => {
  return useContext(LoggedStatus);
}

export const LoggedInStatusProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン');
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // jsxでの表示の条件分岐のために定義
  const [logged_in, setLogged_in] = useState(false);

  const { baseApiURL } = useConstContext();

  const saveJSON = () => {
    localStorage.setItem("user", "これはローカルストレージのテスト");
  }
  const loadJSON = () => {
    localStorage.getItem("user");
  }

  const Login = (event) => {

    const data = {
        email: email,
        password: password,
    }

    console.log("ログイン入力",data);

    axios.post(`${baseApiURL}/login`, data)
    .then(response => {
      console.log("res", response);
      if (response.data.logged_in){
        handleLogin();
        setUser(response.data.user);
      } else {
        handleLoginError();
      }
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
    })
    event.preventDefault();
  }

  const Logout = () => {
    axios.delete(`${baseApiURL}/logout`)
    .then(response => {
      console.log("user", response.data);
      handleLogout();
      setUser({});
    })
  }

  const handleLogin = () => {
    setLoggedInStatus("ログイン中");
    setLogged_in(true);
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setLogged_in(false);
    setUser({});
  }

  const handleLoginError = () => {
    setLoggedInStatus('ログイン失敗');
  }

  useEffect(() => {
    checkLoginStatus();
  },[])
  

  const checkLoginStatus = () => {
    axios.get(`${baseApiURL}/logged_in`,
    {
      withCredentials: true
    })
    .then(response => {
      console.log("ログイン状況", response.data);
      if (response.data.logged_in){
        setLoggedInStatus("ログイン中");
        setUser(response.data.user);
      } else if (!response.data.logged_in) {
        setLoggedInStatus("未ログイン");
        setUser({});
      }
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
    email,
    setEmail,
    password,
    setPassword,
    Login,
    Logout,
    logged_in,
  }

  return(
    <LoggedStatus.Provider value={value}>
      {children}
    </LoggedStatus.Provider>
  );
}