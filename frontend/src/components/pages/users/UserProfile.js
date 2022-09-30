import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/users/", {method: "GET"})
    .then(response => response.json())
    .then(data => { setUsers(data); })
  }, [])

  console.log(users);

  return(
    <div>
      <p>これはuserのトップページです</p>
      <Link to="/">ホームへ</Link>
      <p></p>
    </div>
  );
}

export {UserProfile};