import React, { useState, useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { useConstContext } from '../../../contexts/ConstContext';
import axios from '../../../../lib/axios';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const ItemShow = () => {

  const { baseURL, baseApiURL, navigate } = useConstContext();
  const { loadJSON } = useLoggedInStatusContext();
  const { itemId }  = useParams();

  const [item, setItem] = useState({});
  const [image, setImage] = useState({});

  const ItemSet = () => {
    axios.get(`${baseApiURL}/items/${itemId}`)
    .then(response => {
      console.log(response.data);
      setItem(response.data);
    })
    .catch(error => {
      console.log("欲しいものデータ取得エラー", error);
    })
  }

  const ImageSet = () => {
    axios.get(`${baseApiURL}/images`)
    .then(response => {
      console.log(response.data)
      setImage(response.data.filter(res =>{
        if (res.item_id === itemId){
          return res
        }
      }))
    })
  }

  const ItemDestroy = () => {
    axios.delete(`${baseApiURL}/items/${itemId}}`)
    .then(response => {
      console.log("欲しいもの削除完了",response.data);
      navigate("/items");
    })
    .catch(error => {
      console.log("欲しいもの削除処理エラー", error);
    })
  }

  useEffect(() => {
    ItemSet();
    ImageSet();
  },[])

  

  // ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login" />
  }

  return(
    <>
      <img src={`${baseURL}/uploads/image/image/${image.id}/icon.jpg`} alt="" />
      <p>商品名：{item.name}</p>
      <p>価格；{item.price} 円</p>
      <Link to="edit">変更</Link>
      <button onClick={ItemDestroy}>削除</button>
    </>
  );
}