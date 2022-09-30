import React from "react";
import { Link } from "react-router-dom"

const Menu = () => {
  return(
    <div className="menu">
      <h2>これはMenuです</h2>
      <Link to="/">HOME</Link>
    </div>
  );
}

export {Menu};