import React, { useState, useContext, useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { Link } from 'react-router-dom';

export const ItemIndex = () => {
  const { items } = useItemContext();

  useEffect(()=>{

  },[items])

  return(
    <div>
      <h2>欲しいもの一覧</h2>
      <ul className='items-list'>
         {Object.values(items).map((value, index) => {
            return(
              <li key={index}>
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