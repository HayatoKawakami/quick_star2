import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";




export const UserProfile = () => {

  const {userId} = useParams();
  const [user, setUser] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {method: "GET"})
    .then(response => response.json())
    .then(data => { setUser(data); })
  }, [])

  return(
    <div>
      <h1>ユーザープロフィール情報</h1>
      <p>ユーザーID:{user.id}</p>
      <p>ユーザー名：{user.name}</p>
      <p>性別：{user.sex}</p>
      <p>誕生日：{user.birthday}</p>
    </div>
  );
}




