import React, {useState} from 'react';
import axios from 'axios';


export const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }


  const Login = (event) => {

    // const data = new FormData()
    // data.append("email", email);
    // data.append("password", password);
    // data.append("password_confirmation", password)
    // console.log([...data.entries()]);

    const data = {
        email: email,
        password: password,
    }

    console.log(data);

    axios.post("http://localhost:3000/api/v1/login", data)
    .then(response => {
      console.log("res", response)
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
    </>
  )
}

