import React from "react";
import { Link, Navigate } from "react-router-dom";

import { useConstContext } from "../../../contexts/ConstContext";
import { useLoginContext } from "../../../contexts/LoginContext";

export const UserProfile = () => {

  const { baseURL} = useConstContext();
  const { user, loadJSON } = useLoginContext();

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
      <img src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg?2022`} className="user-icon" alt="" />
      <p>名前：{user.name}</p>
      <p>性別：{userSex()}</p>
      <p>誕生日：{user.birthday}</p>
      <p>メールアドレス：{user.email}</p>
      <Link to="edit">編集</Link>
    </div>
  );
}
