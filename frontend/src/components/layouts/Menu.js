import React from "react";
import { Link } from "react-router-dom"
import { useLoggedInStatusContext } from "../../contexts/LoginContext";

export const Menu = () => {

  const baseURL = "http://localhost:3000";
  const { user, Logout, logged_in } = useLoggedInStatusContext();

  const LoginAndLogoutBox = () => {
    if (logged_in === true) {
      // ログイン時のメニュー
      return (
        <div className="menu-box">
          <Link className="menu-user-box" to={`users/profile`}>
            <img className="menu-user-icon" src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg`} alt="" />
            <p>{user.name}</p>
          </Link>
          <p className="btn red-btn" onClick={Logout}>ログアウト</p>
          <p>ログイン状態：ログイン中</p>
        </div>
      )
    } else {
      // ログアウト時のメニュー
      return(
        <div className="menu-box">
          <Link className="btn blue-btn" to="users/sign_up">新規登録</Link>
          <Link className="btn green-btn" to="login">ログイン</Link>
          <p>ログイン状態：未ログイン</p>
        </div>
      );
    }
  }

  return(
    <div className="menu">
      <h1>Menu</h1>
      <Link to="/">HOME</Link>
      <br />
      {LoginAndLogoutBox()}
    </div>
  );
}
