import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { useConstContext } from '../../../contexts/ConstContext';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const UserEdit = () => {

  const { baseURL, baseApiURL } = useConstContext();
  const { user, setUser, saveJSON, loadJSON } = useLoggedInStatusContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(user.password); //初期値がないと警告がでる
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState(`${baseURL}/uploads/user/image/${loadJSON("user").id}/icon.jpg`);

  useEffect(()=> {
    axios.get(`${baseApiURL}/users/${loadJSON("user").id}`)
    .then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
    })
  },[user])

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
    })
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
    </>
  );
}
