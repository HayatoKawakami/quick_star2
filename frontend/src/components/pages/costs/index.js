import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import axios from '../../../../lib/axios';
import { Link } from 'react-router-dom';


export const CostIndex = () => {
  const { baseApiURL } = useConstContext();

  const [costs, setCosts] = useState({});

  const SetCostIndex = () => {
    axios.get(`${baseApiURL}/costs`)
    .then(response => {
      console.log("固定費一覧データ取得完了", response.data);
      setCosts(response.data)
    })
    .catch(error => {
      console.log("固定費データ取得処理エラー", error);
    })
  }



  useEffect(() => {
    SetCostIndex();
  }, [])

  return(
    <>
      <h2>固定費一覧</h2>
      <ul>
        {Object.values(costs).map((cost, index) => {
          return( 
            <li key={index}>
              <p>{cost.name}</p>
              <p>{cost.price} 円</p>
              <Link to={`/costs/${cost.id}/edit`}>編集</Link>
            </li>);
        })}
      </ul>
      <p>合計金額：{Object.values(costs).reduce((sum, value) => {
      return sum + value.price;
    },0)} 円</p>
      <Link to="/costs/new">追加する</Link>

    </>
  )
} 