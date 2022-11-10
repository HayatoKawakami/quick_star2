import axios from "axios";
import React from "react";
import { Link, Navigate } from "react-router-dom";

import { useConstContext } from "../../../contexts/ConstContext";
import { useLoggedInStatusContext } from "../../../contexts/LoginContext";

export const UserProfile = () => {

  const { baseURL} = useConstContext();
  const { user, loadJSON } = useLoggedInStatusContext();

  const userSex = () => {
    if (user.sex === 1 ) {
      return  "男性"
    } else if (user.sex === 2) {
      return  "女性"
    }
  }

  // 権限なし時のリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>;
  }

  return(
    <div>
      <h2>「{user.name}」の編集画面</h2>
      <img src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg?2022`} className="user-icon" alt="" />
      <p>名前：{user.name}</p>
      <p>性別：{userSex()}</p>
      <p>誕生日：{user.birthday}</p>
      <p>メールアドレス：{user.email}</p>
      <Link to="edit">編集</Link>
      
    </div>
  );
}
