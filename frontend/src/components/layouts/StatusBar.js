import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const StatusBar = () =>{
  const navigate = useNavigate();
  return(
    <div className="status-bar">
      <Link to="/" onClick={()=> navigate(-1)}>＜</Link>
    </div>
  );
}

