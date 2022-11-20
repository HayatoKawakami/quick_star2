import React, {useState} from "react";
import { Link,useParams, useLocation, useNavigate } from "react-router-dom";
import { useConstContext } from "../../contexts/ConstContext";
import { useItemContext } from "../../contexts/ItemContext";

export const StatusBar = () =>{
  const { baseURL, navigate } = useConstContext();
  const { item } = useItemContext();
  const location = useLocation();

  console.log(location)

  const navigateStatusBar = () => {
    if(location.pathname === "/"){
      navigate('/')
    } else if (location.pathname === "/usres/profile"){
      navigate("/")
    } else if (location.pathname === "/items"){
      navigate("/costs");
    } else if (location.pathname === "/costs"){
      navigate("/");
    } else if (location.pathname === `/items/${Number(location.pathname.split("/items/").slice(1,2))}`) {
      navigate("/items");
    } else if (location.pathname === `/items/${Number(location.pathname.split("/").slice(2,3))}/edit`) {
      navigate(`/items/${Number(location.pathname.split("/").slice(2,3))}`)
    } else if (location.pathname === `/costs/${Number(location.pathname.split("/").slice(2,3))}/edit`) {
      navigate("/costs")
    } else if (location.pathname === "/costs/new") {
      navigate("/costs")
    } else if (location.pathname === "/users/profile") {
      navigate("/")
    } else if (location.pathname === "/users/profile/edit") {
      navigate("/users/profile")
    }
  }

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
    } else if (location.pathname === `/costs/${Number(location.pathname.split('/').slice(2,3))}/edit`){
      return "編集";
    } else if (location.pathname === "/costs/new"){
      return "固定費を追加する";
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
      <a className="back-btn" onClick={()=>{navigateStatusBar()}}>
        <img src={`${baseURL}/layouts/left.png`} alt="" />
      </a>
      <p className="status-word">{statusWord()}</p>
    </div>
  );
}

