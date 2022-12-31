import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCostContext } from '../../../contexts/CostContext';
import { useUserContext } from '../../../contexts/UserContext';
import Select from 'react-select';

export const CostEdit = () => {
  const {
    name,
    price,
    label,
    costsSelect,
    handleChangeName,
    handleChangeOtherName,
    handleChangePrice,
    costSet,
    updateCost,
    destroyCost
  } = useCostContext();
  const { loggedIn } = useUserContext();
  const { costId } = useParams();

  const data = {
    name: name,
    price: price
  }

  useEffect(() =>{
    costSet(costId);
  }, [])

  const handleEnterKeyDown = (e) => {
    if(e && e.key !== 'Enter') {
      return
    } else {
      updateCost(costId, data)
    }
  }

  return(
    <>
      <div className='form-block'>
        <input type="hidden" name="name" value={name} />
      </div>
      <div className='form-block'>
        <label htmlFor="">金額</label>
        <input type="number"
                value={price}
                onKeyDown={handleEnterKeyDown}
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