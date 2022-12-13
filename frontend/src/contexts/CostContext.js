import React, { useState, createContext, useContext } from "react";
import { useConstContext } from "./ConstContext";
import { useUserContext } from "./UserContext";

const CostContext = createContext();

export const useCostContext = () => {
  return useContext(CostContext);
}

export const CostContextProvider = ({children}) => {
  const {
    navigate,
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
  } = useConstContext();
  const { userId, loggedIn } = useUserContext();

  const [costs, setCosts] = useState('');
  const [cost, setCost] = useState('');
  const [name, setName] = useState(' ');
  const [price, setPrice] = useState('');
  const [totalCostPrice, setTotalCostPrice] = useState('');

  const [ label, setLabel ] = useState('');

  const costsSelect = [
    {value: "家賃", label: "家賃"},
    {value: "食費", label: "食費"},
    {value: "携帯代", label: "携帯代"},
    {value: "電気代", label: "電気代"},
    {value: "ガス代", label: "ガス代"},
    {value: "水道代", label: "水道代"},
    {value: "ネット代", label: "ネット代"},
    {value: "交通費", label: "交通費"},
    {value: "貯蓄", label: "貯蓄"},
    {value: "", label: "その他"},
  ]

  const handleChangeName = (e) => {setName(e.value); setLabel(e.label);}
  const handleChangePrice = (e) => {setPrice(e.target.value);}
  const handleChangeOtherName = (e) => {setName(e.target.value);}

  const setCostIndex = async () => {
    try {
      const response = await axiosGet("/costs")
      console.log("固定費一覧データ取得完了", response.data)
      setCosts(response.data.costs);
    } catch(error) {
      console.log("固定費データ取得処理エラー", error)
    }
  }

  const totalCostPriceSet = async () => {
    try {
      const res = await axiosGet("calc_all_costs")
      console.log("固定費合計額取得完了", res.data)
      setTotalCostPrice(res.data.total_costs_price)
    } catch(error) {
      console.log("固定費合計額取得処理エラー", error)
    }
  }

  const costSet = async (costId) => {
    try {
      const res = await axiosGet("costs", costId)
      console.log("固定費情報取得完了", res.data);
      setCost(res.data.cost);
      setName(res.data.cost.name);
      setPrice(res.data.cost.price);
    } catch(error){
      console.log("固定費情報取得処理エラー", error);
    }
  }

  const createCost = async () =>{
    const data = {
      name: name,
      price: price,
      user_id: userId,
    }
    try {
      const res = await axiosPost("costs", data)
      console.log("固定費登録完了", res.data);
      navigate("/costs");
    } catch(error){
      console.log("固定費登録処理エラー", error);
    }
  }

  const updateCost = async (costId,data) => {
    try {
      const res = await axiosPut("costs", costId, data);
      console.log("固定費情報更新完了", res.data)
      navigate("/costs")
    } catch(error) {
      console.log("固定費情報更新処理エラー", error)
    }
  }

  const destroyCost = async (costId) => {
    try {
      const res = await axiosDelete("costs", costId);
      console.log("固定費情報削除完了", res.data);
      navigate("/costs");
    } catch (error) {
      console.log("固定費情報削除処理エラー", error);
    }
  }

  const value = {
    costs,
    cost,
    name,
    price,
    label,
    costsSelect,
    setName,
    setPrice,
    totalCostPrice,
    handleChangeName,
    handleChangePrice,
    handleChangeOtherName,
    setCostIndex,
    totalCostPriceSet,
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