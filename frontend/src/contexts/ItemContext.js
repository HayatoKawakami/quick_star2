import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "../../lib/axios";
import { useConstContext } from "./ConstContext";
import { useLoggedInStatusContext } from "./LoginContext";

const ItemContext = createContext();

export const useItemContext = () => {
  return useContext(ItemContext);
}

export const ItemContextProvider = ({children}) => {
  const [items, setItems] = useState({});
  const [item, setItem] = useState({});

  const { baseApiURL } = useConstContext();
  const { logged_in } = useLoggedInStatusContext();

  const ItemsSet = () => {
    axios.get(`${baseApiURL}/items`)
    .then(response => {
      console.log(response.data)
      setItems(response.data)
    })
    .catch(error => {
      console.log("欲しいもの一覧データ取得エラー", error)
    })
  }

  useEffect(() => {
    ItemsSet();
  },[logged_in, item])

  const value = {
    items,
    item,
    setItem
  }

  return(
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}