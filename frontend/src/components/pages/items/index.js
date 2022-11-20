import React from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { Link, Navigate } from 'react-router-dom';
import { useLoginContext } from '../../../contexts/LoginContext';
import { useConstContext } from '../../../contexts/ConstContext';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const ItemIndex = () => {
  const { baseURL, FontAwesomeIcon } = useConstContext();
  const { items } = useItemContext();
  const { loadJSON } = useLoginContext();

// ログインしていなければログイン画面にリダイレクト
  if (loadJSON("logged_in") === false) {
    return <Navigate replace to="/login"/>
  }

  return(
    <>
      <ul className='items-list'>
          {Object.values(items).filter(item => {return item.user_id === loadJSON("user").id}).map((value, index) => {
            return(
              <li className='items-item' key={index}>
                <Link to={`/items/${value.id}`}>
                  <img className='item-index-image' src={`${baseURL}/uploads/item/image/${value.id}/item.jpg`} alt="" />
                  <div className='item-index-words-box'>
                    <p className='item-index-words1'>「{value.name}」</p>
                    <p className='item-index-words2'>が手に入るまであと<span className='big-number'>21</span>日</p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
      
      <Link className='btn cyan-btn' to="/items/new">
        <FontAwesomeIcon className='awesome-icon' icon={faCirclePlus}/>
        <p>欲しいもの追加</p>
      </Link>
    </>
  );
}