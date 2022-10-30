import React from "react";
import { Link } from "react-router-dom"
import { useLoggedInStatusContext } from "../../contexts/context";

export const Menu = () => {

  const { user } = useLoggedInStatusContext();
  console.log(user);
  return(
    <div className="menu">
      <h1>Menu</h1>
      <Link to="/">HOME</Link>
      <Link to="users/sign_up">ユーザー新規登録</Link>
      <Link to={`users/${user.id}`}>
        <p>{user.name}</p>
        <p>{user.email}</p>
      </Link>
    </div>
  );
}
