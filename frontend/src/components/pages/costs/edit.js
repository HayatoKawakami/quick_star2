import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useCostContext } from '../../../contexts/CostContext';
import axios from '../../../../lib/axios';

export const CostEdit = () => {
  const { baseApiURL } = useConstContext();

  const [costs, setCosts] = useState({});
  const [price, setPrice] = useState('');

  const SetCosts = () => {
    axios.get(`${baseApiURL}/costs`)
    .then(response => {
      setCosts(response.data);
      console.log("コスト一覧取得完了", response.data)
    })
    .catch(error => {
      console.log("コスト一覧取得処理エラー", error);
    })
  }
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  }

  useEffect(() =>{
    SetCosts();
  }, [])

  return(
    <ul>
      <p>コスト情報変更</p>
      {Object.values(costs).map((cost, index) => {
        return(
          <li key={index}>
            <label htmlFor="">{cost.name}</label>
            <br />
            <input type="number"
                    value={price}
                    onChange={handleChangePrice}
            />
          </li>
        );
      })}
    </ul>
  );
}