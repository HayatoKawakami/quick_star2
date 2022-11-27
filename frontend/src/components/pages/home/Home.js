import React, { useState, useEffect } from "react";
import { useConstContext } from "../../../contexts/ConstContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useItemContext } from "../../../contexts/ItemContext";

import { Link } from "react-router-dom";
import { useCostContext } from "../../../contexts/CostContext";

export const Home = () => {

  const { baseURL } = useConstContext();
  const { items } = useItemContext();
  const { user, loadJSON, takeHomePay } = useUserContext();
  const { totalCostPrice } = useCostContext();

  const [date, setDate] = useState('');

  const getDate = () => {
    const dateObj = new Date();
    const aryWeek = ["月","火","水","木","金","土","日"]

    const dateText = dateObj.getFullYear() + "年" +
                      dateObj.getMonth() + "月" +
                      dateObj.getDate() + "日" +
                      " " + aryWeek[dateObj.getDay()] + "曜日"

    setDate(dateText);
  }

  useEffect(() => {
    getDate();
  },[date])

  return(
    <>
      <div className="home-header">
        <h3>{user.name} さん、こんにちは。</h3>
        <p>{date}</p>
      </div>
      <h3>Target</h3>
      <ul className="items-list">
      {Object.values(items).filter(item => {
        return item.user_id === loadJSON("user").id
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
