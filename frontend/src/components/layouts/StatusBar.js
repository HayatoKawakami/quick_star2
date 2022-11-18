import React, {useState} from "react";
import { Link,useParams, useLocation, useNavigate } from "react-router-dom";
import { useConstContext } from "../../contexts/ConstContext";
import { useItemContext } from "../../contexts/ItemContext";

export const StatusBar = () =>{
  const { baseURL } = useConstContext();
  const { item } = useItemContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(item)

  console.log(Object.values(item)[0])

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
    } else if (location.pathname === `/items/${Number(location.pathname.split("/items/").slice(1,2))}`){
      return `${item.name}`;
    } else if (location.pathname === `/items/${Number(location.pathname.split('/').slice(2,3))}/edit`){
      return "欲しいもの編集";
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
      <Link to="/" onClick={()=> navigate(-1)}>
        <img className="back-btn" src={`${baseURL}/layouts/left.png`} alt="" />
      </Link>
      <p className="status-word">{statusWord()}</p>
    </div>
  );
}

