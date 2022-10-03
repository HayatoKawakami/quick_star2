import React from "react";
import { Link } from "react-router-dom"

export const Menu = () => {
  return(
    <div className="menu">
      <p>Menu</p>
      <Link to="/">HOME</Link>
      <Link to="users/2">
        <p>河上勇人</p>
        <p>hayato.drsp@gmail.com</p>
      </Link>
    </div>
  );
}
