import React,  { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/users"

axios.defaults.headers.common['content-type'] = 'application/json';

export const UserNew = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const image = "test"
  const sex = 1
  const birthday = new Date(1990,3,22)



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
      image: image,
      sex: sex,
      birthday: birthday,
    })
    .then(response =>{
      console.log('送信したデータ'+ response.data);
    })
  }

  return(
    <div>
      <label htmlFor="name">名前</label>
      <input id="name" name="name" value={name} onChange={handleChangeName} type="text" placeholder="名前" />
      <label htmlFor="email">メールアドレス</label>
      <input id="email" name="email" value={email} onChange={handleChangeEmail} type="text" placeholder="メールアドレス"/>
      <label htmlFor="password">パスワード</label>
      <input id="password" name="password" value={password} onChange={handleChangePassword} type="text" placeholder="パスワード"/>
      <label htmlFor="password_confirmation">パスワード確認</label>
      <input id="password_confirmation" name="password_confirmation" value={password_confirmation} onChange={handleChangePasswordConfirmation} type="text" placeholder="パスワード確認" />
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="sex" value={sex} />
      <input type="hidden" name="birthday" value={birthday} />
      <input type="button" onClick={createNewUser} value="新規登録" />
    </div>
  );
}