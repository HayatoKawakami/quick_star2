import React from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { Link, Navigate } from 'react-router-dom';
import { useLoggedInStatusContext } from '../../../contexts/LoginContext';
import { useConstContext } from '../../../contexts/ConstContext';

export const ItemIndex = () => {
  const { baseURL } = useConstContext();
  const { items } = useItemContext();
  const { loadJSON } = useLoggedInStatusContext();

// ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>
  }

  return(
    <div>
      <h2>欲しいもの一覧</h2>
      
      <ul className='items-list'>
        <Link className='btn green-btn width100' to="/items/new">欲しいもの追加</Link>
         {Object.values(items).filter(item => {return item.user_id === loadJSON("user").id}).map((value, index) => {
            return(
              <li className='items-item' key={index}>
                <Link to={`/items/${value.id}`}>
                  <img className='item-index-image' src={`${baseURL}/uploads/item/image/${value.id}/item.jpg`} alt="" />
                  <p>商品名：{value.name}</p>
                  <p>価格：{value.price} 円</p>
                </Link>
              </li>
            );
          } )}
      </ul>
      
    </div>
  );
}