import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return(
    <>
      <h2>Register</h2>
      <div>
        ログインは<Link to={`/login/`}>こちら</Link>
      </div>
      <div>
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </>
  ); 
}

export default Register;