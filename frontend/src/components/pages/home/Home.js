import React, { useState, useEffect } from "react";
import { useConstContext } from "../../../contexts/ConstContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useItemContext } from "../../../contexts/ItemContext";

import { Link } from "react-router-dom";
import { useCostContext } from "../../../contexts/CostContext";

export const Home = () => {

  const { baseURL, dateGet, date, ellipsisWord  } = useConstContext();
  const { itemsSet, items, CountDaySet } = useItemContext();
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
        <img className="header-image" src={`${baseURL}/layouts/home-header.jpg`} alt="" />
        <div className="header-word-box">
          <p className="header-greet">{user.name} さん、こんにちは。</p>
          <p className="header-date">{date}</p>
        </div>
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
              <p className='item-index-count'>あと<span className='big-number'>{CountDaySet(item)}</span>日</p>
              <p className='item-index-name'>{ellipsisWord(`${item.name}`)(30)('...')}</p>
            </Link>
          </li>
        );
      })}
      </ul>
      <Link to="items">欲しいもの一覧へ</Link>
    </>
  );
}
