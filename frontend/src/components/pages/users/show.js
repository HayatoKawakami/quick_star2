import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useConstContext } from "../../../contexts/ConstContext";
import { useUserContext } from "../../../contexts/UserContext";

export const UserProfile = () => {

  const { baseURL} = useConstContext();
  const { user, Logout, loadJSON } = useUserContext();

  const userSex = () => {
    if (user.sex === 1 ) {
      return  "男性"
    } else if (user.sex === 2) {
      return  "女性"
    }
  }

  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>;
  }

  return(
    <div>
      <img src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg`} className="user-icon" alt="" />
      <p>名前：{user.name}</p>
      <p>性別：{userSex()}</p>
      <p>誕生日：{user.birthday}</p>
      <p>メールアドレス：{user.email}</p>
      <Link to="edit">編集</Link>

      <p className="btn red-btn" onClick={Logout}>ログアウト</p>
    </div>
  );
}
