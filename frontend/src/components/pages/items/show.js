import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useConstContext } from '../../../contexts/ConstContext';
import { useItemContext } from '../../../contexts/ItemContext';
import { useParams } from 'react-router-dom';

export const ItemShow = () => {

  const { baseApiURL } = useConstContext();
  const { itemId }  = useParams();
  const [item, setItem] = useState({});


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

  useEffect(() => {
    ItemSet(item);
  },[])

  return(
    <>
      <p>商品名：{item.name}</p>
      <p>価格；{item.price} 円</p>
    </>
  );
}