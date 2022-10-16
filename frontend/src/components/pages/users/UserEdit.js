import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const UserEdit = () => {

  const {userId} = useParams();
  const [user, setUser] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(user.password); //初期値がないと警告がでる
  const [image, setImage] = useState('')


  useEffect(()=> {
    axios.get(`http://localhost:3000/api/v1/users/${userId}`)
    .then((response) => {
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
    })
  },[])
  console.log(user);


  const handleChangeName = (e) =>{
    setName(e.target.value);
  }

  const handleChangeEmail = (e) =>{
    setEmail(e.target.value);
  }

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img);
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

    axios.put(`http://localhost:3000/api/v1/users/${userId}`, data, config )
    .then(response => {
      console.log("送信したデータ" + response.data);
    })
  }
  return(
    <>
      <h2>「{user.name}」の編集</h2>
      <img src={`http://localhost:3000/uploads/user/image/${userId}/icon.jpg`} alt="" className='user-icon' />
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
