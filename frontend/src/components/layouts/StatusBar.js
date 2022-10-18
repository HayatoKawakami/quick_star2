import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const StatusBar = () =>{
  const navigate = useNavigate();
  
  return(
    <div className="status-bar">
      <h1>Status Bar</h1>
      <Link to="/" onClick={()=> navigate(-1)}>＜</Link>

      {/* <p>ログイン状態：{loggedInStatus}</p> */}
      <Link to="login">ログイン</Link>
    </div>
  );
}

