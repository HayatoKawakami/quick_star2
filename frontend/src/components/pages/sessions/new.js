import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';

export const LoginForm = () => {

  const {
    handleChangeEmail,
    handleChangePassword,
    email,
    password,
    Login,
    loadJSON
  } = useUserContext();

  const data = {
    email: email,
    password: password
  }

  if (loadJSON("logged_in") === true) {
    return <Navigate replace to="/"/>;
  }

  return(
    <>
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

      <input type="button" onClick={()=>{Login(data)}} value="ログイン" />
    </>
  )
}


