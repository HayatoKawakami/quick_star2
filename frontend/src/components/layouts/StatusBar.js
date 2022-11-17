import React, {useState} from "react";
import { Link,useParams, useLocation, useNavigate } from "react-router-dom";
import { useItemContext } from "../../contexts/ItemContext";

export const StatusBar = () =>{
  const navigate = useNavigate();
  const location = useLocation();
  const {id} = useParams();


  const statusWord = () => {
    if(location.pathname === "/"){
      return "ホーム";
    } else if (location.pathname === "/users/profile"){
      return "プロフィール情報";
    } else if (location.pathname === `/users/profile/edit`){
      return "プロフィール更新";
    } else if (location.pathname === "/users/sign_up"){
      return "アカウント新規作成";
    } else if (location.pathname === "/login"){
      return "ログイン";
    } else if (location.pathname === "/items"){
      return "欲しいもの一覧";
    } else if (location.pathname === "/items/new"){
      return "欲しいもの追加";
    } else if (location.pathname === "/costs"){
      return "固定費を管理する";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    } else if (location.pathname === ""){
      return "";
    }
  }
  return(
    <div className="status-bar">
      <Link to="/" onClick={()=> navigate(-1)}>＜</Link>
      <p>{statusWord()}</p>
    </div>
  );
}

