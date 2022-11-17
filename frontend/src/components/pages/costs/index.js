import React, { useState, useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import axios from '../../../../lib/axios';
import { Link } from 'react-router-dom';


export const CostIndex = () => {
  const { baseURL, baseApiURL } = useConstContext();

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

  const CostImage = (name) => {
    if(name === "家賃"){
      return `${baseURL}/costs/home.png`
    } else if (name === "電気代"){
      return `${baseURL}/costs/bolt.png`
    } else if (name === "食費"){
      return `${baseURL}/costs/eat.png`
    } else if (name === "ガス代"){
      return `${baseURL}/costs/gas.png`
    } else if (name === "水道代"){
      return `${baseURL}/costs/water.png`
    } else if (name === "携帯代"){
      return `${baseURL}/costs/mobile.png`
    } else if (name === "ネット代"){
      return `${baseURL}/costs/internet.png`
    } else if (name === "交通費"){
      return `${baseURL}/costs/bus.png`
    }else if (name === "貯蓄"){
      return `${baseURL}/costs/coins.png`
    } else {
      return `${baseURL}/costs/others.png`
    }
  }



  useEffect(() => {
    SetCostIndex();
  }, [])

  return(
    <>
      <ul className='costs-list'>
        {Object.values(costs).map((cost, index) => {
          return( 
            <li className='costs-item' key={index}>
              <a href={`/costs/${cost.id}/edit`}>
                <p className='costs-item-name'>{cost.name}</p>
                <div className='costs-item-img' >
                  <img src={CostImage(cost.name)} alt="" />
                </div>
                <p className='costs-item-price'>{cost.price}円</p>
              </a>
            </li>);
        })}
      </ul>
      <p>合計金額：{Object.values(costs).reduce((sum, value) => {
      return sum + value.price;
    },0)}円</p>
      <Link to="/costs/new">追加する</Link>

    </>
  )
} 