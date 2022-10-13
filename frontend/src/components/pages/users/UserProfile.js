import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import icon from '../../../../..//backend/public/uploads/user/image/1/icon.jpg';

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

  const userSex = () => {
    if (user.sex === 1 ) {
      return  "男性"
    } else if (user.sex === 2) {
      return  "女性"
    }
  }

  return(
    <div>
      <h2>プロフィール情報</h2>
      <p>ID：{user.id}</p>
      <p>名前：{user.name}</p>
      <p>性別：{userSex()}</p>
      <p>誕生日：{user.birthday}</p>
      <img src={icon} alt="" />
    </div>
  );
}
