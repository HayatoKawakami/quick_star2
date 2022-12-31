import React, { useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { Link, Navigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { useConstContext } from '../../../contexts/ConstContext';
import { useCostContext } from '../../../contexts/CostContext';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const ItemIndex = () => {
  const { baseURL, FontAwesomeIcon, ellipsisWord } = useConstContext();
  const { items, itemsSet, CountDaySet  } = useItemContext();
  const { user, takeHomePaySet, loggedIn } = useUserContext();
  const { totalCostPriceSet } = useCostContext();

  useEffect(() => {
    itemsSet();
    takeHomePaySet();
    totalCostPriceSet();
  },[])

  if (loggedIn === false) {
    return <Navigate replace to="/login"/>
  }



  return(
    <>
      <ul className='items-list'>
          {Object.values(items).filter(item => {return item.user_id === user.id}).map((value, index) => {
            return(
              <li className='items-item' key={index}>
                <Link to={`/items/${value.id}`}>
                  <img className='item-index-image' src={`${baseURL}/uploads/item/image/${value.id}/item.jpg?${new Date().getTime()}`} alt="" />
                  <p className='item-index-name'>{ellipsisWord(`${value.name}`)(30)('...')}</p>
                  <p className='item-index-count'>あと<span className='big-number'>{CountDaySet(value)}</span>日</p>
                  <p className='item-index-price'>{value.price.toLocaleString()}円</p>
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