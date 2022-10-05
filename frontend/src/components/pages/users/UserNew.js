import React,  { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/users"

export const UserNew = () => {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const [user, setUser] = useState([]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleChangePasswordConfirmation = (e) => {
    setPassword_confirmation(e.target.value);
  }

  const createNewUser = () => {
    axios.post(`${baseURL}`,{
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    })
    .then((response) => {
      setUser([response.data]);
    })
  }
  
  return(
    <form onSubmit={createNewUser} className="">
      <label htmlFor="name">名前</label>
      <input id="name" name="name" value={name} onChange={handleChangeName} type="text" placeholder="名前" />
      <label htmlFor="email">メールアドレス</label>
      <input id="email" name="email" value={email} onChange={handleChangeEmail} type="text" placeholder="メールアドレス"/>
      <label htmlFor="password">パスワード</label>
      <input id="password" name="password" onChange={handleChangePassword} type="text" placeholder="パスワード"/>
      <label htmlFor="password_confirmation">パスワード確認</label>
      <input id="password_confirmation" name="password_confirmation" onChange={handleChangePasswordConfirmation} type="text" placeholder="パスワード確認" />
      <input type="submit" value="新規登録" />
    </form>
  );
}