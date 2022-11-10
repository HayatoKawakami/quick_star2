import React, {useState, useEffect} from 'react';
import axios from '../../../../lib/axios';

import { useConstContext } from '../../../contexts/ConstContext';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';
import { Navigate } from 'react-router-dom';

export const UserEdit = () => {

  const { baseURL, baseApiURL, navigate } = useConstContext();
  const { user, setUser, Logout, saveJSON, loadJSON } = useLoggedInStatusContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('0000'); //初期値がないと警告がでる
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState(`${baseURL}/uploads/user/image/${user.id}/icon.jpg`);

  

  const handleChangeName = (e) =>{ setName(e.target.value); }
  const handleChangeEmail = (e) =>{ setEmail(e.target.value); }

  const getImage = (event) => {
    if (event.target.files) {
      // ファイル選択がtrueの時の処理
      const img = event.target.files[0];
      setImage(img);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result)
        setPreviewImage(e.target.result);
      }
      reader.readAsDataURL(event.target.files[0])

    } else if (!event.target.files) {
      return
    }
  }

  const Send = () => {
    const data = new FormData();
    data.append("name", name );
    data.append("email", email);
    data.append("password", password);
    if (image) {
      data.append("image", image);
    }
    console.log(image)

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }

    axios.put(`${baseApiURL}/users/${user.id}`, data, config )
    .then(response => {
      console.log("送信したデータ" + response.data);
      saveJSON("user", response.data);
      setUser(response.data);
      navigate("users/profile");
    })
    .catch(error => {
      console.log("ユーザー情報更新エラー", error);
    })
  }

  const UserDestroy = () => {
    axios.delete(`${baseApiURL}/users/${user.id}`)
    .then(response => {
      console.log("アカウント削除完了", response.data);
      Logout();
      // navigate("users/sign_up");
    })
    .catch(error => {
      console.log("アカウント削除処理エラー", error)
    })
  }

  useEffect(()=> {
    axios.get(`${baseApiURL}/users/${loadJSON("user").id}`)
    .then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
    })
  },[])

  // 権限なしのリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>
  }

  return(
    <>
      <h2>「{user.name}」の編集</h2>
      <img src={previewImage} alt="" className='user-icon' />
      <br />
      <label htmlFor="image">画像</label>
      <input type="file"
      accept='image/*, .jpg, .png, .jpeg, .gif'
      onChange={getImage}
      />
      <br />
      <br />

      <label htmlFor="name">名前</label>
      <input type="text"
      name="name"
      onChange={handleChangeName}
      value={name}
      />
      <br />

      <label htmlFor="email">メールアドレス</label>
      <input type="email" 
      name="email" 
      onChange={handleChangeEmail}
      value={email}
      />
      <br />

      <input type="hidden" name="password" value={password} />

      <input type="button" onClick={Send} value="更新する" />
      <button onClick={UserDestroy}>アカウント削除</button>
    </>
  );
}
