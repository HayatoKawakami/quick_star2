import React from "react";
import { Link } from "react-router-dom";

const StatusBar = () =>{
  return(
    <div className="status-bar">
      <h2>これはStatusBarです</h2>
      <Link to="/">＜</Link>
    </div>
  );
}

export { StatusBar };