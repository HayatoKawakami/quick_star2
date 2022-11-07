import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const ItemNew = () => {

  const { baseApiURL } = useConstContext();
  const { loadJSON } = useLoggedInStatusContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [user_id, setUser_id] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const setUserId = () => {
    if (loadJSON("logged_in") === true) {
      setUser_id(loadJSON("user").id);
    } else {
      return;
    }
  }

  const CreateItem = () => {
    const data = {
      name: name,
      price: price,
      user_id: user_id
    }

    const config = {
      headers: {  'Content-Type': 'application/json'}
    }
    axios.post(`${baseApiURL}/items`, data, config)
    .then(response => {
      console.log("欲しいもの追加完了",response.data);
    })
    .catch(error => {
      console.log("欲しいもの追加処理エラー", error);
    })
  }

  useEffect(()=>{
    setUserId();
  })

  return(
    <>
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
      />
      <br />

      <input type="hidden" name="user_id" value={user_id} />

      <input type="button" onClick={CreateItem} value="欲しいもの追加"  />
    </>
  );
}