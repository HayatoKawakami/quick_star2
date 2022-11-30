import React, { useState, useEffect } from "react";
import { useConstContext } from "../../../contexts/ConstContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useItemContext } from "../../../contexts/ItemContext";

import { Link } from "react-router-dom";
import { useCostContext } from "../../../contexts/CostContext";

export const Home = () => {

  const { baseURL, dateGet, date  } = useConstContext();
  const { itemsSet, items } = useItemContext();
  const { user, loggedIn, takeHomePaySet, takeHomePay } = useUserContext();
  const { totalCostPriceSet, totalCostPrice } = useCostContext();

  useEffect(() => {
    dateGet();
    itemsSet();
    takeHomePaySet();
    totalCostPriceSet();
  },[])

  return(
    <>
      <div className="home-header">
        <h3>{user.name} さん、こんにちは。</h3>
        <p>{date}</p>
      </div>
      <h3>Target</h3>
      <ul className="items-list">
      {Object.values(items).filter(item => {
        return item.user_id === user.id
      }).map((item, index) => {
        const itemId = item.id
        return(
          <li className="items-item" key={index}>
            <Link to={`items/${itemId}`}>
              <img className="item-index-image" src={`${baseURL}/uploads/item/image/${item.id}/item.jpg`} alt="" />
              <div className='item-index-words-box'>
                <p className='item-index-words1'>「{item.name}」</p>
                <p className='item-index-words2'>が手に入るまであと<span className='big-number'>{Math.round(item.price / ((takeHomePay - totalCostPrice) / 30 ))}</span>日</p>
              </div>
            </Link>
          </li>
        );
      })}
      </ul>
      <Link to="items">欲しいもの一覧へ</Link>
    </>
  );
}
