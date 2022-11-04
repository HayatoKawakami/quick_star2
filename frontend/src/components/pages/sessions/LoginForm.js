import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const LoginForm = () => {

  const { email, setEmail, password, setPassword, Login, loadJSON } = useLoggedInStatusContext();

  const handleChangeEmail = (e) => { setEmail(e.target.value); }
  const handleChangePassword = (e) => { setPassword(e.target.value); }

  if (loadJSON("logged_in") === true) {
    return <Navigate replace to="/users/profile"/>;
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
    </>
  )
}


