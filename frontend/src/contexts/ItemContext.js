import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { useConstContext } from "./ConstContext";

const ItemContext = createContext();

export const useItemContext = () => {
  return useContext(ItemContext);
}

export const ItemContextProvider = ({children}) => {
  const [items, setItems] = useState({})

  const { baseApiURL } = useConstContext();

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
  },[])

  const value = {
    items,
  }

  return(
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
}