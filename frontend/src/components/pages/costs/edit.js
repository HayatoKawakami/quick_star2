import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCostContext } from '../../../contexts/CostContext';

export const CostEdit = () => {
  const { name, price, handleChangeName, handleChangePrice, costSet, updateCost, destroyCost } = useCostContext();
  const { costId } = useParams();

  const data = {
    name: name,
    price: price
  }

  useEffect(() =>{
    costSet(costId);
  }, [])

  return(
    <>
      <div className='form-block'>
        <label htmlFor="">コスト名</label>
        <input type="text"
                value={name}
                onChange={handleChangeName}
        />
      </div>
      <div className='form-block'>
        <label htmlFor="">金額</label>
        <input type="number"
                value={price}
                onChange={handleChangePrice}
        />
      </div>

      <button className='btn green-btn' onClick={()=>{updateCost(costId, data)}}>
        <p>変更</p>
      </button>
      <button className='btn red-btn' onClick={()=>{destroyCost(costId)}}>
        <p>削除</p>
      </button>
    </>
  );
}