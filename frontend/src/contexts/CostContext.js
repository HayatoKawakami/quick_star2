import React, { useState, useEffect, createContext, useContext } from "react";
import { useConstContext } from "./ConstContext";
import { useLoggedInStatusContext } from "./LoginContext";
import axios from "../../lib/axios";

const CostContext = createContext();

export const useCostContext = () => {
  return useContext(CostContext);
}

export const CostContextProvider = ({children}) => {
  const { baseApiURL, navigate } = useConstContext();
  const { loadJSON } = useLoggedInStatusContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [user_id, setUser_id] = useState('');

  const createCost = () =>{
    setUser_id(loadJSON("user").id)
    const data = {
      name: name,
      price: price,
      user_id: user_id,
    }
    axios.post(`${baseApiURL}/costs`, data)
    .then(response => {
      console.log("コスト登録完了", response.data);
      navigate("/costs");
    })
    .catch(error => {
      console.log("コスト登録処理エラー", error);
    })
  }
  const value = {
    name,
    price,
    setName,
    setPrice,
    createCost,
  }
  return(
    <CostContext.Provider value={value}>
      {children}
    </CostContext.Provider>
  );
}