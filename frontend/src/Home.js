import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return(
    <>
      <h2>Home</h2>
      <div>
        新規登録は<Link to={`/register/`} >こちら</Link>
      </div>
    </>
  );
}

export default Home;