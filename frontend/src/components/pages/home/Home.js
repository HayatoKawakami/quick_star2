import React, { useState, useEffect } from "react";
import { useConstContext } from "../../../contexts/ConstContext";
import { useLoggedInStatusContext } from "../../../contexts/LoginContext";
import { useItemContext } from "../../../contexts/ItemContext";

import { Link } from "react-router-dom";

export const Home = () => {

  const { items } = useItemContext();
  const { logged_in, user, loadJSON } = useLoggedInStatusContext();

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
    <div>
      <h1>{user.name} さん、こんにちは。</h1>
      <p>{date}</p>
      <h3>Target</h3>
      <ul>
      {Object.values(items).filter(item => {return item.user_id === loadJSON("user").id}).map((item, index) => {
        const itemId = item.id
        return(
          <li key={index}>
            <Link to={`items/${itemId}`}>
              <p>「{item.name}」が手に入るまであと〇〇日</p>
            </Link>
          </li>

        );
      })}
      </ul>
      <Link to="items">欲しいもの一覧へ</Link>
    </div>
  );
}
