import React, { useEffect } from 'react';
import { useConstContext } from '../../../contexts/ConstContext';
import { useCostContext } from '../../../contexts/CostContext';
import { Link } from 'react-router-dom';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export const CostIndex = () => {
  const { baseURL, FontAwesomeIcon } = useConstContext();
  const { costs, setCostIndex, totalCostPrice, totalCostPriceSet } = useCostContext();

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
    setCostIndex();
    totalCostPriceSet();
  }, [])

  return(
    <>
      <p>
        合計金額：{totalCostPrice}円
      </p>
      <ul className='costs-list'>
        {Object.values(costs).map((cost, index) => {
          return( 
            <li className='costs-item' key={index}>
              <a href={`/costs/${cost.id}/edit`}>
                <p className='costs-item-name'>{cost.name}</p>
                <div className='costs-item-img' >
                  <img src={CostImage(cost.name)} alt="" />
                </div>
                <p className='costs-item-price'>{Number(cost.price).toLocaleString()}円</p>
              </a>
            </li>);
        })}
      </ul>
      
      <Link className='btn cyan-btn' to="/costs/new">
        <FontAwesomeIcon className="awesome-icon" icon={faCirclePlus} />
        <p>追加する</p>
      </Link>

    </>
  )
} 