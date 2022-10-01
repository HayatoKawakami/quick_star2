import React from "react";
import { Link } from "react-router-dom"

export const Menu = () => {
  return(
    <div className="menu">
      <p>Menu</p>
      <Link to="/">HOME</Link>
    </div>
  );
}
