import React from "react";
import { Link } from "react-router-dom";

export const StatusBar = () =>{
  return(
    <div className="status-bar">
      <p>ステータスバー</p>
      <Link to="/">＜</Link>
    </div>
  );
}

