import React, { useState,useEffect, createContext, useContext } from "react";
import axios from "../../lib/axios";

import { useConstContext } from "./ConstContext";

// <<<<<<<<< ログイン状態の確認
const LoginContext = createContext();

export const useLoginContext = () => {
  return useContext(LoginContext);
}

export const LoginContextProvider = ({ children }) => {

  // state
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // jsxでの表示の条件分岐のために定義
  const [logged_in, setLogged_in] = useState(false);

  // ConstCotext
  const { baseApiURL, navigate } = useConstContext();

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

  const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
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
      console.log("ログイン完了", response.data);
      if (response.data.logged_in){
        setLogged_in(true);
        saveJSON("logged_in", true);
        setUser(response.data.user);
        saveJSON("user", response.data.user);
        navigate("/");
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
    .then(response => {
      console.log("ログアウト完了", response.data);
      setLogged_in(false);
      saveJSON("logged_in", false);
      removeLocalStorage("user");
      setUser('');
      navigate("/login");
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
    })
  }

  // ログインできなかった時の処理
  const handleLoginError = () => {
    console.log("メールアドレス、またはパスワードが間違っています");
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
    .then(response => {
      if (loadJSON("logged_in") === true){
        console.log("ログインチェックOK", response.data);
        setLogged_in(true);
        setUser(loadJSON("user"));
      } else if (loadJSON("logged_in") === false) {
        console.log("ログインチェックNG", response.data);
        setLogged_in(false);
        setUser({})
      }
    })
    .catch(error => {
      console.log("ログイン処理エラー", error);
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
    setLogged_in,
    saveJSON,
    loadJSON,
    removeLocalStorage,
    navigate,
  }

  return(
    <LoginContext.Provider value={value}>
      {children}
    </LoginContext.Provider>
  );
}