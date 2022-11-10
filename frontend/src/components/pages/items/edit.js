import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';

export const ItemEdit = () => {
  const [item, setItem] = useState({});

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const { baseApiURL } = useConstContext();
  const { loadJSON } = useLoggedInStatusContext();
  const { itemId } = useParams();
  const navigate = useNavigate();


  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const EditItem = () => {
    const data = {
      name: name,
      price: price,
    }

    axios.put(`${baseApiURL}/items/${itemId}`, data)
    .then(response => {
      console.log("欲しいもの情報更新完了", response.data);
      navigate(`/items/${itemId}`)
    })
    .catch(error => {
      console.log("欲しいもの情報更新処理エラー", error);
    })
    
  }

  

  const SetItem = () => {
    axios.get(`${baseApiURL}/items/${itemId}`)
    .then(response => {
      console.log(response.data);
      setItem(response.data);
      setName(response.data.name);
      setPrice(response.data.price);
    })
  }

  useEffect(() => {
    SetItem();
  },[])

  if (loadJSON("logged_in") === false){
    return <Navigate replace to="/login" />
  }


  return(
    <>

      <label htmlFor="">商品名</label>
      <br />
      <input type="text"
              name="name"
              value={name}
              onChange={handleChangeName}
      />
      <br />
      <label htmlFor="">価格</label>
      <br />
      <input type="number"
        name="price"
        value={price}
        onChange={handleChangePrice}
      />
      <br />

      <input type="button" onClick={EditItem} value="変更" />

    </>
  );
}