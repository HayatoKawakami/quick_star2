import axios from '../../../../lib/axios';
import React, { useEffect, useState } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';
import { useItemContext } from '../../../contexts/ItemContext';

import { Navigate, Link } from 'react-router-dom';

export const ItemNew = () => {

  const { baseApiURL, navigate } = useConstContext();
  const { loadJSON } = useLoggedInStatusContext();
  const { items } = useItemContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [user_id, setUser_id] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  }

  const setUserId = () => {
    if (loadJSON("logged_in") === true) {
      setUser_id(loadJSON("user").id);
    } else {
      return;
    }
  }

  const getImage = (e) => {
    if (!e.target.files) return
    const img = e.target.files[0];
    setImage(img)
  }

  const CreateItem = () => {
    const itemData = {
      name: name,
      price: price,
      user_id: user_id
    }

    // 新規作成時のitemIdはどうするか？
    const imageData = new FormData();
    imageData.append("image", image);
    imageData.append("item_id", items.slice(-1)[0].id + 1)

    // const videoData = {
    //   url: url,
    //   item_id: items.slice(-1)[0].id + 1,
    // }

    const config = {
      headers: {  'Content-Type': 'application/json'}
    }
    axios.post(`${baseApiURL}/items`, itemData, config)
    .then(response => {
      console.log("欲しいもの追加完了",response.data);
    })
    .catch(error => {
      console.log("欲しいもの追加処理エラー", error);
    })

    axios.post(`${baseApiURL}/images`, imageData,
    {
      headers: {  'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
      console.log("欲しいもの画像追加完了", response.data);
      navigate(`/items/${response.data.item.id}`);
    })
    .catch(error => {
      console.log("欲しいもの画像追加処理エラー", error);
    })

    // axios.post(`${baseApiURL}/videos`, videoData)
    // .then(response => {
    //   console.log("欲しいもの参考動画登録完了", response.data)
    // })
    // .catch(error => {
    //   console.log("欲しいもの参考動画登録処理エラー", error);
    // })

  }

  useEffect(()=>{
    setUserId();
  },[])

  // ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false){
    return <Navigate replace to="login" />
  }

  return(
    <>
      <h2>欲しいもの追加</h2>
      <label htmlFor="name">商品名</label>
      <br />
      <input type="text"
              value={name}
              onChange={handleChangeName}
      />
      <br />

      <label htmlFor="text">価格</label>
      <br />
      <input  type="number"
              value={price}
              onChange={handleChangePrice}
      /><br />
      <label htmlFor="">商品画像</label>
      <br />
      <input type="file" name="image" accept="image/*,.png,.jpg,.jpeg,.gif" onChange={getImage} />
      <br />
      {/* <label htmlFor="">参考動画URL</label>
      <br />
      <input type="text" value={url} onChange={handleChangeUrl} placeholder="https://www.youtube.com/embed/3IsR..." />
      <br /> */}


      <input type="hidden" name="user_id" value={user_id} />

      <input type="button" onClick={CreateItem} value="欲しいもの追加"  />
      <br />
      <Link to="/items">欲しいもの一覧へ</Link>
    </>
  );
}