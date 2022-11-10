import React, { useEffect } from "react";
import { useConstContext } from "../../../contexts/ConstContext";
import { useLoggedInStatusContext } from "../../../contexts/LoginContext";
import { useItemContext } from "../../../contexts/ItemContext";

import { Link } from "react-router-dom";

export const Home = () => {

  const { items } = useItemContext();
  const { logged_in } = useLoggedInStatusContext();

  useEffect(() => {
  })

  return(
    <div>
      <h1>Home</h1>
      <h3>Target</h3>
      <ul>
      {Object.values(items).map((item, index) => {
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
