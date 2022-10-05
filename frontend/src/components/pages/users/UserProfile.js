import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const baseURL = "http://localhost:3000/api/v1/users"

export const UserProfile = () => {

  const {userId} = useParams();
  const [user, setUser] = useState([]);
  useEffect(()=>{
    axios.get(`${baseURL}/${userId}`)
    .then((response)=>{
      setUser(response.data);
    })
   }, [])

  return(
    <div>
      <h2>プロフィール情報</h2>
      <p>ID：{user.id}</p>
      <p>名前：{user.name}</p>
      <p>性別：{user.sex}</p>
      <p>誕生日：{user.birthday}</p>
    </div>
  );
}




