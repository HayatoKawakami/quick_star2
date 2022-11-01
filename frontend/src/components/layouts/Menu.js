import React from "react";
import { Link } from "react-router-dom"
import { useLoggedInStatusContext } from "../../contexts/LoginContext";

export const Menu = () => {

  const baseURL = "http://localhost:3000";
  const { user, Logout, loggedInStatus, logged_in } = useLoggedInStatusContext();

  const LoginAndLogoutBox = () => {
    if (logged_in === true) {
      // ログイン時のメニュー
      return (
        <>
          <Link to={`users/${user.id}`}>
            <div className="menu-user-box">
              <img className="menu-user-icon" src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg`} alt="" />
              <p>{user.name}</p>
            </div>
          </Link>
          <p className="btn red-btn" onClick={Logout}>ログアウト</p>
        </>
      )
    } else {
      // ログアウト時のメニュー
      return(
        <>
          <Link to="users/sign_up">ユーザー新規登録</Link>
          <Link className="btn blue-btn" to="login">ログイン</Link>
        </>
      );
    }
  }

  return(
    <div className="menu">
      <h1>Menu</h1>
      <Link to="/">HOME</Link>
      <br />
      {LoginAndLogoutBox()}
      {`ログイン状態: ${loggedInStatus}`}
    </div>
  );
}
