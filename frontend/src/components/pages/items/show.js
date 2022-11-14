import React, { useState, useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { useConstContext } from '../../../contexts/ConstContext';
import axios from '../../../../lib/axios';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const ItemShow = () => {

  const { baseURL, baseApiURL, navigate } = useConstContext();
  const { loadJSON } = useLoggedInStatusContext();
  const { videos } = useItemContext();
  const { itemId }  = useParams();

  const [item, setItem] = useState({});

  const ItemSet = () => {
    axios.get(`${baseApiURL}/items/${itemId}`)
    .then(response => {
      console.log("欲しいもの情報取得完了", response.data);
      setItem(response.data);
    })
    .catch(error => {
      console.log("欲しいものデータ取得エラー", error);
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
  },[])


  // ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login" />
  }

  return(
    <>
      <h2>「{item.name}」</h2>
      <img className='item-image' src={`${baseURL}/uploads/item/image/${item.id}/item.jpg`} alt="" />
      <p>商品名：{item.name}</p>
      <p>価格；{item.price} 円</p>
      <br />
      <h3>参考動画</h3>
      <ul>
      {Object.values(videos).filter(video => {
        return video.item_id === Number(itemId);
      }).map((value, index) => {
        return(
          <li key={index}>
            <iframe width="400" height="255" src={value.url} title="YouTube video player"></iframe>
          </li>
        );
      })}
      </ul>
      <br />
      <Link to="edit">変更</Link>
      <button onClick={ItemDestroy}>削除</button>
      <br />
      <Link to="/items">欲しいもの一覧へ</Link>
    </>
  );
}