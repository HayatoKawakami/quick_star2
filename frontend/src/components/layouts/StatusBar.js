import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedInStatusContext } from "../../contexts/LoginContext";

export const StatusBar = () =>{
  const navigate = useNavigate();
  const { loggedInStatus } = useLoggedInStatusContext();

  return(
    <div className="status-bar">
      <h1>Status Bar</h1>
      <Link to="/" onClick={()=> navigate(-1)}>＜</Link>
      {<p>ログイン状態：{loggedInStatus}</p>}
    </div>
  );
}

