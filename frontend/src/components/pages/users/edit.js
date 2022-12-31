import React, {useEffect} from 'react';
import { useUserContext } from '../../../contexts/UserContext';
import { Navigate } from 'react-router-dom';

export const UserEdit = () => {
  const {
    handleChangeName,
    handleChangeEmail,
    handleChangeIncome,
    name,
    email,
    image,
    income,
    getPreviewImage,
    previewImage,
    userSet,
    editUser,
    userDestroy,
    loggedIn,
  } = useUserContext();

  const data = new FormData();
    data.append("name", name );
    data.append("email", email);
    // data.append("password", password);
    if (image) {
      data.append("image", image);
    }
    data.append("income", income)

  useEffect(()=> {
    userSet();
  },[])

  if (loggedIn === false) {
    return <Navigate replace to="/login"/>
  }

  const handleEnterKeyDown = (e) => {
    if(e && e.key !== 'Enter') {
      return
    } else {
      editUser(data)
    }
  }



  return(
    <>
      <div className='user-icon' >
        <img src={previewImage} alt=""/>
      </div>
      <div className='form-block'>
        <label htmlFor="image">画像</label>
        <input type="file"
        accept='image/*, .jpg, .png, .jpeg, .gif'
        onKeyDown={handleEnterKeyDown}
        onChange={getPreviewImage}
        />
      </div>

      <div className='form-block'>
        <label htmlFor="name">名前</label>
        <input type="text"
        name="name"
        onKeyDown={handleEnterKeyDown}
        onChange={handleChangeName}
        value={name}
        />
      </div>


      <div className='form-block'>
        <label htmlFor="email">メールアドレス</label>
        <input type="email"
        name="email"
        onKeyDown={handleEnterKeyDown}
        onChange={handleChangeEmail}
        value={email}
        />
      </div>

      <div className='form-block'>
        <label htmlFor="email">収入※額面</label>
        <input type="number"
        name="income"
        onKeyDown={handleEnterKeyDown}
        onChange={handleChangeIncome}
        value={income}
        />
      </div>

      {/* <input type="hidden" name="password" value={password} /> */}

      <input type="button" onClick={()=>{editUser(data)}} value="更新する" />
      <button onClick={userDestroy}>アカウント削除</button>
    </>
  );
}
