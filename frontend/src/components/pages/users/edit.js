import React, {useEffect} from 'react';
import { useUserContext } from '../../../contexts/UserContext';
import { Navigate } from 'react-router-dom';

export const UserEdit = () => {
  const {
    handleChangeName,
    handleChangeEmail,
    user,
    name,
    email,
    password,
    image,
    getPreviewImage,
    previewImage,
    loadJSON,
    userSet,
    editUser,
    userDestroy
  } = useUserContext();

  const data = new FormData();
    data.append("name", name );
    data.append("email", email);
    // data.append("password", password);
    if (image) {
      data.append("image", image);
    }

  useEffect(()=> {
    userSet();
  },[])

  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>
  }

  return(
    <>
      <img src={previewImage} alt="" className='user-icon' />
      <div className='form-block'>
        <label htmlFor="image">画像</label>
        <input type="file"
        accept='image/*, .jpg, .png, .jpeg, .gif'
        onChange={getPreviewImage}
        />
      </div>

      <div className='form-block'>
        <label htmlFor="name">名前</label>
        <input type="text"
        name="name"
        onChange={handleChangeName}
        value={name}
        />
      </div>


      <div className='form-block'>
        <label htmlFor="email">メールアドレス</label>
        <input type="email"
        name="email"
        onChange={handleChangeEmail}
        value={email}
        />
      </div>

      {/* <input type="hidden" name="password" value={password} /> */}

      <input type="button" onClick={()=>{editUser(data)}} value="更新する" />
      <button onClick={userDestroy}>アカウント削除</button>
    </>
  );
}
