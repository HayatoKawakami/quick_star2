import React, { useState, createContext, useContext } from "react";
import { useConstContext } from "./ConstContext";
import { useUserContext } from "./UserContext";
import axios from "../../lib/axios";

const CostContext = createContext();

export const useCostContext = () => {
  return useContext(CostContext);
}

export const CostContextProvider = ({children}) => {
  const { baseApiURL, navigate } = useConstContext();
  const { loadJSON } = useUserContext();

  const [costs, setCosts] = useState('');
  const [name, setName] = useState(' ');
  const [price, setPrice] = useState('');
  
  const [user_id, setUser_id] = useState('');
  const [ label, setLabel ] = useState('');

  const handleChangeName = (e) => {setName(e.value); setLabel(e.label);}
  const handleChangePrice = (e) => {setPrice(e.target.value);}
  const handleChangeOtherName = (e) => {setName(e.target.value);}

  const setCostIndex = () => {
    axios.get(`${baseApiURL}/costs`)
    .then(response => {
      console.log("固定費一覧データ取得完了", response.data);
      setCosts(response.data)
    })
    .catch(error => {
      console.log("固定費データ取得処理エラー", error);
    })
  }

  const costSet = (costId) => {
    axios.get(`${baseApiURL}/costs/${costId}`)
    .then(response => {
      setName(response.data.name);
      setPrice(response.data.price)
      console.log("固定費情報取得完了", response.data)
    })
    .catch(error => {
      console.log("固定費情報取得処理エラー", error);
    })
  }

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

  const updateCost = (costId,data) => {
    axios.put(`${baseApiURL}/costs/${costId}`, data)
    .then(response => {
      console.log("固定費情報更新完了", response.data)
      navigate("/costs")
    })
    .catch(error => {
      console.log("固定費情報更新処理エラー", error)
    })
  }

  const destroyCost = (costId) => {
    axios.delete(`${baseApiURL}/costs/${costId}`)
    .then(response => {
      console.log("固定費情報削除完了", response.data)
      navigate("/costs");
    })
    .catch(error => {
      console.log("固定費情報削除処理エラー", error)
    })
  }

  const value = {
    costs,
    name,
    price,
    label,
    setName,
    setPrice,
    handleChangeName,
    handleChangePrice,
    handleChangeOtherName,
    setCostIndex,
    costSet,
    createCost,
    updateCost,
    destroyCost,
  }
  return(
    <CostContext.Provider value={value}>
      {children}
    </CostContext.Provider>
  );
}