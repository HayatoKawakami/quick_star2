import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLoginContext } from '../../../contexts/LoginContext';

export const LoginForm = () => {

  const { email, setEmail, password, setPassword, Login, loadJSON, ItemSet } = useLoginContext();

  const handleChangeEmail = (e) => { setEmail(e.target.value); }
  const handleChangePassword = (e) => { setPassword(e.target.value); }

  
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

      <input type="button" onClick={Login} value="ログイン" />
    </>
  )
}


