import React from "react";
import { Link } from "react-router-dom"

export const Menu = () => {
  return(
    <div className="menu">
      <h1>Menu</h1>
      <Link to="/">HOME</Link>
      <Link to="users/sign_up">ユーザー新規登録</Link>
      <Link to="users/1">
        <p>河上勇人</p>
        <p>hayato.drsp@gmail.com</p>
      </Link>
    </div>
  );
}
