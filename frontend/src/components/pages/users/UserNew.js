import React,  { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import { useLoggedInStatusContext } from "../../../contexts/LoginContext";
import { useConstContext } from "../../../contexts/ConstContext";

export const UserNew = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [image, setImage] = useState('')
  const [sex, setSex] = useState(1);
  const [birthday, setBirthday] = useState('');

  const { setUser, setLogged_in, saveJSON, loadJSON, logged_in } = useLoggedInStatusContext();

  const { baseApiURL } = useConstContext();

  const handleChangeName = (e) => { setName(e.target.value); }
  const handleChangeEmail = (e) => { setEmail(e.target.value); }
  const handleChangePassword = (e) => { setPassword(e.target.value); }
  const handleChangePasswordConfirmation = (e) => { setPasswordConfirmation(e.target.value); }
  const handleChangeSex = (e) => { setSex(e.target.value); }
  const handleBirthday = (e) => { setBirthday(e.target.value); }
  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
  }

  const resetValue = () => {
    setName('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
    setSex('1')
  }

  const Send = (event) => {

    const data = new FormData()
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", passwordConfirmation);
    data.append("image", image);
    data.append("sex", sex);
    data.append("birthday", birthday);
    console.log([...data.entries()]);

    const config = {
      headers:{'Content-Type': 'multipart/form-data'},
    }
    
    axios.post(`${baseApiURL}/users`,data, config)
    .then(response =>{
      console.log('ユーザー新規作成完了'+ response.data);
      setUser(response.data.user);
      setLogged_in(true);
      saveJSON("logged_in", true)
      saveJSON("user", response.data.user);
      event.preventDefault();
      resetValue();
      
      // resetValue();
    }).catch(error =>{
      console.log("ユーザー新規作成できません", error)
    })
  }
  // 権限なし時のリダイレクト
  if (loadJSON("logged_in") === true) {
    return <Navigate replace to="/users/profile"/>;
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

      <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />

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

      <input type="button" onClick={Send} value="新規登録" />
    </div>
  );
}