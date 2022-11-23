import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import axios from '../../../../lib/axios';
import { useParams } from 'react-router-dom';

export const CostEdit = () => {
  const { baseApiURL, navigate } = useConstContext();
  const { costId } = useParams();

  const [cost, setCost] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const CostSet = () => {
    axios.get(`${baseApiURL}/costs/${costId}`)
    .then(response => {
      setCost(response.data);
      setName(response.data.name);
      setPrice(response.data.price)
      console.log("固定費情報取得完了", response.data)
    })
    .catch(error => {
      console.log("固定費情報取得処理エラー", error);
    })
  }
  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  const updateCost = () => {
    const data = {
      name: name,
      price: price
    }
    axios.put(`${baseApiURL}/costs/${costId}`, data)
    .then(response => {
      console.log("固定費情報更新完了", response.data)
      navigate("/costs")
    })
    .catch(error => {
      console.log("固定費情報更新処理エラー", error)
    })
  }

  const destroyCost = () => {
    axios.delete(`${baseApiURL}/costs/${costId}`)
    .then(response => {
      console.log("固定費情報削除完了", response.data)
      navigate("/costs");
    })
    .catch(error => {
      console.log("固定費情報削除処理エラー", error)
    })
  }

  useEffect(() =>{
    CostSet();
  }, [])

  return(
    <>

      <label htmlFor="">コスト名</label>
      <br />
      <input type="text"
              value={name}
              onChange={handleChangeName}
      />
      <br />
      <label htmlFor="">金額</label>
      <br />
      <input type="number"
              value={price}
              onChange={handleChangePrice}
      />
      <br />

      <button className='btn green-btn' onClick={updateCost}>
        <p>変更</p>
      </button>
      <button className='btn red-btn' onClick={destroyCost}>
        <p>削除</p>
      </button>
    </>
  );
}