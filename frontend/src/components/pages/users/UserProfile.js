import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseURL = "http://localhost:3000";

export const UserProfile = () => {

  const {userId} = useParams();
  const [user, setUser] = useState([]);

  useEffect(()=>{
    axios.get(`${baseURL}/api/v1/users/${userId}`)
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
      <img src={`${baseURL}/uploads/user/image/${userId}/icon.jpg`} className="user-icon" alt="" />

      <p>名前：{user.name}</p>
      <p>性別：{userSex()}</p>
      <p>誕生日：{user.birthday}</p>

      <Link to="edit">編集</Link>
      
    </div>
  );
}
