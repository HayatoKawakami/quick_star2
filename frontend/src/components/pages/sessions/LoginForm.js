import React, {useState, useContext} from 'react';
import axios from 'axios';

import { useLoggedInStatusContext } from '../../../contexts/context';



export const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loggedInStatus, setLoggedInStatus, handleLogin } = useLoggedInStatusContext();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const Login = (event) => {

    const data = {
        email: email,
        password: password,
    }

    console.log(data);

    axios.post("http://localhost:3000/api/v1/login", data)
    .then(response => {
      console.log("res", response);
      if (response.data.logged_in){
        handleLogin();
      }
    })
    event.preventDefault();
    
  }

  return(
    <>
      <h2>ログイン</h2>
      <label htmlFor="email">メールアドレス</label>
      <input type="email"
      name='email'
      value={email}
      onChange={handleChangeEmail}
      placeholder="メールアドレス"
      />
      <br />

      <label htmlFor="password">パスワード</label>
      <input type="password"
      name='password'
      value={password}
      onChange={handleChangePassword}
      placeholder="パスワード"
      />
      <br />

      <input type="button" onClick={Login} value="ログイン" />
      <p>{loggedInStatus}</p>
    </>
  )
}
