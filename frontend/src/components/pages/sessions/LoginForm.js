import React from 'react';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const LoginForm = () => {

  const { email, setEmail, password, setPassword, Login } = useLoggedInStatusContext();

  const handleChangeEmail = (e) => { setEmail(e.target.value); }
  const handleChangePassword = (e) => { setPassword(e.target.value); }

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


