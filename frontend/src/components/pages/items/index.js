import React, { useState, useContext, useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { Link, Navigate } from 'react-router-dom';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';
import { useConstContext } from '../../../contexts/ConstContext';

export const ItemIndex = () => {
  const { baseURL } = useConstContext();
  const { items } = useItemContext();
  const { loadJSON } = useLoggedInStatusContext();

  useEffect(()=>{
  },[])

// ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>
  }

  console.log(Object.values(items))
  

  return(
    <div>
      <h2>欲しいもの一覧</h2>
      <ul className='items-list'>
         {Object.values(items).filter(item => {return item.user_id === loadJSON("user").id}).map((value, index) => {
            return(
              <li key={index}>
                <img className='item-index-icon' src={`${baseURL}/uploads/item/image/${value.id}/item.jpg`} alt="" />
                <Link to={`/items/${value.id}`}>商品名：{value.name}</Link>
                <p>価格：{value.price} 円</p>
              </li>
            );
          } )}
      </ul>
      <Link to="/items/new">欲しいもの追加</Link>
    </div>
  );
}