import React, { useEffect } from 'react';
import { useItemContext } from '../../../contexts/ItemContext';
import { Link, Navigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext';
import { useConstContext } from '../../../contexts/ConstContext';
import { useCostContext } from '../../../contexts/CostContext';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const ItemIndex = () => {
  const { baseURL, FontAwesomeIcon, navigate } = useConstContext();
  const { items, itemsSet, countDay, CountDaySet  } = useItemContext();
  const { user, loggedIn, takeHomePay, takeHomePaySet } = useUserContext();
  const { totalCostPriceSet, totalCostPrice } = useCostContext();

  useEffect(() => {
    itemsSet();
    takeHomePaySet();
    totalCostPriceSet();
  },[])



  return(
    <>
      <ul className='items-list'>
          {Object.values(items).filter(item => {return item.user_id === user.id}).map((value, index) => {
            return(
              <li className='items-item' key={index}>
                <Link to={`/items/${value.id}`}>
                  <img className='item-index-image' src={`${baseURL}/uploads/item/image/${value.id}/item.jpg`} alt="" />
                  <div className='item-index-words-box'>
                    <p className='item-index-words1'>「{value.name}」</p>
                    <p className='item-index-words2'>が手に入るまであと<span className='big-number'>{CountDaySet(value)}</span>日</p>
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