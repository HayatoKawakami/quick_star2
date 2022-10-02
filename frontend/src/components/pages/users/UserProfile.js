import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

export const UserProfile = () => {

  return(
    <div>
      <h1>ユーザープロフィール情報</h1>
      <UserParams />
      <Link to="/">ホームへ</Link>
    </div>
  );
}
function UserParams (){
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/users/", {method: "GET"})
    .then(response => response.json())
    .then(data => { setUsers(data); })
  }, [])
  const {userId} = useParams();
  const user = users.find(user => user.id == userId)
  console.log(user);
  return (
    <React.Fragment>
      <p>ユーザーID：{userId}</p>
      <p>ユーザー名：</p>
      <p>性別：</p>
      <p>誕生日：</p>
    </React.Fragment>
  );
}



