import React from "react";
import { Link } from "react-router-dom"
import { useLoggedInStatusContext } from "../../contexts/LoginContext";

export const Menu = () => {

  const baseURL = "http://localhost:3000";
  const { user, Logout, loggedInStatus } = useLoggedInStatusContext();

  const LoginOutBox = () => {
    if (loggedInStatus === "未ログイン") {
      return <Link className="btn blue-btn" to="login">ログイン</Link>
    }
    return <p className="btn red-btn" onClick={Logout}>ログアウト</p>
  }

  const UserBox = () => {
    if (loggedInStatus === "ログイン中") {
      return (
      <div className="menu-user-box">
        <img className="menu-user-icon" src={`${baseURL}/uploads/user/image/${user.id}/icon.jpg`} alt="" />
        <p>{user.name}</p>
      </div>
      )
    }
  }

  return(
    <div className="menu">
      <h1>Menu</h1>
      <Link to="/">HOME</Link>
      <br />
      <Link to="users/sign_up">ユーザー新規登録</Link>
      <Link to={`users/${user.id}`}>
        {UserBox()}
      </Link>
      {LoginOutBox()}
    </div>
  );
}
