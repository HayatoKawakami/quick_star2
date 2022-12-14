import React from "react";
import { useLocation } from "react-router-dom";
import { useConstContext } from "../../contexts/ConstContext";
import { useCostContext } from "../../contexts/CostContext";
import { useItemContext } from "../../contexts/ItemContext";
import { useUserContext } from "../../contexts/UserContext";

export const StatusBar = () =>{
  const { baseURL, navigate, location, ellipsisWord } = useConstContext();
  const { loggedIn } = useUserContext();
  const { item } = useItemContext();
  const { cost } = useCostContext();

  const ActiveBackBtn = () => {
    if (loggedIn === false || location.pathname === "/") {
      return null;
    } else if(loggedIn === true){
      return(
        <a className="back-btn" onClick={()=>{navigateStatusBar()}}>
          <img src={`${baseURL}/layouts/left.png`} alt="" />
        </a>
      );
    }
  }

  const navigateStatusBar = () => {
    if(location.pathname === "/"){
      navigate('/')
    } else if (location.pathname === "/usres/profile"){
      navigate("/")
    } else if (location.pathname === "/items"){
      navigate("/");
    } else if (location.pathname === "/costs"){
      navigate("/");
    } else if (location.pathname === `/items/${Number(location.pathname.split("/items/").slice(1,2))}`) {
      navigate("/items");
    } else if (location.pathname === `/items/${Number(location.pathname.split("/").slice(2,3))}/edit`) {
      navigate(`/items/${Number(location.pathname.split("/").slice(2,3))}`)
    } else if (location.pathname === `/costs/${Number(location.pathname.split("/").slice(2,3))}/edit`) {
      navigate("/costs")
    } else if (location.pathname === "/items/new") {
      navigate("/items")
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
      return `${cost.name} の編集`;
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
      <ActiveBackBtn/>
      <p className="status-word">{ellipsisWord(statusWord())(20)('...')}</p>
    </div>
  );
}

