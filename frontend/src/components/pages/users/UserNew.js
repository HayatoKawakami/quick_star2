import React,  { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/users"

axios.defaults.headers.common['content-type'] = 'application/json';

export const UserNew = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const image = "test"
  const [sex, setSex] = useState(1);
  const [birthday, setBirthday] = useState('');


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
    setPasswordConfirmation(e.target.value);
  }
  const handleChangeSex = (e) => {
    setSex(e.target.value);
  }

  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  }

  const createNewUser = (event) => {
    axios.post(`${baseURL}`,{
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      image: image,
      sex: sex,
      birthday: birthday,
    })
    .then(response =>{
      console.log('送信したデータ'+ response.data);
      event.preventDefault();
      setName('')
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      setSex('1')
    })
    
  }

  

  return(
    <div>

      <label htmlFor="name">名前</label>
      <br/>
      <input
      id="name"
      name="name"
      value={name}
      onChange={handleChangeName}
      type="text"
      placeholder="名前"
      />
      <br/>

      <label htmlFor="email">メールアドレス</label>
      <br/>
      <input
      id="email"
      name="email"
      value={email}
      onChange={handleChangeEmail}
      type="email"
      placeholder="メールアドレス"
      />
      <br/>

      <label htmlFor="password">パスワード</label>
      <br/>
      <input
      id="password"
      name="password"
      value={password}
      onChange={handleChangePassword}
      type="password"
      placeholder="パスワード"
      />
      <br/>

      <label htmlFor="passwordConfirmation">パスワード確認</label>
      <br/>
      <input
      id="passwordConfirmation"
      name="passwordConfirmation"
      value={passwordConfirmation}
      onChange={handleChangePasswordConfirmation}
      type="password"
      placeholder="パスワード確認"
      />
      <br/>

      <input type="hidden" name="image" value={image} />
      
      <div className="radio">
        <label htmlFor="sex">性別</label>
        <br/>
        <label>
          <input
          type="radio"
          name={sex}
          value="1"
          onChange={handleChangeSex}
          checked="checked"
          />
          男性
        </label>
        <label>
          <input
          type="radio"
          name={sex}
          value="2"
          onChange={handleChangeSex}
          />
          女性
        </label>
      </div>

      <label htmlFor="birthday">生年月日</label>
      <br/>
      <input type="date" name="birthday" value={birthday} onChange={handleBirthday} />
      <br/>

      <input type="button" onClick={createNewUser} value="新規登録" />
    </div>
  );
}