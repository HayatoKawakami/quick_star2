import React, { useState,useEffect, createContext, useContext } from "react";
import axios from "axios";

import { useConstContext } from "./ConstContext";

// <<<<<<<<< ログイン状態の確認
const LoggedStatus = createContext();

export const useLoggedInStatusContext = () => {
  return useContext(LoggedStatus);
}

export const LoggedInStatusProvider = ({ children }) => {

  // state
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // jsxでの表示の条件分岐のために定義
  const [logged_in, setLogged_in] = useState(false);

  // ConstCotext
  const { baseApiURL } = useConstContext();

  // リロードしてもstateを保持するためのコード
  const saveJSON = (key, value) => {
    localStorage.setItem( key, JSON.stringify(value) );
  }
  const loadJSON = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    if (data === "true") {
      return true;
    } else if (data === "false") {
      return false;
    } else {
      return data;
    }
  }

  // ログイン
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
        setLogged_in(true);
        saveJSON("logged_in", true);
        setUser(response.data.user);
        saveJSON("user", response.data.user);
      } else {
        handleLoginError();
      }
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
    })
    event.preventDefault();
  }

  // ログアウト
  const Logout = () => {
    axios.delete(`${baseApiURL}/logout`)
    .then(() => {
      setLogged_in(false);
      saveJSON("logged_in", false);
      loadJSON("logged_in");
      setUser({});
    })
  }

  // ログインできなかった時の処理
  const handleLoginError = () => {
    console.log("ログイン失敗");
  }

  // レンダリングするたびにrailsの「logged_in?」メソッドを使ってログインをしているかのチェックをする
  useEffect(() => {
    checkLoginStatus();
  },[])

  const checkLoginStatus = () => {
    axios.get(`${baseApiURL}/logged_in`,
    {
      withCredentials: true
    })
    .then(() => {
      if (loadJSON("logged_in") === true){
        setLogged_in(true);
        setUser(loadJSON("user"));
      } else if (loadJSON("logged_in") === false) {
        setLogged_in(false);
        setUser({})
      }
    })
    .catch(error => {
      console.log("ログインエラー", error);
    })
  }

  // 他コンポーネントに渡す値を設定
  const value = {
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
    saveJSON,
    loadJSON,
  }

  return(
    <LoggedStatus.Provider value={value}>
      {children}
    </LoggedStatus.Provider>
  );
}