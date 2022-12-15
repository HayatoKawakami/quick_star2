import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { useConstContext } from '../../../contexts/ConstContext';

export const LoginForm = () => {

  const {
    handleChangeEmail,
    handleChangePassword,
    email,
    password,
    Login,
    loggedIn,
  } = useUserContext();

  const data = {
    email: email,
    password: password
  }

  if (loggedIn === true) {
    return <Navigate replace to="/"/>;
  }

  const handleEnterKeyDown = (e) => {
    if(e && e.key !== 'Enter') {
      return
    } else {
      Login(data);
    }
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
      onKeyDown={handleEnterKeyDown}
      />
      <br />
      <p>hayato</p>

      <input type="button" onClick={()=>{Login(data)}} value="ログイン" />
    </>
  )
}


